const STEPS = [
  { id: 'explore', label: '🔍 Khám phá' },
  { id: 'quiz', label: '❓ Nhận biết' },
  { id: 'sort', label: '📏 Sắp xếp' },
  { id: 'compare', label: '⚖️ So sánh' },
  { id: 'addition', label: '➕ Phép cộng' },
]

export default function ProgressBar({ phase }) {
  const idx = STEPS.findIndex(s => s.id === phase)
  return (
    <div className="progress-bar">
      {STEPS.map((step, i) => (
        <span key={step.id} className={`progress-step ${i === idx ? 'active' : i < idx ? 'done' : ''}`}>
          {step.label}
        </span>
      ))}
    </div>
  )
}
