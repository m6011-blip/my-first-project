import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SplitText from '../components/reactbits/SplitText.jsx'
import ShinyText from '../components/reactbits/ShinyText.jsx'
import StarBorder from '../components/reactbits/StarBorder.jsx'
import Magnet from '../components/reactbits/Magnet.jsx'
import Silk from '../components/reactbits/Silk.jsx'
import Bottle from '../components/Bottle.jsx'
import { scrollToId } from '../lenis.js'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

export default function Hero({ ready }) {
  const root = useRef(null)
  const tlRef = useRef(null)
  useEffect(() => { if (ready) tlRef.current?.play() }, [ready])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Intro timeline: bottle outline is drawn, liquid fills, copy fades in.
      const tl = gsap.timeline({ paused: !ready, defaults: { ease: 'power3.out' } })
      tlRef.current = tl
      tl.from('.hero .draw', { drawSVG: 0, duration: 1.8, stagger: 0.15, ease: 'power2.inOut' })
        .from('.hero .liquid', { attr: { y: 250 }, duration: 1.4, ease: 'power2.inOut' }, '-=0.8')
        .from('.hero-eyebrow, .hero-sub, .hero-cta', { y: 24, opacity: 0, stagger: 0.12, duration: 0.8 }, '-=0.6')

      // Floating bottle + scroll parallax.
      gsap.to('.hero-bottle', { y: -14, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.hero-glow', {
        yPercent: 30, scale: 1.3, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-inner', {
        yPercent: -12, opacity: 0.2, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'center center', end: 'bottom top', scrub: true },
      })
    })
  }, { scope: root })

  return (
    <section id="top" ref={root} className="hero">
      <div className="hero-silk" aria-hidden="true"><Silk color="#4a3206" sheenColor="#f5c96b" speed={3} scale={1.1} noiseIntensity={1.2} sheen={0.7} glow={0.5} /></div>
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="hero-eyebrow"><ShinyText text="Niche perfumery · Paris" color="#a8a29e" shineColor="#ca8a04" speed={3} /></p>
          <h1>
            {ready && <SplitText text="Wear a memory you cannot name" tag="span" splitType="words" effect="blur" delay={70} duration={1} textAlign="left" rootMargin="0px" />}
          </h1>
          <p className="hero-sub">Small-batch fragrances composed from rare oud, Bulgarian rose and aged amber. Poured by hand, built to linger.</p>
          <div className="hero-cta">
            <Magnet padding={80} magnetStrength={3}>
              <StarBorder color="#ca8a04" trailColor="#fde68a" onClick={() => scrollToId('collection')}>Explore the collection</StarBorder>
            </Magnet>
          </div>
        </div>
        <div className="hero-bottle" aria-hidden="false">
          <Bottle draw c1="#ca8a04" c2="#451a03" className="bottle-xl" label="Maison Aura signature bottle" />
        </div>
      </div>
      <button className="scroll-hint" onClick={() => scrollToId('notes')} aria-label="Scroll to notes">Scroll</button>
    </section>
  )
}
