import { business } from '../data/business.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-name">{business.name}</p>
          <p>{business.addressLine}</p>
          <p><a href={business.phoneHref}>{business.phone}</a></p>
        </div>
        <p className="credits">
          Photos: Shixart1985, CC BY 2.0, Wikimedia Commons.
        </p>
      </div>
    </footer>
  )
}
