import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Magnet from '../components/reactbits/Magnet.jsx'
import { scrollToId } from '../lenis.js'

const links = [['notes', 'Notes'], ['collection', 'Collection'], ['shop', 'Shop'], ['story', 'Story']]

export default function Nav() {
  const ref = useRef(null)
  useGSAP(() => {
    gsap.from(ref.current, { y: -30, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 })
    // Hide on scroll down, show on scroll up.
    const show = gsap.to(ref.current, { yPercent: -120, paused: true, duration: 0.35, ease: 'power2.out' })
    navTrigger(show)
  }, { scope: ref })

  return (
    <header ref={ref} className="nav">
      <a href="#top" className="logo" onClick={(e) => { e.preventDefault(); scrollToId('top') }}>Maison Aura</a>
      <nav aria-label="Primary">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id) }}>{label}</a>
        ))}
      </nav>
      <Magnet padding={60} magnetStrength={3}>
        <button className="btn btn-sm" onClick={() => scrollToId('shop')}>Shop now</button>
      </Magnet>
    </header>
  )
}

function navTrigger(show) {
  ScrollTrigger.create({
    start: 'top -120',
    end: 'max',
    onUpdate: (self) => (self.direction === 1 ? show.play() : show.reverse()),
  })
}
