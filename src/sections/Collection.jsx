import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import GlareHover from '../components/reactbits/GlareHover.jsx'
import Bottle from '../components/Bottle.jsx'
import { perfumes } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Collection() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 800px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () => track.current.scrollWidth - window.innerWidth + 96
      // Vertical scroll drives a horizontal move (ease must be "none").
      const scrollTween = gsap.to(track.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current, start: 'top top', end: () => `+=${getDistance()}`,
          pin: true, scrub: 1, invalidateOnRefresh: true,
        },
      })
      // Each card reacts to its horizontal position via containerAnimation.
      gsap.utils.toArray('.col-card').forEach((card) => {
        // The section's background takes on the colour of the card in view.
        ScrollTrigger.create({
          trigger: card, containerAnimation: scrollTween, start: 'left 60%', end: 'right 40%',
          onToggle: (self) => self.isActive && gsap.to(root.current, { backgroundColor: card.querySelector(".col-card-inner").dataset.bg, duration: 0.8, overwrite: true }),
        })
        gsap.from(card.querySelector('.bottle-md'), {
          y: 60, rotate: -6, opacity: 0.2, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: scrollTween, start: 'left 95%', end: 'left 55%', scrub: true },
        })
      })
    })
  }, { scope: root })

  return (
    <section id="collection" ref={root} className="collection">
      <div className="collection-head container">
        <p className="eyebrow">Six signatures</p>
        <h2>The collection</h2>
      </div>
      <div ref={track} className="collection-track">
        {perfumes.map((p, i) => (
          <GlareHover key={p.id} className="col-card" background={`linear-gradient(165deg, ${p.c1}55, ${p.c2} 70%)`} borderColor="#ffffff22" borderRadius="28px" glareColor="#fde68a" glareOpacity={0.3} width="min(380px, 80vw)" height="auto">
            <div className="col-card-inner" data-bg={p.c2}>
              <span className="col-num">0{i + 1}</span>
              <Bottle c1={p.c1} c2={p.c2} name={p.name.split(' ')[0]} className="bottle-md" label={p.name} />
              <h3>{p.name}</h3>
              <p className="muted">{p.notes}</p>
            </div>
          </GlareHover>
        ))}
      </div>
    </section>
  )
}
