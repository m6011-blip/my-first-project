import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Soft gold ring that follows the pointer and grows over interactive elements.
export default function Cursor() {
  const ring = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const x = gsap.quickTo(ring.current, 'x', { duration: 0.35, ease: 'power3' })
    const y = gsap.quickTo(ring.current, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e) => { x(e.clientX); y(e.clientY) }
    const over = (e) => gsap.to(ring.current, { scale: e.target.closest('a,button,.col-card,.shop-card') ? 2.4 : 1, duration: 0.3 })
    gsap.set(ring.current, { opacity: 1 })
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over) }
  }, [])
  return <div ref={ring} className="cursor" aria-hidden="true" />
}
