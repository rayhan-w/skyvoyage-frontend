"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import QueryForm from "../../components/QueryForm";
import { apiFetch, fmt } from "../../lib/api";

export default function Packages() {
  const [readyPackages, setReadyPackages] = useState([]);
  const [upcomingPackages, setUpcomingPackages] = useState([]);

  useEffect(() => {
    Promise.all([
      apiFetch("/packages?type=READY"),
      apiFetch("/packages?type=UPCOMING"),
    ])
      .then(([ready, upcoming]) => {
        setReadyPackages(ready || []);
        setUpcomingPackages(upcoming || []);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="wrap page">
      <h1>Tour Packages</h1>
      <p className="sub">Discover the best travel packages — ready, upcoming and fully custom.</p>
      <h2>Ready Packages</h2>
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
      </div>
      <h2 id="upcoming" style={{ marginTop: 36 }}>Upcoming Packages</h2>
      <div className="grid3">
        {upcomingPackages.map((p) => (
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
                <Link className="btn" href={"/book?pkg=" + encodeURIComponent(p.name)}>Notify / Book →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 id="custom" style={{ marginTop: 36 }}>Custom Package — Plan Your Own Journey</h2>
      <p className="sub">Build your custom package: destination, dates, travellers, budget and hotel preference. We reply with a full plan and price.</p>
      <QueryForm type="Custom Package" />
    </main>
  );
}
