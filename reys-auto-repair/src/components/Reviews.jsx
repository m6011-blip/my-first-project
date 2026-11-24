import { useEffect, useRef } from 'react'
import { business, themes } from '../data/business.js'
import { countUp } from '../lib/motion.js'

export default function Reviews() {
  const score = useRef(null)
  const total = useRef(null)
  useEffect(() => {
    countUp(score.current, Number(business.rating), { decimals: 1 })
    countUp(total.current, 700, { suffix: '+' })
  }, [])
  return (
    <section id="reviews" className="section reviews">
      <div className="wrap reviews-grid">
        <div className="score">
          <p className="eyebrow">Reviews</p>
          <p className="score-num" aria-label={`${business.rating} out of 5`}><span ref={score}>{business.rating}</span><small>/5</small></p>
          <p className="score-sub">from <strong ref={total}>{business.reviews}</strong> reviews on Google</p>
          <h2>Reviews from Miami drivers</h2>
        </div>
        <ul className="themes">
          {themes.map((t) => (
            <li key={t.id} className="theme" data-reveal>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
