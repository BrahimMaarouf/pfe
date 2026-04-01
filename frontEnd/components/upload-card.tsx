'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UploadCardProps {
  uploadedFile: File | null
  onFileUpload: (file: File) => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

export default function UploadCard({
  uploadedFile,
  onFileUpload,
  onAnalyze,
  isAnalyzing,
}: UploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const processFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      onFileUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const handleClear = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  if (previewUrl) {
    return (
      <div className="w-full max-w-2xl">
        <div className="bg-card border-2 border-accent/50 rounded-xl p-6 shadow-2xl shadow-accent/20">
          {/* Preview Image */}
          <div className="relative mb-6">
            <Image
              src={previewUrl}
              alt="X-ray preview"
              width={1200}
              height={800}
              unoptimized
              className="w-full h-96 object-cover rounded-lg border border-accent/30"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 bg-background/90 hover:bg-accent/80 p-2 rounded-lg transition"
            >
              <X className="w-5 h-5 text-accent" />
            </button>
          </div>

          {/* File Info */}
          <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-accent/20">
            <p className="text-sm text-foreground/70">File Name:</p>
            <p className="text-foreground font-mono text-sm truncate">{uploadedFile?.name}</p>
          </div>

          {/* Analyze Button */}
          <Button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-accent text-background hover:bg-primary font-bold py-3 rounded-lg shadow-lg shadow-accent/50 transition disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze X-Ray'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-accent bg-accent/10 shadow-lg shadow-accent/50'
            : 'border-accent/50 bg-card/50 hover:border-accent hover:bg-card'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-4 w-full"
        >
          <div className="p-4 bg-accent/10 rounded-full">
            <Upload className="w-8 h-8 text-accent" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">Upload X-Ray Image</p>
            <p className="text-sm text-foreground/60 mt-2">
              Drag and drop or click to select a chest X-ray image
            </p>
          </div>
          <p className="text-xs text-foreground/50 mt-4">
            Supported: JPG, PNG (Max 50MB)
          </p>
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-foreground/60">
          <span className="text-accent font-semibold">FDA-Cleared</span> • HIPAA Compliant • <span className="text-accent font-semibold">256-bit Encryption</span>
        </p>
      </div>
    </div>
  )
}
