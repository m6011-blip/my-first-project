import OpenStatus from './OpenStatus.jsx'
import { business, hours } from '../data/business.js'
import { formatTime, openStatus } from '../lib/shop-time.js'

export default function Visit() {
  const { dow } = openStatus()
  return (
    <section id="visit" className="section visit">
      <div className="wrap visit-grid">
        <div>
          <p className="eyebrow">Visit</p>
          <h2>Find the shop in Little Havana</h2>
          <address className="address">
            <strong>{business.name}</strong><br />
            {business.street}<br />
            {business.city}, {business.state} {business.zip}
          </address>
          <p><a className="phone-link" href={business.phoneHref}>{business.phone}</a></p>
          <div className="cta-row">
            <a className="btn btn-primary" href={business.phoneHref}>Call now</a>
            <a className="btn btn-ghost" href={business.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
          </div>
        </div>
        <div className="hours-card">
          <OpenStatus />
          <table className="hours">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {hours.map((h) => (
                <tr key={h.day} className={h.dow === dow ? 'is-today' : ''}>
                  <th scope="row">{h.day}</th>
                  <td>{h.open ? `${formatTime(h.open)} to ${formatTime(h.close)}` : 'Closed'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
