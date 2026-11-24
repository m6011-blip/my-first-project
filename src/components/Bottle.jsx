import { useId } from 'react'

export default function Bottle({ c1 = '#CA8A04', c2 = '#1c1917', className = '', liquidRef, draw = false, label }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={className} viewBox="0 0 120 200" role="img" aria-label={label || 'Perfume bottle'}>
      <defs>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <clipPath id={`c${id}`}>
          <rect x="22" y="78" width="76" height="102" rx="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#c${id})`}>
        <rect ref={liquidRef} className="liquid" x="22" y="100" width="76" height="90" fill={`url(#l${id})`} />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <rect className={draw ? 'draw' : ''} x="22" y="78" width="76" height="102" rx="12" />
        <path className={draw ? 'draw' : ''} d="M48 78V62h24v16" />
        <rect className={draw ? 'draw' : ''} x="44" y="22" width="32" height="40" rx="6" />
        <path className={draw ? 'draw' : ''} d="M34 96c6-3 14-3 20 0" opacity=".5" />
      </g>
    </svg>
  )
}
