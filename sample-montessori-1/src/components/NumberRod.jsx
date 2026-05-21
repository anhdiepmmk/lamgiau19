const SEG_W = 40

export default function NumberRod({ value, onSegmentClick, highlightCount = 0, className = '', onClick }) {
  return (
    <div className={`rod ${className}`} onClick={onClick} style={{ display: 'flex' }}>
      {Array.from({ length: value }, (_, i) => (
        <div
          key={i}
          className={`segment ${i < highlightCount ? 'highlighted' : ''}`}
          style={{ background: i % 2 === 0 ? '#E53935' : '#1E88E5', width: SEG_W, height: SEG_W }}
          onClick={onSegmentClick ? (e) => { e.stopPropagation(); onSegmentClick(i) } : undefined}
        />
      ))}
    </div>
  )
}
