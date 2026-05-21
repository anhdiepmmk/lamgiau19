import { useState } from 'react'
import PhaseExplore from './components/PhaseExplore'
import PhaseQuiz from './components/PhaseQuiz'
import PhaseBuild from './components/PhaseBuild'
import ProgressBar from './components/ProgressBar'
import './App.css'

export default function App() {
  const [phase, setPhase] = useState('welcome')

  if (phase === 'welcome') {
    return (
      <div className="app">
        <div className="welcome">
          <h1>🧱 Vật Liệu Phân Cấp Gỗ</h1>
          <p>Khám phá hệ thống số từ đơn vị đến hàng triệu!</p>
          <p className="subtitle">Mỗi gia đình số có: khối vuông (đơn vị), thanh (chục), tấm (trăm)</p>
          <button className="btn-primary" onClick={() => setPhase('explore')}>Bắt đầu 🚀</button>
        </div>
      </div>
    )
  }

  if (phase === 'complete') {
    return (
      <div className="app">
        <div className="welcome">
          <h1>🎉 Chúc mừng!</h1>
          <p>Con đã hiểu hệ thống phân cấp số rồi!</p>
          <p>Từ đơn vị → nghìn → triệu, mỗi gia đình đều có cube, thanh, tấm giống nhau!</p>
          <button className="btn-primary" onClick={() => setPhase('welcome')}>Chơi lại 🔄</button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <ProgressBar phase={phase} />
      {phase === 'explore' && <PhaseExplore onComplete={() => setPhase('quiz')} />}
      {phase === 'quiz' && <PhaseQuiz onComplete={() => setPhase('build')} />}
      {phase === 'build' && <PhaseBuild onComplete={() => setPhase('complete')} />}
    </div>
  )
}
