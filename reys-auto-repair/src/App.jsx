import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Trust from './components/Trust.jsx'
import Reviews from './components/Reviews.jsx'
import Visit from './components/Visit.jsx'
import Booking from './components/Booking.jsx'
import Footer from './components/Footer.jsx'
import CallBar from './components/CallBar.jsx'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
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
