// Single source of truth for every fact on the site.
export const business = {
  name: "Rey's Auto Repair Shop",
  short: "Rey's",
  phone: '+1 305-541-7339',
  phoneHref: 'tel:+13055417339',
  phoneDisplay: '(305) 541-7339',
  street: '527 SW 15th Ave',
  city: 'Miami',
  state: 'FL',
  zip: '33135',
  area: 'Little Havana',
  rating: '4.9',
  reviews: '700+',
}
business.addressLine = `${business.street}, ${business.city}, ${business.state} ${business.zip}`
business.mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.name} ${business.addressLine}`)}`

// 0 = Sunday ... 6 = Saturday. Times in 24h, Miami local time.
export const hours = [
  { day: 'Monday', short: 'Mon', dow: 1, open: '08:00', close: '16:00' },
  { day: 'Tuesday', short: 'Tue', dow: 2, open: '08:00', close: '16:00' },
  { day: 'Wednesday', short: 'Wed', dow: 3, open: '08:00', close: '16:00' },
  { day: 'Thursday', short: 'Thu', dow: 4, open: '08:00', close: '16:00' },
  { day: 'Friday', short: 'Fri', dow: 5, open: '08:00', close: '17:00' },
  { day: 'Saturday', short: 'Sat', dow: 6, open: null, close: null },
  { day: 'Sunday', short: 'Sun', dow: 0, open: null, close: null },
]

export const services = [
  { id: 'oil', name: 'Oil changes', text: 'Fresh oil and a new filter, with the level and condition of your other fluids checked while the hood is up.' },
  { id: 'brakes', name: 'Brake service', text: 'Pads, rotors and brake fluid inspected and measured. You see what is worn before anything is replaced.' },
  { id: 'diag', name: 'Diagnostics and repair', text: 'Warning light on or a strange noise? We find the cause, explain it, and fix only what is needed.' },
  { id: 'maint', name: 'Routine maintenance', text: 'Belts, hoses, filters, battery and fluids on a schedule that suits your car and your budget.' },
  { id: 'safety', name: 'Tire and safety checks', text: 'Tire wear and pressure, lights, wipers and the basics that keep you safe on the road.' },
]

export const chapters = [
  { id: 'see', title: 'You see the problem', text: 'We film what we find and send you the video, so you can see the worn part for yourself.' },
  { id: 'decide', title: 'You decide what happens next', text: 'We tell you what is urgent and what can wait. No pushy upsells, no surprise charges.' },
  { id: 'done', title: 'Back on the road, often the same day', text: 'Fair prices and quick turnaround, so you are not left without a car for long.' },
]

// Themes that reviewers raise. Paraphrased from the owner's summary, not quotes.
export const themes = [
  { id: 'honest', title: 'Honest advice', text: 'Reviewers say Rey’s tells them what the car really needs.' },
  { id: 'video', title: 'Video updates', text: 'Drivers mention clips of the problem sent before the repair.' },
  { id: 'fast', title: 'Quick turnaround', text: 'Many jobs are finished the same day.' },
  { id: 'fair', title: 'Fair prices', text: 'Compared with the big service centers, drivers find the bill reasonable.' },
]

export const serviceOptions = [
  'Oil change',
  'Brake service',
  'Diagnostics and repair',
  'Routine maintenance',
  'Tire and safety check',
  'Not sure yet',
]
