const words = ['Oil changes', 'Brake service', 'Diagnostics', 'Routine maintenance', 'Tire checks', 'Honest advice', 'Video updates']

// Slow, endless strip of what the shop does. Decorative, so hidden from screen readers.
export default function Marquee() {
  const row = words.map((w) => <span key={w}>{w}</span>)
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{row}{row}{row}{row}</div>
    </div>
  )
}
