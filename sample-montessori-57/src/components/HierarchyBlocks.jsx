import { BLOCKS, FAMILIES } from '../data/blocks'

const BASE = 40
const SHAPES = {
  cube: (s) => ({ width: BASE * s, height: BASE * s, borderRadius: 6 }),
  bar: (s) => ({ width: BASE * s * 2.5, height: BASE * s * 0.7, borderRadius: 4 }),
  square: (s) => ({ width: BASE * s * 2.5, height: BASE * s * 2.5, borderRadius: 4 }),
}

export default function HierarchyBlocks({ onBlockClick, highlightedIds = [], classMap = {} }) {
  return (
    <div className="families">
      {FAMILIES.map(fam => (
        <div key={fam.id} className="family-group">
          <h3>{fam.name}</h3>
          <div className="family-blocks">
            {BLOCKS.filter(b => b.family === fam.id).map(block => {
              const style = { ...SHAPES[block.shape](fam.scale), background: block.color }
              const cls = ['block', classMap[block.id] || '', highlightedIds.includes(block.id) ? 'explored' : ''].join(' ')
              return (
                <div key={block.id} className={cls} style={style} onClick={() => onBlockClick(block)}>
                  {block.shape === 'cube' ? '■' : block.shape === 'bar' ? '▬' : '▪'}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
