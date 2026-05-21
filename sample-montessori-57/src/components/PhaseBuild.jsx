import { useState, useCallback } from 'react'
import HierarchyBlocks from './HierarchyBlocks'
import { BLOCKS, formatNumber } from '../data/blocks'

function generateTarget() {
  // Random digits 1-5 for some place values, 0 for others (ensure at least 3 non-zero)
  const places = [1, 10, 100, 1000, 10000, 100000, 1000000]
  let num = 0
  const used = []
  // Pick 3-5 random place values
  const count = 3 + Math.floor(Math.random() * 3)
  const shuffled = [...places].sort(() => Math.random() - 0.5).slice(0, count)
  shuffled.forEach(p => {
    const digit = 1 + Math.floor(Math.random() * 5)
    num += digit * p
    used.push({ value: p, count: digit })
  })
  return num
}

export default function PhaseBuild({ onComplete }) {
  const [target, setTarget] = useState(generateTarget)
  const [current, setCurrent] = useState(0)
  const [items, setItems] = useState([])
  const [round, setRound] = useState(0)
  const [feedback, setFeedback] = useState('')

  const handleClick = useCallback((block) => {
    const next = current + block.value
    if (next > target) {
      setFeedback('Quá lớn! Bớt đi nhé 🤔')
      setTimeout(() => setFeedback(''), 800)
      return
    }
    setCurrent(next)
    setItems(prev => [...prev, block.name])
    if (next === target) {
      setFeedback('Tuyệt vời! 🎉')
      const nextRound = round + 1
      setTimeout(() => {
        if (nextRound >= 3) { onComplete(); return }
        setRound(nextRound)
        setTarget(generateTarget())
        setCurrent(0)
        setItems([])
        setFeedback('')
      }, 1000)
    }
  }, [current, target, round, onComplete])

  const reset = () => { setCurrent(0); setItems([]); setFeedback('') }

  return (
    <div>
      <div className="phase-header">
        <h2>🏗️ Xây số</h2>
        <p>Lượt: {round + 1}/3</p>
      </div>
      <div className="build-area">
        <div>Hãy xây số:</div>
        <div className="target-number">{formatNumber(target)}</div>
        <div className="current-sum">Hiện tại: {formatNumber(current)}</div>
        <div className="build-items">
          {items.map((name, i) => <span key={i} className="build-item">{name}</span>)}
        </div>
        {items.length > 0 && <button className="btn-reset" onClick={reset}>Xóa 🗑️</button>}
      </div>
      <HierarchyBlocks onBlockClick={handleClick} />
      <div className={`feedback ${feedback.includes('🎉') ? 'correct' : feedback ? 'wrong' : ''}`}>
        {feedback}
      </div>
    </div>
  )
}
