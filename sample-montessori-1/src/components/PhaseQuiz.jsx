import { useState, useCallback } from 'react'
import NumberRod from './NumberRod'
import { RODS, WORDS } from '../data/rods'

const GROUPS = [[0, 1, 2], [3, 4, 5], [6, 7, 8, 9]]

export default function PhaseQuiz({ onComplete }) {
  const [groupIdx, setGroupIdx] = useState(0)
  const [stage, setStage] = useState(1) // 1=introduce, 2=recognize, 3=recall
  const [itemIdx, setItemIdx] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const group = GROUPS[groupIdx]
  const targetRodIdx = group[itemIdx % group.length]
  const rod = RODS[targetRodIdx]

  const advance = useCallback(() => {
    setFeedback(null)
    const nextItem = itemIdx + 1
    if (nextItem < group.length) {
      setItemIdx(nextItem)
    } else if (stage < 3) {
      setStage(stage + 1)
      setItemIdx(0)
    } else if (groupIdx < GROUPS.length - 1) {
      setGroupIdx(groupIdx + 1)
      setStage(1)
      setItemIdx(0)
    } else {
      onComplete()
    }
  }, [itemIdx, stage, groupIdx, group.length, onComplete])

  // Stage 1: Introduction
  if (stage === 1) {
    return (
      <div>
        <div className="phase-header">
          <h2>❓ Nhận biết — Giai đoạn 1</h2>
          <p>Giới thiệu: Xem và nhớ!</p>
        </div>
        <div className="question">Đây là {rod.label}!</div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <NumberRod value={rod.value} highlightCount={rod.value} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="btn-primary" onClick={advance}>Tiếp →</button>
        </div>
      </div>
    )
  }

  // Stage 2: Recognition — "Cho cô xem thanh X"
  if (stage === 2) {
    const handlePick = (picked) => {
      if (picked === targetRodIdx) {
        setFeedback('correct')
        setTimeout(advance, 700)
      } else {
        setFeedback('wrong')
        setTimeout(() => setFeedback(null), 500)
      }
    }

    return (
      <div>
        <div className="phase-header">
          <h2>❓ Nhận biết — Giai đoạn 2</h2>
          <p>Cho cô xem thanh đúng!</p>
        </div>
        <div className="question">Cho cô xem thanh {rod.label}!</div>
        <div className="quiz-rods">
          {group.map(i => (
            <div key={i} className={`quiz-rod ${feedback && i === targetRodIdx ? 'correct' : ''}`} onClick={() => handlePick(i)}>
              <NumberRod value={RODS[i].value} />
            </div>
          ))}
        </div>
        <div className={`feedback ${feedback || ''}`}>
          {feedback === 'correct' ? 'Đúng rồi! 🎉' : feedback === 'wrong' ? 'Thử lại nhé! 💪' : ''}
        </div>
      </div>
    )
  }

  // Stage 3: Recall — "Đây là mấy?"
  const choices = group.map(i => RODS[i])
  const handleChoice = (val) => {
    if (val === rod.value) {
      setFeedback('correct')
      setTimeout(advance, 700)
    } else {
      setFeedback('wrong')
      setTimeout(() => setFeedback(null), 500)
    }
  }

  return (
    <div>
      <div className="phase-header">
        <h2>❓ Nhận biết — Giai đoạn 3</h2>
        <p>Đây là mấy?</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <NumberRod value={rod.value} />
      </div>
      <div className="question">Đây là mấy?</div>
      <div className="choices">
        {choices.map(r => (
          <button key={r.id} className={`choice-btn ${feedback === 'correct' && r.value === rod.value ? 'correct' : ''}`} onClick={() => handleChoice(r.value)}>
            {r.value}
          </button>
        ))}
      </div>
      <div className={`feedback ${feedback || ''}`}>
        {feedback === 'correct' ? 'Đúng rồi! 🎉' : feedback === 'wrong' ? 'Thử lại nhé! 💪' : ''}
      </div>
    </div>
  )
}
