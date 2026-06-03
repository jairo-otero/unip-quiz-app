import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(seconds: number, onExpire: () => void) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          setIsRunning(false)
          onExpireRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current!)
  }, [isRunning])

  const start = useCallback(() => {
    setTimeLeft(seconds)
    setIsRunning(true)
  }, [seconds])

  const stop = useCallback(() => {
    clearInterval(intervalRef.current!)
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    clearInterval(intervalRef.current!)
    setTimeLeft(seconds)
    setIsRunning(false)
  }, [seconds])

  const progress = (timeLeft / seconds) * 100

  return { timeLeft, isRunning, progress, start, stop, reset }
}
