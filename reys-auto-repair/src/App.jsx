import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Services from './components/Services.jsx'
import Trust from './components/Trust.jsx'
import Reviews from './components/Reviews.jsx'
import Visit from './components/Visit.jsx'
import Booking from './components/Booking.jsx'
import Footer from './components/Footer.jsx'
import CallBar from './components/CallBar.jsx'
import { initButtonRipple, initReveals } from './lib/motion.js'

export default function App() {
  useEffect(() => {
    const stopRipple = initButtonRipple()
    const stopReveals = initReveals()
    const onScroll = () => document.querySelector('.header')?.classList.toggle('is-scrolled', window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => { stopRipple(); stopReveals(); window.removeEventListener('scroll', onScroll) }
  }, [])
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Services />
        <Trust />
        <Reviews />
        <Visit />
        <Booking />
      </main>
      <Footer />
      <CallBar />
    </>
  )
}
