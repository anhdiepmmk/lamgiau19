import { useState, useCallback } from 'react'
import HierarchyBlocks from './HierarchyBlocks'
import { BLOCKS, formatNumber } from '../data/blocks'

function pickRandom(exclude) {
  const pool = BLOCKS.filter(b => b.id !== exclude)
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function PhaseQuiz({ onComplete }) {
  const [target, setTarget] = useState(() => pickRandom(null))
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [classMap, setClassMap] = useState({})

  const handleClick = useCallback((block) => {
    if (feedback) return
    if (block.id === target.id) {
      setFeedback({ type: 'correct', text: 'Đúng rồi! 🎉' })
      setClassMap({ [block.id]: 'correct' })
      const next = score + 1
      setTimeout(() => {
        if (next >= 5) { onComplete(); return }
        setScore(next)
        setTarget(pickRandom(block.id))
        setFeedback(null)
        setClassMap({})
      }, 800)
    } else {
      setFeedback({ type: 'wrong', text: 'Thử lại nhé! 💪' })
      setClassMap({ [block.id]: 'wrong' })
      setTimeout(() => { setFeedback(null); setClassMap({}) }, 600)
    }
  }, [target, score, feedback, onComplete])

  const useNameQuestion = Math.random() > 0.5
  const question = useNameQuestion
    ? `Đâu là "${target.name}"?`
    : `Hãy tìm số ${formatNumber(target.value)}!`

  return (
    <div>
      <div className="phase-header">
        <h2>❓ Trắc nghiệm</h2>
        <p>Đúng: {score}/5</p>
      </div>
      <div className="question">{question}</div>
      <HierarchyBlocks onBlockClick={handleClick} classMap={classMap} />
      <div className={`feedback ${feedback?.type || ''}`}>{feedback?.text || ''}</div>
    </div>
  )
}
