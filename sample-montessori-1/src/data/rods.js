export const WORDS = ['một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười']

export const RODS = Array.from({ length: 10 }, (_, i) => ({
  id: `rod-${i + 1}`,
  value: i + 1,
  label: WORDS[i],
}))
