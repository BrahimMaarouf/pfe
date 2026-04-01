export default function ConfidenceRing({
  confidence,
  isNormal,
}: {
  confidence: number
  isNormal: boolean
}) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (confidence / 100) * circumference

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Background Circle */}
      <svg className="absolute w-full h-full" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-secondary/50"
        />
        {/* Progress Circle */}
        <circle
          cx="60"
          cy="60"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`text-${isNormal ? 'accent' : 'destructive'} transition-all duration-1000`}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '60px 60px',
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="relative z-10 text-center">
        <div className="text-5xl font-bold text-foreground">
          {confidence.toFixed(1)}%
        </div>
        <div className="text-sm text-foreground/60 mt-2">Confidence</div>
      </div>
    </div>
  )
}
