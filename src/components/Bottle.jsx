import { useId } from 'react'

// Glass perfume bottle: gold cap, tinted liquid, reflections and a small label.
export default function Bottle({ c1 = '#CA8A04', c2 = '#1c1917', className = '', liquidRef, draw = false, label, name = 'AURA' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={className} viewBox="0 0 160 260" role="img" aria-label={label || 'Perfume bottle'} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".18" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".02" />
          <stop offset="1" stopColor="#fff" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={`m${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a5a00" />
          <stop offset=".3" stopColor="#f6d77a" />
          <stop offset=".55" stopColor="#c8921a" />
          <stop offset="1" stopColor="#6b4300" />
        </linearGradient>
        <clipPath id={`c${id}`}><rect x="30" y="112" width="100" height="132" rx="16" /></clipPath>
        <radialGradient id={`s${id}`}><stop offset="0" stopColor="#000" stopOpacity=".55" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="80" cy="252" rx="62" ry="7" fill={`url(#s${id})`} />
      {/* liquid */}
      <g clipPath={`url(#c${id})`}>
        <rect x="30" y="112" width="100" height="132" fill="#0c0a09" opacity=".55" />
        <rect ref={liquidRef} className="liquid" x="30" y="140" width="100" height="110" fill={`url(#l${id})`} />
      </g>
      {/* glass body */}
      <rect x="30" y="112" width="100" height="132" rx="16" fill={`url(#g${id})`} />
      <rect className={draw ? 'draw' : ''} x="30" y="112" width="100" height="132" rx="16" fill="none" stroke="currentColor" strokeOpacity=".85" strokeWidth="1.4" />
      <path className={draw ? 'draw' : ''} d="M42 128v96" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M118 124v60" stroke="#fff" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* label */}
      <rect x="52" y="164" width="56" height="40" rx="3" fill="#0c0a09" fillOpacity=".55" stroke="currentColor" strokeOpacity=".6" strokeWidth=".8" />
      <text x="80" y="184" textAnchor="middle" fontFamily="Cormorant, serif" fontSize="13" letterSpacing="3" fill="currentColor">{name.toUpperCase()}</text>
      <text x="80" y="196" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="4" letterSpacing="1" fill="currentColor" opacity=".7">EAU DE PARFUM</text>
      {/* neck + cap */}
      <rect x="62" y="98" width="36" height="16" rx="3" fill={`url(#m${id})`} />
      <rect className={draw ? 'draw' : ''} x="52" y="22" width="56" height="78" rx="8" fill={`url(#m${id})`} stroke="#f6d77a" strokeOpacity=".6" strokeWidth="1" />
      {[34, 44, 54, 64, 74, 84].map((y) => <path key={y} d={`M52 ${y}h56`} stroke="#000" strokeOpacity=".18" strokeWidth="1" />)}
    </svg>
  )
}
