import { useState } from 'react'

const KEY = 'quiz-high-score'

export function useHighScore() {
  const [highScore, setHighScore] = useState<number>(() => {
    const stored = localStorage.getItem(KEY)
    return stored ? parseInt(stored, 10) : 0
  })

  const updateHighScore = (score: number) => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem(KEY, String(score))
      return true
    }
    return false
  }

  const resetHighScore = () => {
    setHighScore(0)
    localStorage.removeItem(KEY)
  }

  return { highScore, updateHighScore, resetHighScore }
}
