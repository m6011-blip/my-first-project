import { business } from '../data/business.js'

const links = [['services', 'Services'], ['trust', 'Why Rey’s'], ['reviews', 'Reviews'], ['visit', 'Visit'], ['book', 'Book']]

export default function Header() {
  return (
    <header className="header"><div className="wrap header-bar">
      <a className="brand" href="#top" aria-label={`${business.name}, back to top`}>
        <span className="brand-mark" aria-hidden="true">R</span>
        <span className="brand-name">{business.short} Auto Repair</span>
      </a>
      <nav aria-label="Primary" className="nav">
        {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <a className="btn btn-primary header-call" href={business.phoneHref}>Call {business.phoneDisplay}</a>
    </div></header>
  )
}
