# PFE — PneumoAI (chest X-ray screening)

Web application for uploading a chest X-ray image and running a trained **ResNet50-style** Keras model (`.h5`) to assist with **normal vs pneumonia** screening. The stack is a **Next.js** frontend and a **FastAPI** Python backend.

> This tool is for **educational / research** use only. It is **not** a medical device and does not replace professional diagnosis.

## Repository layout

| Folder | Role |
|--------|------|
| `frontEnd/` | Next.js 16 UI (upload, results, demo mode) |
| `backEnd/` | FastAPI service, TensorFlow/Keras inference |

Default model path in code is `backEnd/models/best_model_v3.h5`. Place your `.h5` file there, or set `MODEL_PATH` to its full path.

## Prerequisites

- **Node.js** 18+ (for the frontend)
- **Python** 3.10+ (3.11 recommended on Windows for TensorFlow)
- A trained **`.h5`** model compatible with `keras.models.load_model`

## Backend (`backEnd`)

### 1. Virtual environment (recommended)

```powershell
cd backEnd
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Model file

- Either copy your weights to `backEnd/models/best_model_v3.h5`, **or**
- Set an absolute path:

```powershell
$env:MODEL_PATH = "C:\path\to\your_model.h5"
```

### 3. Optional environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MODEL_PATH` | `backEnd/models/best_model_v3.h5` | Path to the Keras `.h5` file |
| `IMG_SIZE` | `224` | Input size (match training if different) |
| `CLASS_LABELS` | `normal,pneumonia` | Comma-separated labels in **output neuron order** |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated allowed origins for the browser |
| `PORT` | `8000` | HTTP port |

### 4. Run the API

```powershell
cd backEnd
python main.py
```

Or:

```powershell
uvicorn main:app --host 0.0.0.0 --port 8000
```

- Health check: [http://localhost:8000/health](http://localhost:8000/health)
- Prediction: `POST http://localhost:8000/predict` — multipart form field **`file`** (JPEG/PNG)

### Troubleshooting (TensorFlow)

If you see `module 'tensorflow' has no attribute 'keras'`, your environment may be broken or a local file named `tensorflow.py` may be shadowing the package. Reinstall TensorFlow in a clean venv and avoid naming project files `tensorflow.py`.

Preprocessing uses **ResNet50** `preprocess_input`. If your training pipeline differed, adjust `preprocess_image` in `main.py` to match training exactly.

## Frontend (`frontEnd`)

### 1. Install and configure

```powershell
cd frontEnd
npm install
```

Create `frontEnd/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

If this variable is **unset**, the app falls back to a **mock** analysis (random demo). With it set, **Analyze** sends the image to the backend.

### 2. Development

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Production build

```powershell
npm run build
npm start
```

### 4. Lint

```powershell
npm run lint
```

## API contract (`POST /predict`)

**Request:** `multipart/form-data` with field `file` (image).

**Response (JSON):**

- `status`: `"normal"` \| `"pneumonia"`
- `label`: predicted class name
- `confidence`: number in **0–100** (percentage)
- `probabilities`: per-class scores
- `findings`: list of strings for the UI

## Authors

PFE project — update this section with your names, institution, and academic year.

## License

Specify your license here if applicable.
