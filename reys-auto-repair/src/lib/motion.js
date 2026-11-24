import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Every button answers a click: a ripple grows from the pointer and the button springs back.
export function initButtonRipple() {
  const onClick = (e) => {
    const btn = e.target.closest('.btn')
    if (!btn || reduced()) return
    const r = btn.getBoundingClientRect()
    const size = Math.max(r.width, r.height) * 2
    const dot = document.createElement('span')
    dot.className = 'ripple'
    dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`
    btn.appendChild(dot)
    dot.addEventListener('animationend', () => dot.remove())
    gsap.fromTo(btn, { scale: 0.94 }, { scale: 1, duration: 0.55, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' })
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}

// Staggered rise-in for anything marked data-reveal, as it enters the viewport.
export function initReveals(root = document) {
  if (reduced()) return () => {}
  const els = root.querySelectorAll('[data-reveal]')
  gsap.set(els, { opacity: 0, y: 36 })
  const triggers = ScrollTrigger.batch(els, {
    start: 'top 88%', once: true,
    onEnter: (batch) => {
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, overwrite: true })
      batch.forEach((el) => el.classList.add('is-in'))
    },
  })
  const clips = [...root.querySelectorAll('[data-clip]')]
  clips.forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, {
      clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
  })
  return () => { triggers.forEach((t) => t.kill()); gsap.killTweensOf(els) }
}

// Numbers count up once when they scroll into view.
export function countUp(el, to, { decimals = 0, suffix = '' } = {}) {
  if (reduced()) { el.textContent = to.toFixed(decimals) + suffix; return }
  const o = { v: 0 }
  gsap.to(o, {
    v: to, duration: 1.8, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    onUpdate: () => { el.textContent = o.v.toFixed(decimals) + suffix },
  })
}
