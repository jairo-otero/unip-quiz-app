interface TimerProps {
  timeLeft: number
  progress: number
  maxTime: number
}

export default function Timer({ timeLeft, progress, maxTime }: TimerProps) {
  const isWarning = timeLeft <= 5
  const isDanger = timeLeft <= 3

  const barColor = isDanger
    ? 'bg-quiz-wrong'
    : isWarning
    ? 'bg-amber-400'
    : 'bg-quiz-accent'

  return (
    <div className="flex items-center gap-3" data-testid="timer">
      <div
        className={`text-2xl font-display font-bold w-10 text-center transition-colors duration-300
          ${isDanger ? 'text-quiz-wrong' : isWarning ? 'text-amber-400' : 'text-quiz-accent'}`}
      >
        {timeLeft}
      </div>
      <div className="flex-1 h-2 bg-quiz-border rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${barColor}`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={timeLeft}
          aria-valuemin={0}
          aria-valuemax={maxTime}
        />
      </div>
    </div>
  )
}
