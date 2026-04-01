import { Upload, Zap, CheckCircle2 } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: 'Upload X-Ray',
      description: 'Submit a chest X-ray image in standard medical formats',
    },
    {
      number: 2,
      icon: Zap,
      title: 'AI Analysis',
      description: 'Advanced neural network processes the image in seconds',
    },
    {
      number: 3,
      icon: CheckCircle2,
      title: 'Get Results',
      description: 'Instant diagnosis with confidence metrics and findings',
    },
  ]

  return (
    <div className="py-20 px-4 bg-background scanlines">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block border border-foreground/40 p-2 px-4 font-mono text-sm mb-6 terminal-border">
            <span className="text-foreground/70">$ </span>
            <span className="text-foreground">process_pipeline --detailed</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-mono">
            EXECUTION_SEQUENCE
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative bg-card border border-foreground/30 p-8 hover:border-foreground/60 transition-all duration-200 terminal-border"
              >
                {/* Step Number - Terminal Style */}
                <div className="mb-6">
                  <div className="inline-block border border-foreground px-3 py-1 font-mono text-sm text-foreground/80">
                    STEP_{step.number}
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 border border-foreground/40 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2 font-mono">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/70 font-mono">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* System Specifications */}
        <div className="mt-16 border border-foreground/30 p-8 bg-background/50 font-mono text-sm terminal-border">
          <div className="text-foreground/60 mb-4">$ system --show-specs</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-4">
            <div className="border-l border-foreground/30 pl-4">
              <div className="text-foreground">2.3s</div>
              <div className="text-xs text-foreground/60">response_time</div>
            </div>
            <div className="border-l border-foreground/30 pl-4">
              <div className="text-foreground">99.9%</div>
              <div className="text-xs text-foreground/60">uptime_sla</div>
            </div>
            <div className="border-l border-foreground/30 pl-4">
              <div className="text-foreground">256-bit</div>
              <div className="text-xs text-foreground/60">encryption</div>
            </div>
            <div className="border-l border-foreground/30 pl-4">
              <div className="text-foreground">HIPAA</div>
              <div className="text-xs text-foreground/60">compliance</div>
            </div>
          </div>
          <div className="text-foreground/50 text-xs pt-4 border-t border-foreground/20">
            {'// All systems nominal. Security clearance: maximum'}
          </div>
        </div>
      </div>
    </div>
  )
}
