// Responsive photograph from public/img (webp at 500, 960 and full width).
const BASE = import.meta.env.BASE_URL

export default function Photo({ id, alt, sizes = '(max-width: 900px) 100vw, 50vw', width, height, eager = false, className = '' }) {
  return (
    <img
      className={className}
      src={`${BASE}img/photo-${id}.jpg`}
      srcSet={`${BASE}img/photo-${id}-500.jpg 500w, ${BASE}img/photo-${id}-960.jpg 960w, ${BASE}img/photo-${id}.jpg 1280w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
    />
  )
}
