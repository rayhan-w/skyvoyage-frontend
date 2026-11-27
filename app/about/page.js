import Link from "next/link";

const highlights = [
  ["✈", "#fff7ed", "Best Airline Fares", "Competitive domestic & international ticket pricing"],
  ["🏨", "#e3f0ff", "Hand-Picked Hotels", "Verified stays worldwide at transparent rates"],
  ["📦", "#e6f7ec", "Ready & Custom Packages", "Tailored itineraries for families, couples & groups"],
  ["🛂", "#f1e8ff", "Visa Assistance", "Step-by-step checklist & file support for top destinations"],
  ["📞", "#ffe9f0", "Direct Phone Support", "No online payment hassle — confirm directly with our team"],
];

const services = [
  {
    title: "Flight Booking",
    desc: "Compare direct and 1-stop flights across top airlines with instant booking requests.",
    href: "/flights",
    cta: "Search Flights →",
  },
  {
    title: "Tour Packages",
    desc: "Explore ready-to-go holidays, upcoming group tours, or request a 100% custom plan.",
    href: "/packages",
    cta: "View Packages →",
  },
  {
    title: "Hotel Reservations",
    desc: "Book 4-star and 5-star hotels in Dubai, Singapore, Bangkok, London, and beyond.",
    href: "/hotels",
    cta: "Browse Hotels →",
  },
  {
    title: "Visa Services",
    desc: "Hassle-free tourist, business, and transit visa guidance with clear document checklists.",
    href: "/visa",
    cta: "Visa Support →",
  },
];

export default function About() {
  return (
    <main className="wrap page">
      <section
        style={{
          background: "linear-gradient(120deg, #0f172a 0%, #c2410c 100%)",
          color: "#fff",
          borderRadius: 18,
          padding: "36px 32px",
          marginBottom: 28,
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 24,
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              background: "#ffffff22",
              padding: "5px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            ABOUT SKYVOYAGE
          </span>
          <h1 style={{ margin: "0 0 10px", fontSize: 38, lineHeight: 1.15, color: "#fff" }}>
            Fly More · Explore More
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "#f8fafc" }}>
            SkyVoyage is your trusted travel partner in Bangladesh. We help travelers book flights,
            hotels, ready and custom tour packages, and visa services at transparent BDT prices —
            with direct personal confirmation by phone or WhatsApp.
          </p>
        </div>
        <div
          style={{
            borderRadius: 14,
            overflow: "hidden",
            height: 220,
            boxShadow: "0 14px 30px #0004",
          }}
        >
          <img
            src="/images/hero2.jpg"
            alt="SkyVoyage Travel"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </section>

      <section style={{ marginBottom: 30 }}>
        <div className="sechead" style={{ marginBottom: 14 }}>
          <h2>
            What We <span>Offer</span>
          </h2>
          <Link className="viewall" href="/contact">
            Talk to Us →
          </Link>
        </div>
        <div className="grid3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {services.map((s) => (
            <div className="panel" key={s.title} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <h3 style={{ margin: 0, color: "#0f172a" }}>{s.title}</h3>
              <p className="muted" style={{ margin: 0, lineHeight: 1.6, flex: 1 }}>
                {s.desc}
              </p>
              <div>
                <Link className="btn" href={s.href}>
                  {s.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 className="center" style={{ marginBottom: 16 }}>
          Why Choose <span className="bl">SkyVoyage?</span>
        </h2>
        <div className="whyrow">
          {highlights.map((x) => (
            <div className="whyitem" key={x[2]}>
              <span className="whyicon" style={{ background: x[1] }}>
                {x[0]}
              </span>
              <b>{x[2]}</b>
              <span className="muted">{x[3]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="offer3">
        <div>
          <small>BOOK WITH CONFIDENCE</small>
          <h2>No Online Payment Needed</h2>
          <p style={{ lineHeight: 1.6 }}>
            Send your booking request or travel query online — our travel specialists confirm every
            detail with you directly over phone or WhatsApp before finalizing.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
            <Link className="btn" style={{ background: "#ffb300", color: "#0f172a" }} href="/packages">
              Explore Packages →
            </Link>
            <Link className="btn ghost" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
        <img src="/images/beach.jpg" alt="SkyVoyage Holidays" />
      </section>
    </main>
  );
}
