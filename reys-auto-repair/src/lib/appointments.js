// Validation and sending for the appointment form.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
export const demoMode = !SUPABASE_URL || !SUPABASE_KEY

export const emptyForm = {
  name: '', phone: '', email: '', year: '', make: '', model: '', service: '', date: '', time: '', notes: '', website: '',
}

const phoneDigits = (v) => v.replace(/\D/g, '')

export function validate(f) {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Enter your name.'
  if (phoneDigits(f.phone).length < 10) e.phone = 'Enter a phone number with area code, so Rey’s can call you.'
  if (f.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = 'Enter a valid email or leave it empty.'
  const year = Number(f.year)
  if (!/^\d{4}$/.test(f.year) || year < 1960 || year > new Date().getFullYear() + 1) e.year = 'Enter a 4-digit year, like 2016.'
  if (!f.make.trim()) e.make = 'Enter the make, like Toyota.'
  if (!f.model.trim()) e.model = 'Enter the model, like Corolla.'
  if (!f.service) e.service = 'Choose a service.'
  if (!f.date) e.date = 'Choose a day.'
  if (f.date && !f.time) e.time = 'Choose a time.'
  return e
}

function toRow(f) {
  return {
    name: f.name.trim(),
    phone: phoneDigits(f.phone),
    email: f.email.trim() || null,
    vehicle_year: Number(f.year),
    vehicle_make: f.make.trim(),
    vehicle_model: f.model.trim(),
    service: f.service,
    preferred_date: f.date,
    preferred_time: f.time,
    notes: f.notes.trim() || null,
  }
}

// Resolves with { ok, demo }. Spam bots fill the hidden "website" field: pretend success.
export async function submitAppointment(form) {
  if (form.website) return { ok: true, demo: false }
  const row = toRow(form)
  if (demoMode) {
    await new Promise((r) => setTimeout(r, 600))
    return { ok: true, demo: true }
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/appointment_requests`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  })
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return { ok: true, demo: false }
}
