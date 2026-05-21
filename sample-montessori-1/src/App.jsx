import { useState } from 'react'
import ProgressBar from './components/ProgressBar'
import PhaseExplore from './components/PhaseExplore'
import PhaseQuiz from './components/PhaseQuiz'
import PhaseSort from './components/PhaseSort'
import PhaseCompare from './components/PhaseCompare'
import PhaseAddition from './components/PhaseAddition'
import './App.css'

export default function App() {
  const [phase, setPhase] = useState('welcome')

  if (phase === 'welcome') {
    return (
      <div className="app">
        <div className="welcome">
          <h1>🔢 Thanh Số Montessori</h1>
          <p>Khám phá số từ 1 đến 10 bằng thanh số màu sắc!</p>
          <p className="subtitle">Chạm, đếm, sắp xếp và cộng số cùng nhau</p>
          <button className="btn-primary" onClick={() => setPhase('explore')}>Bắt đầu 🚀</button>
        </div>
      </div>
    )
  }

  if (phase === 'complete') {
    return (
      <div className="app">
        <div className="welcome">
          <h1>🎉 Chúc mừng con!</h1>
          <p>Con đã học xong số từ 1 đến 10 rồi!</p>
          <p>Con biết đếm, sắp xếp, so sánh và cộng số!</p>
          <button className="btn-primary" onClick={() => setPhase('welcome')}>Chơi lại 🔄</button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <ProgressBar phase={phase} />
      {phase === 'explore' && <PhaseExplore onComplete={() => setPhase('quiz')} />}
      {phase === 'quiz' && <PhaseQuiz onComplete={() => setPhase('sort')} />}
      {phase === 'sort' && <PhaseSort onComplete={() => setPhase('compare')} />}
      {phase === 'compare' && <PhaseCompare onComplete={() => setPhase('addition')} />}
      {phase === 'addition' && <PhaseAddition onComplete={() => setPhase('complete')} />}
    </div>
  )
}
