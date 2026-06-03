import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchCountries, buildQuestions, QuizQuestion } from '../services/countriesApi'
import { useTimer } from '../hooks/useTimer'
import { useHighScore } from '../hooks/useHighScore'
import { useSound } from '../hooks/useSound'
import QuizCard from '../components/QuizCard'
import Timer from '../components/Timer'
import ScoreBar from '../components/ScoreBar'
import DarkModeToggle from '../components/DarkModeToggle'

const TOTAL_QUESTIONS = 10
const TIMER_SECONDS = 15

export default function Quiz() {
  const navigate = useNavigate()
  const { highScore, updateHighScore } = useHighScore()
  const { play } = useSound()

  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleExpire = useCallback(() => {
    if (selectedAnswer) return
    play('wrong')
    setSelectedAnswer('__timeout__')
    setTimeout(() => goNext(), 1200)
  }, [selectedAnswer])

  const { timeLeft, progress, start, stop } = useTimer(TIMER_SECONDS, handleExpire)

  const goNext = useCallback(() => {
    if (current + 1 >= TOTAL_QUESTIONS) {
      navigate('/results', { state: { score, total: TOTAL_QUESTIONS } })
      return
    }
    setCurrent(prev => prev + 1)
    setSelectedAnswer(null)
  }, [current, score, navigate])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchCountries()
      .then(countries => {
        if (!cancelled) {
          setQuestions(buildQuestions(countries, TOTAL_QUESTIONS))
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setError('No se pudo cargar la API de países. Verifica tu conexión.')
      })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!loading && !error && questions.length > 0) {
      start()
    }
  }, [current, loading, error, questions.length])

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return
    stop()
    setSelectedAnswer(answer)

    const isCorrect = answer === questions[current].correctAnswer
    if (isCorrect) {
      play('correct')
      const newScore = score + 1
      setScore(newScore)
      updateHighScore(newScore)
    } else {
      play('wrong')
    }

    setTimeout(() => goNext(), 1500)
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-quiz-bg" data-testid="error-state">
        <div className="card text-center max-w-sm">
          <div className="text-4xl mb-4">😕</div>
          <h2 className="font-display text-xl font-semibold mb-2 text-quiz-neutral">Error de conexión</h2>
          <p className="text-quiz-muted mb-6 text-sm">{error}</p>
          <button className="btn-primary w-full" onClick={() => window.location.reload()}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-quiz-bg dark:bg-quiz-bg light:bg-gray-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-quiz-muted hover:text-quiz-neutral transition-colors flex items-center gap-1.5 text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Salir
          </button>
          <DarkModeToggle />
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-quiz-muted mb-2">
            <span>Pregunta {loading ? '-' : current + 1} de {TOTAL_QUESTIONS}</span>
            <span>{Math.round(((current) / TOTAL_QUESTIONS) * 100)}% completado</span>
          </div>
          <div className="h-1.5 bg-quiz-border rounded-full">
            <div
              className="h-full bg-quiz-accent rounded-full transition-all duration-500"
              style={{ width: `${(current / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>
        </div>

        {/* Score bar */}
        <div className="mb-4">
          <ScoreBar score={score} total={TOTAL_QUESTIONS} highScore={highScore} />
        </div>

        {/* Timer */}
        {!loading && (
          <div className="mb-5">
            <Timer timeLeft={timeLeft} progress={progress} maxTime={TIMER_SECONDS} />
          </div>
        )}

        {/* Quiz card */}
        {loading ? (
          <QuizCard
            question={{} as QuizQuestion}
            selectedAnswer={null}
            onAnswer={() => {}}
            loading={true}
          />
        ) : (
          <QuizCard
            question={questions[current]}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  )
}
