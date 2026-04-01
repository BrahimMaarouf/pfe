export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden pt-20 scanlines">
      {/* Grid Background - Subtle */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 h-screen flex flex-col justify-center">
        <div className="space-y-8 text-center">
          {/* Terminal Status Line */}
          <div className="inline-block mx-auto">
            <div className="border border-foreground/40 p-3 px-6 font-mono text-sm bg-background/50 terminal-border">
              <span className="text-foreground/70">$ </span>
              <span className="text-foreground">pneumo_ai --mode neural_scan</span>
              <span className="blink ml-1">_</span>
            </div>
          </div>
          
          {/* Main Title */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight font-mono">
              PNEUMONIA
            </h1>
            <h2 className="text-3xl md:text-5xl font-mono text-foreground mt-2">
              DETECTION_SYSTEM
            </h2>
            <div className="h-1 w-32 bg-foreground mx-auto mt-4" />
          </div>
          
          {/* Description with Terminal Style */}
          <div className="font-mono text-foreground/80 max-w-2xl mx-auto">
            <p className="mb-2">{'// Advanced neural networks for medical analysis'}</p>
            <p className="text-foreground/70">{'> Processing X-ray images with 96.8% accuracy'}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button className="px-8 py-3 bg-foreground text-background font-mono font-bold border border-foreground hover:bg-background hover:text-foreground transition duration-200">
              [EXECUTE_SCAN]
            </button>
            <button className="px-8 py-3 border border-foreground text-foreground font-mono font-bold hover:bg-foreground/10 transition duration-200">
              [VIEW_DEMO]
            </button>
          </div>

          {/* Terminal Stats Box */}
          <div className="mt-16 max-w-2xl mx-auto border border-foreground/40 p-8 bg-background/50 font-mono text-sm">
            <div className="text-foreground/60 mb-4">$ system_stats</div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="border-l-2 border-foreground pl-2">
                <div className="text-lg font-bold text-foreground">96.8%</div>
                <div className="text-xs text-foreground/60">accuracy</div>
              </div>
              <div className="border-l-2 border-foreground pl-2">
                <div className="text-lg font-bold text-foreground">15K+</div>
                <div className="text-xs text-foreground/60">systems_active</div>
              </div>
              <div className="border-l-2 border-foreground pl-2">
                <div className="text-lg font-bold text-foreground">2M+</div>
                <div className="text-xs text-foreground/60">scans_processed</div>
              </div>
            </div>
            <div className="text-foreground/60 text-xs pt-2 border-t border-foreground/20">
              {'// FDA-cleared • HIPAA-compliant • 256-bit encryption'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
