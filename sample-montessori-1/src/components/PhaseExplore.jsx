import { useState } from 'react'
import NumberRod from './NumberRod'
import { RODS, WORDS } from '../data/rods'

export default function PhaseExplore({ onComplete }) {
  const [current, setCurrent] = useState(0)
  const [tapped, setTapped] = useState(0)
  const [done, setDone] = useState(false)

  const rod = RODS[current]

  const handleSegment = (i) => {
    if (done) return
    if (i === tapped) {
      const next = tapped + 1
      setTapped(next)
      if (next === rod.value) setDone(true)
    }
  }

  const next = () => {
    if (current < 9) {
      setCurrent(current + 1)
      setTapped(0)
      setDone(false)
    } else {
      onComplete()
    }
  }

  return (
    <div>
      <div className="phase-header">
        <h2>🔍 Khám phá thanh số</h2>
        <p>Chạm từng đoạn để đếm! ({current + 1}/10)</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
        <NumberRod value={rod.value} onSegmentClick={handleSegment} highlightCount={tapped} />
      </div>

      <div className="question">
        {done
          ? `Đây là ${rod.label}! ✨`
          : tapped > 0
            ? WORDS.slice(0, tapped).join(', ')
            : 'Chạm vào đoạn đầu tiên →'}
      </div>

      {done && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button className="btn-primary" onClick={next}>
            {current < 9 ? 'Thanh tiếp theo →' : 'Tiếp tục →'}
          </button>
        </div>
      )}
    </div>
  )
}
