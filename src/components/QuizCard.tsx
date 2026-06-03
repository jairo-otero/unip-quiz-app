import { QuizQuestion } from '../services/countriesApi'

interface QuizCardProps {
  question: QuizQuestion
  selectedAnswer: string | null
  onAnswer: (answer: string) => void
  loading?: boolean
}

export default function QuizCard({ question, selectedAnswer, onAnswer, loading = false }: QuizCardProps) {
  if (loading) {
    return (
      <div className="card animate-pulse" data-testid="quiz-skeleton">
        <div className="h-40 bg-quiz-border rounded-xl mb-6" />
        <div className="h-6 bg-quiz-border rounded-lg w-3/4 mb-8" />
        <div className="space-y-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-14 bg-quiz-border rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card animate-slide-up" data-testid="quiz-card">
      {/* Flag */}
      <div className="relative mb-6 rounded-xl overflow-hidden bg-quiz-border aspect-video max-h-44">
        <img
          src={question.flagUrl}
          alt={`Bandera de ${question.countryName}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Question */}
      <p className="font-display text-lg font-semibold mb-6 text-quiz-neutral dark:text-quiz-neutral">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-3" role="list">
        {question.options.map(option => {
          let btnClass = 'answer-btn'

          if (selectedAnswer) {
            if (option === question.correctAnswer) {
              btnClass += ' correct'
            } else if (option === selectedAnswer && option !== question.correctAnswer) {
              btnClass += ' wrong'
            } else {
              btnClass += ' disabled'
            }
          }

          return (
            <button
              key={option}
              className={btnClass}
              onClick={() => !selectedAnswer && onAnswer(option)}
              disabled={!!selectedAnswer}
              role="listitem"
              data-testid={`answer-option-${option}`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
