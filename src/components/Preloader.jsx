import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Gold counter + curtain that lifts when the page is ready.
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const [n, setN] = useState(0)
  useGSAP(() => {
    const o = { v: 0 }
    const tl = gsap.timeline({ onComplete: onDone })
    tl.to(o, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => setN(Math.round(o.v)) })
      .to('.pre-word', { yPercent: -110, opacity: 0, duration: 0.5, ease: 'power3.in' })
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.1')
  }, { scope: root })
  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="pre-word"><span>Maison Aura</span><em>{n}</em></div>
    </div>
  )
}
