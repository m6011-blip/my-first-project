import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Photo from './Photo.jsx'
import OpenStatus from './OpenStatus.jsx'
import { business } from '../data/business.js'

gsap.registerPlugin(useGSAP, ScrollTrigger)
const BASE = import.meta.env.BASE_URL

export default function Hero() {
  const root = useRef(null)

  // Enters once on load: copy rises in, the photograph "develops" from a faint print.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-photo img', { opacity: 0, filter: 'grayscale(1) brightness(1.25) contrast(.6)', scale: 1.04, duration: 1.6 }, 0)
        .from('[data-rise]', { y: 28, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.1)
        .from('.hero-facts > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.7)
        .from('.hero-badge', { scale: 0.6, opacity: 0, rotate: -8, duration: 0.7, ease: 'back.out(1.8)' }, 1.1)
      gsap.to('.hero-badge', { y: -8, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.hero-photo img', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    })
  }, { scope: root })

  return (
    <section id="top" ref={root} className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow" data-rise>Little Havana, Miami</p>
          <h1 data-rise>Honest car repair in Little Havana</h1>
          <p className="lead" data-rise>
            A family-run shop where you see the problem on video, pay a fair price and get your car back fast.
            Rated {business.rating} by {business.reviews} drivers.
          </p>
          <div className="cta-row" data-rise>
            <a className="btn btn-primary btn-lg" href={business.phoneHref}>Call {business.phoneDisplay}</a>
            <a className="btn btn-ghost btn-lg" href="#book">Request an appointment</a>
          </div>
        </div>
        <div className="hero-photo">
          <picture>
            <source media="(max-width: 639px)" srcSet={`${BASE}img/photo-f194784616-780x975.jpg`} />
            <img
              src={`${BASE}img/photo-f194784616-1280.jpg`}
              srcSet={`${BASE}img/photo-f194784616-500.jpg 500w, ${BASE}img/photo-f194784616-960.jpg 960w, ${BASE}img/photo-f194784616-1280.jpg 1280w`}
              sizes="(max-width: 900px) 100vw, 50vw"
              width="1280" height="854"
              alt="A mechanic checks a car's engine with a diagnostic laptop in a shop bay"
              fetchPriority="high"
            />
          </picture>
          <div className="hero-badge" aria-label={`Rated ${business.rating} out of 5 by ${business.reviews} drivers`}>
            <strong>{business.rating}</strong>
            <span>{business.reviews} reviews</span>
          </div>
        </div>
      </div>
      <div className="wrap hero-facts">
        <OpenStatus />
        <p><strong>{business.street}</strong>, {business.city}</p>
        <p>Mon to Thu 8 AM to 4 PM, Fri 8 AM to 5 PM</p>
      </div>
    </section>
  )
}
