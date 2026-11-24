import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ShinyText from '../components/reactbits/ShinyText.jsx'
import SplitText from '../components/reactbits/SplitText.jsx'

gsap.registerPlugin(ScrollTrigger)

const stats = [[18, 'years of craft', ''], [42, 'rare ingredients', ''], [6, 'signature scents', ''], [98, 'repeat clients', '%']]

export default function Story() {
  const root = useRef(null)

  useGSAP(() => {
    // Counters animate once when the stats row enters view.
    gsap.utils.toArray('.stat-num').forEach((el) => {
      const end = Number(el.dataset.end)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: end, duration: 2, ease: 'power2.out', snap: { v: 1 },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => { el.textContent = obj.v + (el.dataset.suffix || '') },
      })
    })
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to('.story-bg', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
  }, { scope: root })

  return (
    <section id="story" ref={root} className="story">
      <div className="story-bg" aria-hidden="true" />
      <div className="container story-inner">
        <p className="eyebrow"><ShinyText text="Our story" color="#ca8a04" shineColor="#fef3c7" speed={3} /></p>
        <h2 className="story-title">
          <SplitText text="Every bottle begins as a handwritten note" tag="span" splitType="words" effect="blur" delay={60} textAlign="left" />
        </h2>
        <p className="story-text">Founded in a small Paris atelier, Maison Aura sources raw materials directly from growers and distils them in tiny batches. No shortcuts, no trends: just scents with a point of view.</p>
        <dl className="stats">
          {stats.map(([n, label, suffix]) => (
            <div key={label}>
              <dt className="stat-num" data-end={n} data-suffix={suffix}>0{suffix}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
