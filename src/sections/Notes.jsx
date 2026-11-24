import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Bottle from '../components/Bottle.jsx'

gsap.registerPlugin(ScrollTrigger)

const stages = [
  { label: 'Top notes', title: 'Bergamot & pink pepper', text: 'The first ten minutes. Bright, sparkling, impossible to ignore.' },
  { label: 'Heart notes', title: 'Damask rose & saffron', text: 'The soul of the scent. Warm, velvety, it unfolds for hours.' },
  { label: 'Base notes', title: 'Oud, amber & musk', text: 'What remains on the skin and on your scarf, the next morning.' },
]

export default function Notes() {
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // One pinned, scrubbed timeline: liquid rises while each stage swaps in.
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=2400', pin: true, scrub: 1 },
      })
      tl.fromTo('.notes .liquid', { attr: { y: 180 } }, { attr: { y: 80 }, duration: 3 }, 0)
      gsap.utils.toArray('.stage').forEach((el, i) => {
        tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, i)
        if (i < stages.length - 1) tl.to(el, { opacity: 0, y: -40, duration: 0.5, ease: 'power2.in' }, i + 0.9)
      })
      tl.fromTo('.notes-progress span', { scaleX: 0 }, { scaleX: 1, duration: 3 }, 0)
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.stage', { opacity: 1, position: 'relative' })
    })
  }, { scope: root })

  return (
    <section id="notes" ref={root} className="notes">
      <div className="container notes-grid">
        <div className="notes-bottle"><Bottle c1="#ca8a04" c2="#3b0a22" className="bottle-lg" label="Bottle filling with fragrance" /></div>
        <div className="notes-copy">
          <p className="eyebrow">The pyramid</p>
          <h2>A fragrance is a story told in three acts</h2>
          <div className="stages">
            {stages.map((s) => (
              <article key={s.label} className="stage">
                <span className="stage-label">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
          <div className="notes-progress" aria-hidden="true"><span /></div>
        </div>
      </div>
    </section>
  )
}
