import { useRef, useCallback } from 'react'

type SoundType = 'correct' | 'wrong'

function generateTone(
  type: SoundType,
  ctx: AudioContext
): void {
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  if (type === 'correct') {
    oscillator.frequency.setValueAtTime(523, ctx.currentTime)
    oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1)
    oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2)
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.5)
  } else {
    oscillator.frequency.setValueAtTime(300, ctx.currentTime)
    oscillator.frequency.setValueAtTime(200, ctx.currentTime + 0.15)
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.4)
  }
}

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null)

  const play = useCallback((type: SoundType) => {
    try {
      if (!ctxRef.current) {
        ctxRef.current = new AudioContext()
      }
      if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume()
      }
      generateTone(type, ctxRef.current)
    } catch {
      // Silently fail if audio is not available
    }
  }, [])

  return { play }
}
