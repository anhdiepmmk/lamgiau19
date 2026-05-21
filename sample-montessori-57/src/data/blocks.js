export const FAMILIES = [
  { id: 'simple', name: 'Gia đình đơn giản', scale: 1 },
  { id: 'thousands', name: 'Gia đình nghìn', scale: 1.5 },
  { id: 'millions', name: 'Gia đình triệu', scale: 2 },
]

export const BLOCKS = [
  { id: 'u1', name: 'Đơn vị', value: 1, color: '#4CAF50', shape: 'cube', family: 'simple' },
  { id: 't1', name: 'Chục', value: 10, color: '#2196F3', shape: 'bar', family: 'simple' },
  { id: 'h1', name: 'Trăm', value: 100, color: '#F44336', shape: 'square', family: 'simple' },
  { id: 'u2', name: 'Đơn vị nghìn', value: 1000, color: '#4CAF50', shape: 'cube', family: 'thousands' },
  { id: 't2', name: 'Chục nghìn', value: 10000, color: '#2196F3', shape: 'bar', family: 'thousands' },
  { id: 'h2', name: 'Trăm nghìn', value: 100000, color: '#F44336', shape: 'square', family: 'thousands' },
  { id: 'u3', name: 'Đơn vị triệu', value: 1000000, color: '#4CAF50', shape: 'cube', family: 'millions' },
  { id: 't3', name: 'Chục triệu', value: 10000000, color: '#2196F3', shape: 'bar', family: 'millions' },
  { id: 'h3', name: 'Trăm triệu', value: 100000000, color: '#F44336', shape: 'square', family: 'millions' },
]

export const formatNumber = (n) => n.toLocaleString('vi-VN')
