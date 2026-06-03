import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import QuizCard from '../components/QuizCard'
import Timer from '../components/Timer'
import { useTimer } from '../hooks/useTimer'
import { renderHook } from '@testing-library/react'

// Mock question for tests
const mockQuestion = {
  type: 'capital' as const,
  question: '¿Cuál es la capital de Colombia?',
  correctAnswer: 'Bogotá',
  options: ['Bogotá', 'Medellín', 'Cali', 'Cartagena'],
  flagUrl: 'https://flagcdn.com/w320/co.png',
  countryName: 'Colombia',
}

// ─────────────────────────────────────────────
// TEST 1: Estado de carga (skeleton)
// ─────────────────────────────────────────────
describe('QuizCard — estado de carga', () => {
  it('muestra el skeleton cuando loading es true', () => {
    render(
      <MemoryRouter>
        <QuizCard
          question={mockQuestion}
          selectedAnswer={null}
          onAnswer={() => {}}
          loading={true}
        />
      </MemoryRouter>
    )
    expect(screen.getByTestId('quiz-skeleton')).toBeInTheDocument()
    expect(screen.queryByTestId('quiz-card')).not.toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────
// TEST 2: Estado de error
// ─────────────────────────────────────────────
describe('Quiz — estado de error', () => {
  it('muestra el mensaje de error cuando la API falla', async () => {
    // Simulamos que fetch lanza un error
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    // Importamos Quiz dinámicamente para aplicar el mock
    const { default: Quiz } = await import('../pages/Quiz')

    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByTestId('error-state')).toBeInTheDocument()
    })

    vi.restoreAllMocks()
  })
})

// ─────────────────────────────────────────────
// TEST 3: Interactividad — respuesta correcta
// ─────────────────────────────────────────────
describe('QuizCard — interactividad', () => {
  it('llama a onAnswer cuando se hace clic en una opción', () => {
    const onAnswer = vi.fn()

    render(
      <MemoryRouter>
        <QuizCard
          question={mockQuestion}
          selectedAnswer={null}
          onAnswer={onAnswer}
          loading={false}
        />
      </MemoryRouter>
    )

    const boton = screen.getByTestId('answer-option-Bogotá')
    fireEvent.click(boton)

    expect(onAnswer).toHaveBeenCalledTimes(1)
    expect(onAnswer).toHaveBeenCalledWith('Bogotá')
  })

  it('no llama a onAnswer si ya hay una respuesta seleccionada', () => {
    const onAnswer = vi.fn()

    render(
      <MemoryRouter>
        <QuizCard
          question={mockQuestion}
          selectedAnswer="Medellín"
          onAnswer={onAnswer}
          loading={false}
        />
      </MemoryRouter>
    )

    const boton = screen.getByTestId('answer-option-Bogotá')
    fireEvent.click(boton)

    expect(onAnswer).not.toHaveBeenCalled()
  })
})

// ─────────────────────────────────────────────
// TEST 4: Timer — cuenta regresiva
// ─────────────────────────────────────────────
describe('Timer — cuenta regresiva', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('muestra el tiempo inicial correctamente', () => {
    render(<Timer timeLeft={15} progress={100} maxTime={15} />)
    expect(screen.getByTestId('timer')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('llama a onExpire cuando el tiempo llega a 0', async () => {
    const onExpire = vi.fn()

    const { result } = renderHook(() => useTimer(3, onExpire))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(onExpire).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    vi.useRealTimers()
  })
})
