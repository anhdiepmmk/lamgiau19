import { useState } from 'react'
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import NumberRod from './NumberRod'
import { RODS } from '../data/rods'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function SortableRod({ rod }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: rod.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`sort-item ${isDragging ? 'dragging' : ''}`}>
      <span style={{ fontSize: '0.9rem', width: 24, color: '#666' }}>{rod.value}</span>
      <NumberRod value={rod.value} />
    </div>
  )
}

export default function PhaseSort({ onComplete }) {
  const [items, setItems] = useState(() => shuffle(RODS))
  const [done, setDone] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setItems(prev => {
      const oldIdx = prev.findIndex(r => r.id === active.id)
      const newIdx = prev.findIndex(r => r.id === over.id)
      const next = arrayMove(prev, oldIdx, newIdx)
      if (next.every((r, i) => r.value === i + 1)) setDone(true)
      return next
    })
  }

  return (
    <div>
      <div className="phase-header">
        <h2>📏 Sắp xếp thanh số</h2>
        <p>Kéo thả để xếp từ ngắn đến dài!</p>
      </div>

      {done ? (
        <>
          <div className="feedback correct">Tuyệt vời! Bậc thang hoàn hảo! 🎉</div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button className="btn-primary" onClick={onComplete}>Tiếp tục →</button>
          </div>
        </>
      ) : null}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(r => r.id)} strategy={verticalListSortingStrategy}>
          <div className="sort-list">
            {items.map(rod => <SortableRod key={rod.id} rod={rod} />)}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
