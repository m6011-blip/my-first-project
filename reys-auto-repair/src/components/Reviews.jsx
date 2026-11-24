import { business, themes } from '../data/business.js'

export default function Reviews() {
  return (
    <section id="reviews" className="section reviews">
      <div className="wrap reviews-grid">
        <div className="score">
          <p className="eyebrow">Reviews</p>
          <p className="score-num" aria-label={`${business.rating} out of 5`}>{business.rating}<span>/5</span></p>
          <p className="score-sub">from {business.reviews} reviews on Google</p>
          <h2>Reviews from Miami drivers</h2>
        </div>
        <ul className="themes">
          {themes.map((t) => (
            <li key={t.id} className="theme">
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
