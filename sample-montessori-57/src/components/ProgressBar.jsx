const STEPS = [
  { id: 'explore', label: '🔍 Khám phá' },
  { id: 'quiz', label: '❓ Trắc nghiệm' },
  { id: 'build', label: '🏗️ Xây số' },
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
