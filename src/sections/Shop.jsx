import { useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import StarBorder from '../components/reactbits/StarBorder.jsx'
import Magnet from '../components/reactbits/Magnet.jsx'
import SplitText from '../components/reactbits/SplitText.jsx'
import Bottle from '../components/Bottle.jsx'
import { perfumes, families } from '../data.js'

gsap.registerPlugin(Flip, ScrollTrigger)

export default function Shop() {
  const root = useRef(null)
  const flipState = useRef(null)
  const [filter, setFilter] = useState('All')
  const [cart, setCart] = useState(0)
  const visible = perfumes.filter((p) => filter === 'All' || p.family === filter)

  // Cards fade up in batches as they enter the viewport.
  useGSAP(() => {
    gsap.set('.shop-card', { opacity: 0, y: 40 })
    ScrollTrigger.batch('.shop-card', {
      start: 'top 88%', once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }),
    })
  }, { scope: root })

  // FLIP: capture state before React re-renders, animate to the new layout after.
  useGSAP(() => {
    if (!flipState.current) return
    Flip.from(flipState.current, {
      duration: 0.7, ease: 'power2.inOut', absolute: true, stagger: 0.04,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.8, duration: 0.4 }),
    })
    flipState.current = null
  }, { scope: root, dependencies: [filter] })

  const choose = (f) => {
    if (f === filter) return
    flipState.current = Flip.getState('.shop-card')
    setFilter(f)
  }

  return (
    <section id="shop" ref={root} className="shop">
      <div className="container">
        <p className="eyebrow">Shop</p>
        <h2><SplitText text="Find your signature" tag="span" splitType="chars" effect="rise" delay={30} textAlign="left" /></h2>
        <div className="filters" role="group" aria-label="Filter by fragrance family">
          {families.map((f) => (
            <button key={f} className={`chip ${f === filter ? 'on' : ''}`} aria-pressed={f === filter} onClick={() => choose(f)}>{f}</button>
          ))}
          <span className="cart" aria-live="polite">Bag ({cart})</span>
        </div>
        <div className="shop-grid">
          {visible.map((p) => (
            <article key={p.id} className="shop-card" data-flip-id={p.id}>
              <Bottle c1={p.c1} c2={p.c2} className="bottle-sm" label={p.name} />
              <div className="shop-meta">
                <span className="tag">{p.family}</span>
                <h3>{p.name}</h3>
                <p className="muted">{p.notes}</p>
                <div className="shop-row">
                  <strong>${p.price}</strong>
                  <Magnet padding={40} magnetStrength={3}>
                    <StarBorder theme="dark" color="#ca8a04" duration={5} onClick={() => setCart((c) => c + 1)}>Add to bag</StarBorder>
                  </Magnet>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
