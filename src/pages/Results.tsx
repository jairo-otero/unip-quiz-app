import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DarkModeToggle from '../components/DarkModeToggle'
import { useHighScore } from '../hooks/useHighScore'

interface ResultState {
  score: number
  total: number
}

function getEmoji(score: number, total: number) {
  const pct = score / total
  if (pct === 1) return { icon: '🏆', label: '¡Perfecto!', color: 'text-amber-400' }
  if (pct >= 0.8) return { icon: '🌟', label: '¡Excelente!', color: 'text-quiz-correct' }
  if (pct >= 0.6) return { icon: '👏', label: '¡Bien hecho!', color: 'text-quiz-accent' }
  if (pct >= 0.4) return { icon: '📚', label: 'Sigue practicando', color: 'text-amber-400' }
  return { icon: '💪', label: '¡Tú puedes mejorar!', color: 'text-quiz-muted' }
}

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const { highScore } = useHighScore()
  const state = location.state as ResultState | null
  const [visible, setVisible] = useState(false)

  const score = state?.score ?? 0
  const total = state?.total ?? 10
  const isNewRecord = score === highScore && score > 0
  const result = getEmoji(score, total)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  if (!state) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-quiz-bg dark:bg-quiz-bg light:bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>

      <div className={`w-full max-w-md transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Result icon */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{result.icon}</div>
          <h1 className={`font-display text-3xl font-bold mb-2 ${result.color}`}>
            {result.label}
          </h1>
          {isNewRecord && (
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-sm px-4 py-1.5 rounded-full mt-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              ¡Nuevo récord!
            </div>
          )}
        </div>

        {/* Score card */}
        <div className="card mb-6 light:bg-white light:border-gray-200">
          <div className="text-center mb-6">
            <div className="font-display text-7xl font-bold text-quiz-accent mb-1">{score}</div>
            <div className="text-quiz-muted font-body">de {total} correctas</div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i < score ? 'bg-quiz-correct' : 'bg-quiz-border'
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              />
            ))}
          </div>

          <div className="flex justify-between text-sm border-t border-quiz-border light:border-gray-200 pt-4">
            <div>
              <p className="text-quiz-muted mb-1">Precisión</p>
              <p className="font-display font-semibold text-quiz-neutral">{Math.round((score / total) * 100)}%</p>
            </div>
            <div className="text-right">
              <p className="text-quiz-muted mb-1">Récord histórico</p>
              <p className="font-display font-semibold text-amber-400">{highScore} / {total}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className="btn-primary w-full py-4 text-base" onClick={() => navigate('/quiz')}>
            Jugar de nuevo
          </button>
          <button className="btn-outline w-full py-4 text-base light:border-gray-200 light:text-gray-700" onClick={() => navigate('/')}>
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  )
}
