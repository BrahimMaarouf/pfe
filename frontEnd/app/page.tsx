'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import UploadCard from '@/components/upload-card'
import ResultsSection from '@/components/results-section'
import HowItWorks from '@/components/how-it-works'
import TrustBar from '@/components/trust-bar'
import Footer from '@/components/footer'
import LoadingOverlay from '@/components/loading-overlay'

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')

function mockResult(isNormal: boolean) {
  return {
    status: isNormal ? ('normal' as const) : ('pneumonia' as const),
    confidence: Math.floor(Math.random() * (98 - 85) + 85) + Math.random(),
    findings: isNormal
      ? [
          'No consolidation present',
          'Normal lung fields bilaterally',
          'Heart size within normal limits',
          'Clear mediastinal contours',
          'No pleural effusion',
        ]
      : [
          'Focal consolidation in right lower lobe',
          'Patchy opacities in bilateral bases',
          'Mild peribronchial thickening',
          'Heart size normal',
          'No pleural effusion',
        ],
  }
}

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<{
    status: 'normal' | 'pneumonia'
    confidence: number
    findings: string[]
  } | null>(null)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setAnalysisResult(null)
  }

  const handleAnalyze = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)

    const isDemoPlaceholder =
      uploadedFile.name.startsWith('demo-') || uploadedFile.size === 0

    try {
      if (isDemoPlaceholder) {
        await new Promise((r) => setTimeout(r, 1500))
        const isNormal = uploadedFile.name.includes('normal')
        setAnalysisResult(mockResult(isNormal))
        setIsAnalyzing(false)
        return
      }

      if (!API_BASE) {
        await new Promise((r) => setTimeout(r, 1500))
        setAnalysisResult(mockResult(Math.random() > 0.5))
        setIsAnalyzing(false)
        return
      }

      const formData = new FormData()
      formData.append('file', uploadedFile)

      const res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText || `Server error (${res.status})`)
      }

      const data = (await res.json()) as {
        status: 'normal' | 'pneumonia'
        confidence: number
        findings: string[]
      }

      setAnalysisResult({
        status: data.status,
        confidence: data.confidence,
        findings: data.findings,
      })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Analysis failed'
      window.alert(message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNewAnalysis = () => {
    setUploadedFile(null)
    setAnalysisResult(null)
  }

  const handleDemoMode = (mode: 'normal' | 'pneumonia') => {
    const demoFile = new File([''], `demo-${mode}.jpg`, { type: 'image/jpeg' })
    setUploadedFile(demoFile)
    setAnalysisResult(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar onDemoMode={handleDemoMode} />
      <HeroSection />
      <div className="relative z-10 flex justify-center px-4 py-12">
        <UploadCard
          uploadedFile={uploadedFile}
          onFileUpload={handleFileUpload}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />
      </div>

      {isAnalyzing && <LoadingOverlay />}

      {analysisResult && (
        <ResultsSection
          result={analysisResult}
          uploadedFile={uploadedFile}
          onNewAnalysis={handleNewAnalysis}
        />
      )}

      {analysisResult && <HowItWorks />}
      {analysisResult && <TrustBar />}
      <Footer />
    </main>
  )
}
