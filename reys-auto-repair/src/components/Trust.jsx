import Photo from './Photo.jsx'
import { chapters } from '../data/business.js'

const pictures = [
  { id: 'f194578809', alt: 'A mechanic checks the oil level of a car with the hood open' },
  { id: 'f194319892', alt: 'A hand holds up an oil dipstick above an open engine bay' },
  { id: 'f194714986', alt: 'A mechanic checks the oil level in a car engine' },
]

export default function Trust() {
  return (
    <section id="trust" className="section trust">
      <div className="wrap">
        <p className="eyebrow">Why Miami drivers trust Rey&rsquo;s</p>
        <h2>Honest repairs, shown before they are done</h2>
        <ol className="steps">
          {chapters.map((c, i) => (
            <li key={c.id} className="step">
              <div className="step-pic">
                <Photo id={pictures[i].id} width="1280" height="854" sizes="(max-width: 900px) 100vw, 33vw" alt={pictures[i].alt} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
