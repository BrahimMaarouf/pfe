"""
Chest X-ray inference API for a Keras .h5 model (e.g. ResNet50).

Set MODEL_PATH and optional CLASS_LABELS to match your training.
"""

from __future__ import annotations

import io
import os
from pathlib import Path

import tensorflow as tf
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

# ---------------------------------------------------------------------------
# Config — adjust CLASS_LABELS order to match your model's output neurons
# (index 0 = first output, etc.). Typical binary: ["normal", "pneumonia"]
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = os.environ.get("MODEL_PATH", str(BASE_DIR / "best_model_v3.h5"))
IMG_SIZE = int(os.environ.get("IMG_SIZE", "224"))
# Comma-separated, left-to-right = output index 0, 1, ...
CLASS_LABELS = os.environ.get("CLASS_LABELS", "normal,pneumonia").split(",")

app = FastAPI(title="PneumoAI inference")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_model = None


def get_model():
    global _model
    if _model is None:

        if not Path(MODEL_PATH).is_file():
            raise RuntimeError(f"Model file not found: {MODEL_PATH}")
        _model = tf.keras.models.load_model(MODEL_PATH)
    return _model


def preprocess_image(raw: bytes) -> np.ndarray:
    """Resize to IMG_SIZE, RGB, batch dim. Uses ResNet50 preprocessing."""

    img = Image.open(io.BytesIO(raw)).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE), Image.Resampling.LANCZOS)
    x = np.asarray(img, dtype=np.float32)
    x = np.expand_dims(x, axis=0)
    return tf.keras.applications.resnet50.preprocess_input(x)


def interpret_prediction(pred: np.ndarray) -> tuple[str, float, list[float]]:
    """
    Returns (label, confidence, probabilities_per_class).
    Supports (1, n) softmax/sigmoid outputs.
    """
    p = np.asarray(pred).squeeze()
    if p.ndim == 0:
        p = np.array([1.0 - float(p), float(p)])
    elif p.size == 1:
        v = float(p.flat[0])
        p = np.array([1.0 - v, v])
    else:
        p = p.astype(float)

    if len(CLASS_LABELS) != len(p):
        raise ValueError(
            f"CLASS_LABELS has {len(CLASS_LABELS)} entries but model output has {len(p)}. "
            "Set CLASS_LABELS env to match training (e.g. CLASS_LABELS=pneumonia,normal)."
        )

    idx = int(np.argmax(p))
    label = CLASS_LABELS[idx].strip()
    confidence = float(p[idx])
    return label, confidence, [float(x) for x in p]


@app.on_event("startup")
def startup():
    get_model()


@app.get("/health")
def health():
    return {"ok": True, "model_path": MODEL_PATH}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(400, "Upload an image file (JPEG/PNG).")

    raw = await file.read()
    if len(raw) > 15 * 1024 * 1024:
        raise HTTPException(400, "File too large (max 15MB).")

    try:
        batch = preprocess_image(raw)
        model = get_model()
        pred = model.predict(batch, verbose=0)
        label, confidence, probs = interpret_prediction(pred)
    except Exception as e:
        raise HTTPException(500, f"Inference failed: {e!s}") from e

    # Map to frontend contract: status 'normal' | 'pneumonia'
    status = "pneumonia" if label.lower() == "pneumonia" else "normal"
    findings = _default_findings(status, confidence, probs, label)

    return {
        "status": status,
        "label": label,
        "confidence": round(confidence * 100, 2),
        "probabilities": dict(zip([c.strip() for c in CLASS_LABELS], probs)),
        "findings": findings,
    }


def _default_findings(
    status: str, confidence: float, probs: list[float], predicted_label: str
) -> list[str]:
    lines = [
        f"Model output: {predicted_label} ({confidence * 100:.1f}% confidence)",
    ]
    if len(probs) >= 2:
        lines.append(
            "Class scores: "
            + ", ".join(f"{CLASS_LABELS[i].strip()}={probs[i]:.3f}" for i in range(len(probs)))
        )
    if status == "normal":
        lines.extend(
            [
                "No acute consolidation suggested by this screening model.",
                "Clinical correlation always required.",
            ]
        )
    else:
        lines.extend(
            [
                "Findings may be consistent with pneumonia on CXR screening.",
                "Confirm with a qualified clinician; this is not a diagnosis.",
            ]
        )
    return lines


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=int(os.environ.get("PORT", "8000")), reload=True)
