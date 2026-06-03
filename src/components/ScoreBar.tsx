interface ScoreBarProps {
  score: number
  total: number
  highScore: number
}

export default function ScoreBar({ score, total, highScore }: ScoreBarProps) {
  return (
    <div className="flex items-center justify-between text-sm font-body">
      <div className="flex items-center gap-2">
        <span className="text-quiz-muted">Puntaje</span>
        <span className="font-display font-semibold text-quiz-accent text-base">{score}</span>
        <span className="text-quiz-muted">/ {total}</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span className="text-quiz-muted">Récord</span>
        <span className="font-display font-semibold text-amber-400">{highScore}</span>
      </div>
    </div>
  )
}
