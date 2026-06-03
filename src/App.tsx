import { Routes, Route, Navigate } from 'react-router-dom'
import { useDarkMode } from './hooks/useDarkMode'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'

function App() {
  const { isDark } = useDarkMode()

  return (
    <div className={isDark ? '' : 'light'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
