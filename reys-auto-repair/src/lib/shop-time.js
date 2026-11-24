import { hours } from '../data/business.js'

// Current day and minutes in Miami, whatever the visitor's own time zone.
function miamiNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false,
  }).formatToParts(date)
  const get = (t) => parts.find((p) => p.type === t)?.value
  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { dow, minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')) }
}

const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }

export function formatTime(t) {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${suffix}`
}

export function openStatus(date = new Date()) {
  const { dow, minutes } = miamiNow(date)
  const today = hours.find((h) => h.dow === dow)
  if (today.open && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, label: `Open now, until ${formatTime(today.close)}`, dow }
  }
  // find the next opening day
  for (let i = 0; i < 7; i++) {
    const next = hours.find((h) => h.dow === (dow + i) % 7)
    if (next.open && (i > 0 || minutes < toMin(next.open))) {
      const when = i === 0 ? 'today' : i === 1 ? 'tomorrow' : next.day
      return { open: false, label: `Closed now. Opens ${when} at ${formatTime(next.open)}`, dow }
    }
  }
  return { open: false, label: 'Closed now', dow }
}

// Time windows the booking form offers on a given weekday (0-6).
export function slotsFor(dow) {
  const day = hours.find((h) => h.dow === dow)
  if (!day || !day.open) return []
  const slots = []
  for (let m = toMin(day.open); m + 60 <= toMin(day.close); m += 60) {
    const hh = String(Math.floor(m / 60)).padStart(2, '0')
    slots.push(`${hh}:00`)
  }
  return slots
}
