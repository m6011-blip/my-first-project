import { useEffect, useState } from 'react'
import { openStatus } from '../lib/shop-time.js'

// Computed in the browser from the real opening hours, refreshed every minute.
export default function OpenStatus() {
  const [s, setS] = useState(() => openStatus())
  useEffect(() => {
    const t = setInterval(() => setS(openStatus()), 60000)
    return () => clearInterval(t)
  }, [])
  return (
    <p className={`status ${s.open ? 'is-open' : 'is-closed'}`} aria-live="polite">
      <span className="dot" aria-hidden="true" />
      {s.label}
    </p>
  )
}
