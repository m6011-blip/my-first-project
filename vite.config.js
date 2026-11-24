import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Same headers as public/_headers, so `npm run preview` tests the real CSP.
const csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
export default defineConfig({ plugins: [react()], preview: { headers: { 'Content-Security-Policy': csp } } })
