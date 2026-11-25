# SkyVoyage \u2014 Backend Handover for Antigravity
Frontend is COMPLETE (Next.js 14, App Router, plain CSS, no Tailwind). All data is mock data in `lib/data.js`. Replace it with real APIs; do NOT redesign the UI.
## Pages already built
Home (/), Flights results with filters (/flights), Hotels (/hotels), Packages (/packages: Ready / Upcoming / Custom), Visa (/visa), About (/about), Contact + Location map + All-Query form (/contact), Login (/login), My Bookings (/my-bookings), Invoice (/invoice/[id]), Legal (/legal/privacy|terms|refund)
## APIs to build
1. GET /api/flights/search?from&to&depart&return&passengers&class \u2014 GDS/flight API, return shape matching lib/data.js flights[]
2. GET /api/hotels, GET /api/destinations
3. GET /api/packages?type=ready|upcoming ; POST /api/packages/custom-request (= a Query)
4. POST /api/queries {name,mobile,email,type,message} \u2014 save to DB, show in Admin Panel with status/reply, send email to admin + auto-reply to customer
5. POST /api/bookings, GET /api/bookings/mine (auth) \u2014 booking creates Invoice
6. GET /api/invoices/:id + PDF generation \u2014 email invoice PDF to customer on confirmation
7. Auth: register/login (email+password, hashed), session/JWT for My Bookings
8. Payments: EPS (primary for BD) + card/mobile banking \u2014 payment status updates booking + triggers invoice email
9. Email service: booking confirmation, invoice, query reply, visa checklist
10. Admin Panel: flights/hotels/packages CRUD, queries inbox, bookings, invoices, legal page text editor, office location/address settings
## Notes
- Keep prices in BDT (\u09F3). Keep header/footer/design exactly as-is.
- Legal page texts in app/legal/[slug]/page.js are DRAFTS \u2014 move to DB/settings.
- Office address/phone/email in Contact + Footer are placeholders \u2014 move to Settings.

## Admin Panel (frontend built)
Routes: /admin (dashboard), /admin/bookings, /admin/queries, /admin/packages, /admin/invoices, /admin/settings, /admin/login — all mock-data frontend. Connect them to the APIs above; protect all /admin routes with admin auth.

## IMPORTANT — No online payment (owner decision, 25 Nov 2026)
There is NO payment gateway in this system. Do NOT build EPS/card/bKash checkout. Bookings are requests: the customer sends a booking request or query, then confirms by calling or WhatsApping the provider number shown on the site (Admin Settings: Booking Phone / WhatsApp). Invoices are booking summaries only.
