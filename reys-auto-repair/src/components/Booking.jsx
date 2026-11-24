import { useRef, useState } from 'react'
import { business, serviceOptions } from '../data/business.js'
import { demoMode, emptyForm, submitAppointment, validate } from '../lib/appointments.js'
import { formatTime, slotsFor } from '../lib/shop-time.js'

const dowOf = (date) => (date ? new Date(`${date}T12:00:00`).getDay() : null)
const todayISO = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })

function Field({ id, label, error, hint, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <p className="hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}

export default function Booking() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | sent | failed
  const [demo, setDemo] = useState(false)
  const doneRef = useRef(null)

  const set = (k) => (e) => {
    const v = e.target.value
    setForm((f) => ({ ...f, [k]: v, ...(k === 'date' ? { time: '' } : {}) }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }
  const aria = (id) => ({ id, 'aria-invalid': errors[id] ? true : undefined, 'aria-describedby': errors[id] ? `${id}-error` : undefined })

  const dow = dowOf(form.date)
  const slots = dow === null ? [] : slotsFor(dow)
  const closedDay = form.date && slots.length === 0

  async function onSubmit(e) {
    e.preventDefault()
    const found = validate(form)
    if (closedDay) found.date = 'Rey’s is closed on weekends. Choose a day from Monday to Friday.'
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) { document.getElementById(first)?.focus(); return }
    setState('sending')
    try {
      const res = await submitAppointment(form)
      setDemo(res.demo)
      setState('sent')
      requestAnimationFrame(() => doneRef.current?.focus())
    } catch {
      setState('failed')
    }
  }

  if (state === 'sent') {
    return (
      <section id="book" className="section book">
        <div className="wrap book-done" ref={doneRef} tabIndex={-1}>
          <p className="eyebrow">Request received</p>
          <h2>Thanks, {form.name.split(' ')[0]}. Rey&rsquo;s will call you to confirm.</h2>
          <p className="lead">
            We have your request for a {form.service.toLowerCase()} on {form.date} at {formatTime(form.time)}.
            It is not a booking until we confirm it. For anything urgent, call <a href={business.phoneHref}>{business.phoneDisplay}</a>.
          </p>
          {demo && <p className="demo-note">Demo mode: no database is connected, so nothing was sent.</p>}
          <button className="btn btn-ghost" onClick={() => { setForm(emptyForm); setState('idle') }}>Send another request</button>
        </div>
      </section>
    )
  }

  return (
    <section id="book" className="section book">
      <div className="wrap book-grid">
        <div>
          <p className="eyebrow">Book</p>
          <h2>Appointment request form</h2>
          <p className="lead">Tell us about your car and when you can come in. Rey&rsquo;s calls you back to confirm the time. Prefer to talk? Call <a className="phone-link" href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
        </div>
        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="row2">
            <Field id="name" label="Your name" error={errors.name}>
              <input {...aria('name')} type="text" autoComplete="name" value={form.name} onChange={set('name')} />
            </Field>
            <Field id="phone" label="Phone" error={errors.phone}>
              <input {...aria('phone')} type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
            </Field>
          </div>
          <Field id="email" label="Email (optional)" error={errors.email}>
            <input {...aria('email')} type="email" autoComplete="email" value={form.email} onChange={set('email')} />
          </Field>
          <div className="row3">
            <Field id="year" label="Vehicle year" error={errors.year}>
              <input {...aria('year')} type="text" inputMode="numeric" maxLength={4} placeholder="2016" value={form.year} onChange={set('year')} />
            </Field>
            <Field id="make" label="Make" error={errors.make}>
              <input {...aria('make')} type="text" placeholder="Toyota" value={form.make} onChange={set('make')} />
            </Field>
            <Field id="model" label="Model" error={errors.model}>
              <input {...aria('model')} type="text" placeholder="Corolla" value={form.model} onChange={set('model')} />
            </Field>
          </div>
          <Field id="service" label="Service needed" error={errors.service}>
            <select {...aria('service')} value={form.service} onChange={set('service')}>
              <option value="">Choose a service</option>
              {serviceOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <div className="row2">
            <Field id="date" label="Preferred day" error={errors.date || (closedDay ? 'Rey’s is closed on weekends. Choose a day from Monday to Friday.' : undefined)}>
              <input {...aria('date')} type="date" min={todayISO()} value={form.date} onChange={set('date')} />
            </Field>
            <Field id="time" label="Preferred time" error={errors.time}>
              <select {...aria('time')} value={form.time} onChange={set('time')} disabled={!slots.length}>
                <option value="">{slots.length ? 'Choose a time' : 'Pick a day first'}</option>
                {slots.map((t) => <option key={t} value={t}>{formatTime(t)}</option>)}
              </select>
            </Field>
          </div>
          <Field id="notes" label="Anything we should know? (optional)">
            <textarea id="notes" rows={3} maxLength={1000} value={form.notes} onChange={set('notes')} />
          </Field>
          {/* Honeypot: hidden from people, filled by bots. */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
          </div>
          <button className="btn btn-primary btn-lg" type="submit" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending...' : 'Send request'}
          </button>
          {state === 'failed' && (
            <p className="error" role="alert">We could not send your request. Please try again, or call <a href={business.phoneHref}>{business.phoneDisplay}</a>.</p>
          )}
          {demoMode && <p className="hint">Demo mode: connect Supabase to receive requests (see supabase/README.md).</p>}
        </form>
      </div>
    </section>
  )
}
