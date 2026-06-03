import { useNavigate } from 'react-router-dom'
import DarkModeToggle from '../components/DarkModeToggle'
import { useHighScore } from '../hooks/useHighScore'

export default function Home() {
  const navigate = useNavigate()
  const { highScore } = useHighScore()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-quiz-bg dark:bg-quiz-bg light:bg-gray-50">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>

      <div className="w-full max-w-md text-center animate-fade-in">
        {/* Globe icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-quiz-accent/20 border border-quiz-accent/30 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-quiz-accent">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </div>

        <h1 className="font-display text-4xl font-bold mb-3 text-quiz-neutral dark:text-quiz-neutral light:text-gray-900">
          Country Quiz
        </h1>
        <p className="text-quiz-muted font-body mb-10 text-base leading-relaxed">
          Pon a prueba tu conocimiento sobre países, capitales y banderas del mundo.
          10 preguntas · 15 segundos por pregunta.
        </p>

        {highScore > 0 && (
          <div className="card mb-8 flex items-center justify-between light:bg-white light:border-gray-200">
            <span className="text-quiz-muted font-body text-sm">Tu récord actual</span>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-display text-xl font-bold text-amber-400">{highScore} / 10</span>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate('/quiz')}
          className="btn-primary w-full text-lg py-4"
        >
          Comenzar Quiz
        </button>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-quiz-muted">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-quiz-accent" />
            10 preguntas
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            Contrarreloj
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-quiz-correct" />
            Puntaje guardado
          </div>
        </div>
      </div>
    </div>
  )
}
