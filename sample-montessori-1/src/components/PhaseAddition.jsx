import { useState } from 'react'
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors, useDraggable, useDroppable } from '@dnd-kit/core'
import NumberRod from './NumberRod'
import { RODS } from '../data/rods'

function generateTarget() {
  const target = 4 + Math.floor(Math.random() * 7) // 4-10
  return target
}

function DraggableRod({ rod, disabled }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: rod.id, disabled })
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : {}
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className={`draggable-rod ${isDragging ? 'dragging' : ''}`} style={style}>
      <NumberRod value={rod.value} />
    </div>
  )
}

function DropZone({ children, isOver }) {
  const { setNodeRef } = useDroppable({ id: 'combine-zone' })
  return (
    <div ref={setNodeRef} className={`combine-zone ${isOver ? 'over' : ''}`}>
      {children}
    </div>
  )
}

export default function PhaseAddition({ onComplete }) {
  const [target, setTarget] = useState(generateTarget)
  const [selected, setSelected] = useState([])
  const [round, setRound] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isOver, setIsOver] = useState(false)

  const sum = selected.reduce((s, v) => s + v, 0)
  const available = RODS.filter(r => r.value < target)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  )

  const handleDragEnd = (event) => {
    setIsOver(false)
    const { active, over } = event
    if (!over || over.id !== 'combine-zone') return
    const rod = RODS.find(r => r.id === active.id)
    if (!rod) return
    const newSum = sum + rod.value
    if (newSum > target) {
      setFeedback('Quá lớn! Thử lại nhé 🤔')
      setTimeout(() => setFeedback(''), 800)
      return
    }
    const next = [...selected, rod.value]
    setSelected(next)
    if (newSum === target) {
      setFeedback(`${next.join(' + ')} = ${target}! 🎉`)
      const nextRound = round + 1
      setTimeout(() => {
        if (nextRound >= 3) { onComplete(); return }
        setRound(nextRound)
        setTarget(generateTarget())
        setSelected([])
        setFeedback('')
      }, 1200)
    }
  }

  const reset = () => { setSelected([]); setFeedback('') }

  return (
    <div>
      <div className="phase-header">
        <h2>➕ Phép cộng</h2>
        <p>Lượt: {round + 1}/3 — Ghép thanh để bằng thanh mục tiêu!</p>
      </div>

      <div className="addition-target">
        <div style={{ color: '#666', marginBottom: 8 }}>Thanh mục tiêu: {target}</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NumberRod value={target} />
        </div>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragOver={(e) => setIsOver(!!e.over)}>
        <DropZone isOver={isOver}>
          {selected.length === 0
            ? <span style={{ color: '#aaa' }}>Kéo thanh vào đây</span>
            : selected.map((v, i) => <NumberRod key={i} value={v} />)
          }
        </DropZone>

        {sum > 0 && sum < target && (
          <div className="equation">Hiện tại: {selected.join(' + ')} = {sum}</div>
        )}

        <div className="available-rods">
          {available.map(rod => (
            <DraggableRod key={rod.id} rod={rod} disabled={sum + rod.value > target} />
          ))}
        </div>
      </DndContext>

      {selected.length > 0 && sum < target && (
        <div style={{ textAlign: 'center' }}>
          <button className="btn-reset" onClick={reset}>Xóa 🗑️</button>
        </div>
      )}

      <div className={`feedback ${feedback.includes('🎉') ? 'correct' : feedback ? 'wrong' : ''}`}>
        {feedback}
      </div>
    </div>
  )
}
