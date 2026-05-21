import { useState } from 'react'
import HierarchyBlocks from './HierarchyBlocks'
import { formatNumber } from '../data/blocks'

export default function PhaseExplore({ onComplete }) {
  const [explored, setExplored] = useState(new Set())
  const [active, setActive] = useState(null)

  const handleClick = (block) => {
    setActive(block)
    setExplored(prev => new Set([...prev, block.id]))
  }

  return (
    <div>
      <div className="phase-header">
        <h2>🔍 Khám phá các khối</h2>
        <p>Nhấn vào từng khối để xem tên và giá trị! ({explored.size}/9)</p>
      </div>

      <div style={{ position: 'relative' }}>
        <HierarchyBlocks onBlockClick={handleClick} highlightedIds={[...explored]} />
      </div>

      {active && (
        <div className="feedback correct" style={{ marginTop: 16 }}>
          {active.name} — {formatNumber(active.value)}
        </div>
      )}

      {explored.size === 9 && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button className="btn-primary" onClick={onComplete}>Tiếp tục →</button>
        </div>
      )}
    </div>
  )
}
