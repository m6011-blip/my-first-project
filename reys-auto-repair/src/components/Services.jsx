import Photo from './Photo.jsx'
import ServiceIcon from './ServiceIcon.jsx'
import { services } from '../data/business.js'

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="wrap services-grid">
        <div className="services-photo" data-clip>
          <Photo id="f193450165" width="1280" height="1920" sizes="(max-width: 900px) 100vw, 40vw"
            alt="A mechanic's hands changing a spark plug under the hood" />
        </div>
        <div>
          <p className="eyebrow">Services</p>
          <h2>Oil changes, brakes and repairs</h2>
          <ul className="service-list">
            {services.map((s) => (
              <li key={s.id} className="service" data-reveal>
                <ServiceIcon id={s.id} />
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a className="link" href="#book">Request an appointment</a>
        </div>
      </div>
    </section>
  )
}
