import { Shield, Users, Award } from 'lucide-react'

export default function TrustBar() {
  return (
    <div className="py-12 px-4 bg-background border-y border-foreground/20 font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 border border-foreground/20 p-4">
            <Users className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
            <div>
              <div className="font-bold text-foreground text-lg">15,000+</div>
              <div className="text-xs text-foreground/60">facilities_trusted</div>
            </div>
          </div>
          <div className="flex items-start gap-4 border border-foreground/20 p-4">
            <Award className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
            <div>
              <div className="font-bold text-foreground text-lg">96.8%</div>
              <div className="text-xs text-foreground/60">fda_accuracy_rated</div>
            </div>
          </div>
          <div className="flex items-start gap-4 border border-foreground/20 p-4">
            <Shield className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
            <div>
              <div className="font-bold text-foreground text-lg">100%</div>
              <div className="text-xs text-foreground/60">data_privacy_secured</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
