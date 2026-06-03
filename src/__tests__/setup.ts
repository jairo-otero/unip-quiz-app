import '@testing-library/jest-dom'

// Mock window.matchMedia (not supported in jsdom)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Mock AudioContext
Object.defineProperty(window, 'AudioContext', {
  writable: true,
  value: class {
    createOscillator() { return { connect: () => {}, frequency: { setValueAtTime: () => {} }, start: () => {}, stop: () => {} } }
    createGain() { return { connect: () => {}, gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} } } }
    get destination() { return {} }
    get currentTime() { return 0 }
    get state() { return 'running' }
    resume() { return Promise.resolve() }
  },
})
