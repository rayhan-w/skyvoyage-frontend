"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchWidget from "../components/SearchWidget";
import Newsletter from "../components/Newsletter";
import { apiFetch, fmt } from "../lib/api";

const why = [
  ["🌐", "#e3f0ff", "Worldwide Destinations", "500+ destinations across the world"],
  ["📞", "#e6f7ec", "Book by Phone / WhatsApp", "No online payment — talk to us directly"],
  ["🎧", "#f1e8ff", "24/7 Customer Support", "Bangla support, day or night"],
  ["🏷", "#fff3d6", "Best Price Guarantee", "Lowest price, no hidden charge"],
  ["🎁", "#ffe9f0", "Special Offers & Discounts", "Member-only deals every week"],
];
const testi = [
  ["SkyVoyage made our vacation truly special. Excellent service!", "Rahim Ahmed", "RA", "#ea580c"],
  ["Very professional team. Highly recommended for everyone.", "Nusrat Jahan", "NJ", "#e91e63"],
  ["Best travel agency in Bangladesh. Smooth booking process.", "Tanvir Hasan", "TH", "#0a7d4f"],
];

export default function Home() {
  const [readyPackages, setReadyPackages] = useState([]);
  const [upcomingPackages, setUpcomingPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    Promise.all([
      apiFetch("/packages?type=READY"),
      apiFetch("/packages?type=UPCOMING"),
      apiFetch("/destinations"),
    ])
      .then(([ready, upcoming, dests]) => {
        setReadyPackages(ready || []);
        setUpcomingPackages(upcoming || []);
        setDestinations(dests || []);
      })
      .catch(() => {});
  }, []);

  const featuredUpcoming = [upcomingPackages[0], upcomingPackages[2]].filter(Boolean);

  return (
    <main>
      <section className="hero3">
        <div className="wrap">
          <div className="script">Dream · Plan · Travel</div>
          <h1>Explore the World<br />With <span>SkyVoyage</span></h1>
          <p>Discover amazing destinations with our best travel packages and make your journey unforgettable.</p>
          <Link className="btn big" href="/packages">Explore Packages →</Link>
        </div>
      </section>
      <section className="searchsec3"><div className="wrap"><SearchWidget /></div></section>
      <section className="section wrap">
        <div className="sechead">
          <h2>Our Travel <span>Packages</span></h2>
          <Link className="viewall" href="/packages">View All Packages →</Link>
        </div>
        <div className="grid3">
          {readyPackages.map((p) => (
            <div className="pkgcard" key={p.id || p.name}>
              <div className="pkgimg">
                <img src={p.img} alt={p.name} />
                {p.badge && <span className="badge">{p.badge}</span>}
              </div>
              <div className="p">
                <h3>{p.name}</h3>
                <div className="muted">{p.days} · {p.persons} · {p.place}</div>
                <div className="stars">★ {p.rating} <span className="muted">({p.reviews} Reviews)</span></div>
                <div className="pkgfoot">
                  <span className="price">{fmt(p.price)}</span>
                  <Link className="btn" href={"/book?pkg=" + encodeURIComponent(p.name)}>Book Now →</Link>
                </div>
              </div>
            </div>
          ))}
          {featuredUpcoming.map((p) => (
            <div className="pkgcard" key={p.id || p.name}>
              <div className="pkgimg">
                <img src={p.img} alt={p.name} />
                <span className="badge alt">{p.date || p.badge}</span>
              </div>
              <div className="p">
                <h3>{p.name}</h3>
                <div className="muted">{p.days} · {p.persons} · {p.place}</div>
                <div className="stars">★ {p.rating} <span className="muted">({p.reviews} Reviews)</span></div>
                <div className="pkgfoot">
                  <span className="price">{fmt(p.price)}</span>
                  <Link className="btn" href={"/book?pkg=" + encodeURIComponent(p.name)}>Book Now →</Link>
                </div>
              </div>
            </div>
          ))}
          <div className="pkgcard custom">
            <div className="pkgimg"><img src="/images/maldives.jpg" alt="Custom" /></div>
            <div className="p">
              <h3>Create Your Own Travel Plan</h3>
              <p className="muted">Tell us your destination, budget and preferences — we will build the trip for you.</p>
              <div className="pkgfoot"><span></span><Link className="btn ghost" href="/packages#custom">Plan Now →</Link></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <h2 className="center">Why Choose <span className="bl">SkyVoyage?</span></h2>
        <div className="whyrow">
          {why.map((x) => (
            <div className="whyitem" key={x[2]}>
              <span className="whyicon" style={{ background: x[1] }}>{x[0]}</span>
              <b>{x[2]}</b>
              <span className="muted">{x[3]}</span>
            </div>
          ))}
        </div>
        <div className="offer3">
          <div>
            <small>SPECIAL OFFER</small>
            <h2>Get Up to 30% OFF</h2>
            <p>On your next trip — book before the offer ends.</p>
            <Link className="btn" style={{ background: "#ffb300", color: "#17335c" }} href="/packages">Book Now →</Link>
          </div>
          <img src="/images/beach.jpg" alt="Offer" />
        </div>
      </section>
      <section className="section wrap">
        <div className="sechead">
          <h2>Popular <span>Destinations</span></h2>
          <Link className="viewall" href="/flights">View All Destinations →</Link>
        </div>
        <div className="grid6">
          {destinations.map((d) => (
            <Link className="dcard" href="/flights" key={d.id || d.name}>
              <img src={d.img} alt={d.name} />
              <span>{d.name}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section wrap">
        <h2 className="center">What Our <span className="bl">Travelers Say</span></h2>
        <div className="grid3">
          {testi.map((t) => (
            <div className="tcard" key={t[1]}>
              <div className="thead">
                <span className="avatar" style={{ background: t[3] }}>{t[2]}</span>
                <div><b>{t[1]}</b><div className="stars">★★★★★</div></div>
              </div>
              <p>“{t[0]}”</p>
            </div>
          ))}
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
