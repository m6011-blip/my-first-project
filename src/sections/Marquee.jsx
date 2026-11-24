import ScrollVelocity from '../components/reactbits/ScrollVelocity.jsx'

// Words speed up and skew with the user's scroll velocity.
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <ScrollVelocity texts={['OUD · ROSE · AMBER · JASMIN · VETIVER · MUSK ·', 'EAU DE PARFUM · PARIS · SMALL BATCH ·']} velocity={60} skewWithVelocity={8} numCopies={4} gap={24} fontSize="clamp(3rem, 9vw, 8rem)" fontWeight={500} outlineAlternate />
    </div>
  )
}
