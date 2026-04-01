'use client'

import { AlertCircle, CheckCircle2, Download, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConfidenceRing from '@/components/confidence-ring'

interface ResultsSectionProps {
  result: {
    status: 'normal' | 'pneumonia'
    confidence: number
    findings: string[]
  }
  uploadedFile: File | null
  onNewAnalysis: () => void
}

export default function ResultsSection({
  result,
  uploadedFile,
  onNewAnalysis,
}: ResultsSectionProps) {
  const isNormal = result.status === 'normal'

  return (
    <div className="min-h-screen bg-background py-20 px-4 scanlines">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block border border-foreground/40 p-2 px-4 font-mono text-sm mb-6 terminal-border">
            <span className="text-foreground/70">$ </span>
            <span className="text-foreground">scan_analysis --output_mode full</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-mono">
            {isNormal ? 'RESULT_NEGATIVE' : 'RESULT_POSITIVE'}
          </h2>
        </div>

        {/* Main Result Card */}
        <div className="bg-card border border-foreground/30 p-8 mb-8 terminal-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Confidence Ring */}
            <div className="flex justify-center">
              <ConfidenceRing
                confidence={result.confidence}
                isNormal={isNormal}
              />
            </div>

            {/* Result Details */}
            <div className="md:col-span-2 space-y-4 font-mono">
              {/* Status */}
              <div className="flex items-start gap-4 p-4 border border-foreground/30">
                {isNormal ? (
                  <CheckCircle2 className="w-8 h-8 text-foreground flex-shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                )}
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {isNormal ? '[NEGATIVE]_no_pneumonia' : '[POSITIVE]_pneumonia_detected'}
                  </h3>
                  <p className="text-xs text-foreground/70 mt-1">
                    {isNormal
                      ? '// Normal chest X-ray. All regions within expected parameters.'
                      : '// Critical findings detected. Clinical review required.'}
                  </p>
                </div>
              </div>

              {/* Key Findings */}
              <div>
                <h4 className="font-bold text-foreground mb-2 text-sm">findings[]:</h4>
                {uploadedFile?.name && (
                  <p className="text-xs text-foreground/60 mb-2">
                    {`source_file: ${uploadedFile.name}`}
                  </p>
                )}
                <div className="space-y-1 text-sm">
                  {result.findings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-foreground/80 pl-4"
                    >
                      <span className="text-foreground/60 mt-1">&gt;</span>
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 font-mono">
          <Button
            onClick={onNewAnalysis}
            className="flex-1 bg-foreground text-background hover:bg-background hover:text-foreground font-bold py-3 border border-foreground transition"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            [NEW_ANALYSIS]
          </Button>
          <Button
            variant="outline"
            className="flex-1 border border-foreground/40 text-foreground hover:border-foreground hover:bg-foreground/10 transition"
          >
            <Download className="w-4 h-4 mr-2" />
            [DOWNLOAD_REPORT]
          </Button>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 p-6 border border-foreground/20 text-xs text-foreground/70 font-mono">
          <p className="mb-2">{'// MEDICAL_DISCLAIMER'}</p>
          <p>
            {'// This analysis is for screening only. Diagnosis must be confirmed by'}
            <br />
            {'// a qualified medical professional. Not medical advice.'}
          </p>
        </div>
      </div>
    </div>
  )
}
