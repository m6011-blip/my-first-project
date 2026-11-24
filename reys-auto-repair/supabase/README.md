# Supabase setup (appointment requests)

1. Create a project at supabase.com.
2. Open the SQL editor and run `migrations/0001_appointment_requests.sql`.
3. Copy the project URL and the **anon** key into `.env` (see `.env.example`).
   Never put the service role key in the website.
4. Restart `npm run dev`. The booking form now sends real requests; without these
   variables it runs in demo mode and sends nothing.
5. Read new requests in the Table editor. Add an email or SMS notification with a
   database webhook or an Edge Function when the shop wants one.

Also add bot protection before launch (Cloudflare Turnstile or hCaptcha) and rate limiting on the
Supabase API, because the insert endpoint is public by design.
