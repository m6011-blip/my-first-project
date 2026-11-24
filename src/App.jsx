import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { initLenis } from './lenis.js'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Notes from './sections/Notes.jsx'
import Collection from './sections/Collection.jsx'
import Shop from './sections/Shop.jsx'
import Story from './sections/Story.jsx'
import Footer from './sections/Footer.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  useEffect(() => initLenis(), [])
  useEffect(() => {
    // Recalculate trigger positions once webfonts have loaded.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Notes />
        <Collection />
        <Shop />
        <Story />
      </main>
      <Footer />
    </>
  )
}
