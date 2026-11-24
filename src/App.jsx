import { useEffect, useState } from 'react'
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
import Marquee from './sections/Marquee.jsx'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const [ready, setReady] = useState(false)
  useEffect(() => initLenis(), [])
  useEffect(() => {
    // Recalculate trigger positions once webfonts have loaded.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])
  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Marquee />
        <Notes />
        <Collection />
        <Shop />
        <Story />
      </main>
      <Footer />
    </>
  )
}
