'use client'

import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'

export default function LoadingOverlay() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 30
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border-2 border-foreground rounded shadow-2xl shadow-foreground/30 p-12 max-w-md w-full text-center font-mono">
        {/* Pulsing Activity Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-foreground rounded-full opacity-20 animate-pulse" />
            <Activity className="w-16 h-16 text-foreground relative z-10 animate-pulse" />
          </div>
        </div>

        {/* Text */}
        <h3 className="text-xl font-bold text-foreground mb-2">&gt; NEURAL_SCAN_ACTIVE</h3>
        <p className="text-sm text-foreground/60 mb-8">
          Running deep learning model analysis...
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-secondary/50 rounded h-2 overflow-hidden border border-foreground mb-4">
          <div
            className="h-full bg-gradient-to-r from-foreground to-foreground transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-foreground font-mono">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}
