---
name: lenis
description: Smooth scrolling with Lenis (darkroomengineering/lenis). Use when the user wants smooth/inertial scroll, scroll sync with GSAP ScrollTrigger, anchors, nested scroll, or Lenis in React/Vue.
license: MIT
---

# Lenis

Install: `npm i lenis` (React: `lenis/react`, Vue: `lenis/vue`). Full docs: `references/lenis/README.md` if cloned.

## Basic
```js
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
const lenis = new Lenis({ autoRaf: true })
```
Custom loop: `const lenis = new Lenis(); requestAnimationFrame(function raf(t){ lenis.raf(t); requestAnimationFrame(raf) })`.

## With GSAP ScrollTrigger
```js
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000)) // seconds -> ms
gsap.ticker.lagSmoothing(0)
```
Do not also use `autoRaf` in that case.

## Notes
- Useful options: `lerp`, `duration`, `smoothWheel`, `syncTouch`, `anchors`, `allowNestedScroll`, `autoToggle`.
- Methods: `scrollTo(target, opts)`, `stop()`, `start()`, `destroy()`, `on(event, cb)`.
- Always `destroy()` on unmount (React/SPA) and respect `prefers-reduced-motion`.
