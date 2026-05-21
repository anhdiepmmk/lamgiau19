import { useState, useCallback } from 'react'
import NumberRod from './NumberRod'
import { RODS, WORDS } from '../data/rods'

function pickPair() {
  const a = Math.floor(Math.random() * 10)
  let b = Math.floor(Math.random() * 10)
  while (b === a) b = Math.floor(Math.random() * 10)
  const askMore = Math.random() > 0.5
  return { a, b, askMore }
}

export default function PhaseCompare({ onComplete }) {
  const [round, setRound] = useState(pickPair)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const { a, b, askMore } = round
  const correct = askMore
    ? (RODS[a].value > RODS[b].value ? a : b)
    : (RODS[a].value < RODS[b].value ? a : b)

  const handlePick = useCallback((picked) => {
    if (feedback) return
    if (picked === correct) {
      setFeedback('correct')
      const next = score + 1
      setTimeout(() => {
        if (next >= 5) { onComplete(); return }
        setScore(next)
        setRound(pickPair())
        setFeedback(null)
      }, 700)
    } else {
      setFeedback('wrong')
      setTimeout(() => setFeedback(null), 500)
    }
  }, [correct, score, feedback, onComplete])

  return (
    <div>
      <div className="phase-header">
        <h2>⚖️ So sánh</h2>
        <p>Đúng: {score}/5</p>
      </div>
      <div className="question">
        Thanh nào {askMore ? 'nhiều hơn' : 'ít hơn'}?
      </div>
      <div className="compare-rods">
        <div className={`compare-rod ${feedback === 'correct' && a === correct ? 'correct' : ''}`} onClick={() => handlePick(a)}>
          <NumberRod value={RODS[a].value} />
          <span style={{ marginLeft: 8, color: '#666' }}>{WORDS[a]}</span>
        </div>
        <div className={`compare-rod ${feedback === 'correct' && b === correct ? 'correct' : ''}`} onClick={() => handlePick(b)}>
          <NumberRod value={RODS[b].value} />
          <span style={{ marginLeft: 8, color: '#666' }}>{WORDS[b]}</span>
        </div>
      </div>
      <div className={`feedback ${feedback || ''}`}>
        {feedback === 'correct' ? 'Đúng rồi! 🎉' : feedback === 'wrong' ? 'Thử lại nhé! 💪' : ''}
      </div>
    </div>
  )
}
