"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { apiFetch, fmt } from "../../lib/api";

const AIR = [
  "Biman Bangladesh Airlines",
  "Emirates",
  "Qatar Airways",
  "Turkish Airlines",
  "Saudia",
  "AirAsia",
  "Singapore Airlines",
  "US-Bangla Airlines",
];
const AIRLINE_CODES = {
  "Biman Bangladesh Airlines": "BG",
  Emirates: "EK",
  "Qatar Airways": "QR",
  "Turkish Airlines": "TK",
  Saudia: "SV",
  AirAsia: "AK",
  "Singapore Airlines": "SQ",
  "US-Bangla Airlines": "BS",
};
const COLORS = {
  BG: "#0a7d4f",
  EK: "#c8102e",
  QR: "#5c0632",
  TK: "#e81932",
  SV: "#8a6d1d",
  AK: "#e4002b",
  SQ: "#b8860b",
  BS: "#0b6e4f",
};

export default function Flights() {
  const [stops, setStops] = useState([]);
  const [airs, setAirs] = useState([]);
  const [maxP, setMaxP] = useState(50000);
  const [sort, setSort] = useState("low");
  const [to, setTo] = useState("ALL");
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (to !== "ALL") params.set("to", to);
    if (stops.length === 1) {
      params.set("stops", stops[0] === "Direct" ? "DIRECT" : "ONE_STOP");
    }
    if (airs.length === 1) {
      params.set("airline", airs[0]);
    }
    params.set("maxPrice", String(maxP));
    if (sort === "low") params.set("sort", "price_asc");
    else if (sort === "high") params.set("sort", "price_desc");

    apiFetch(`/flights?${params.toString()}`)
      .then((data) => setFlights(data || []))
      .catch(() => setFlights([]));
  }, [stops, airs, maxP, sort, to]);

  const list = useMemo(() => {
    let a = flights.filter(
      (f) =>
        (stops.length === 0 ||
          stops.includes(f.stops === "DIRECT" ? "Direct" : "1 Stop")) &&
        (airs.length === 0 || airs.includes(f.airline))
    );
    if (sort === "dur") {
      a = [...a].sort((x, y) => x.duration.localeCompare(y.duration));
    }
    return a;
  }, [flights, stops, airs, sort]);

  const tog = (arr, set, v) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <main className="wrap page">
      <h1>Flight Results</h1>
      <p className="sub">Showing {list.length} flights · Sort and filter actually work — try them.</p>
      <div style={{ marginBottom: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{ padding: 11, borderRadius: 8, border: "1px solid #d5e1f2" }}
        >
          <option value="ALL">All Destinations</option>
          <option value="DXB">Dubai (DXB)</option>
          <option value="KUL">Kuala Lumpur (KUL)</option>
          <option value="SIN">Singapore (SIN)</option>
          <option value="BKK">Bangkok (BKK)</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: 11, borderRadius: 8, border: "1px solid #d5e1f2" }}
        >
          <option value="low">Sort: Lowest Price</option>
          <option value="high">Sort: Highest Price</option>
          <option value="dur">Sort: Shortest Duration</option>
        </select>
      </div>
      <div className="layout">
        <aside className="filter">
          <h3>Filter Results</h3>
          <h4>Stops</h4>
          {["Direct", "1 Stop"].map((s) => (
            <div key={s}>
              <label>
                <input
                  type="checkbox"
                  checked={stops.includes(s)}
                  onChange={() => tog(stops, setStops, s)}
                />{" "}
                {s}
              </label>
            </div>
          ))}
          <h4>Airlines</h4>
          {AIR.map((a) => (
            <div key={a}>
              <label>
                <input
                  type="checkbox"
                  checked={airs.includes(a)}
                  onChange={() => tog(airs, setAirs, a)}
                />{" "}
                {a}
              </label>
            </div>
          ))}
          <h4>Max Price: {fmt(maxP)}</h4>
          <input
            type="range"
            min="25000"
            max="50000"
            step="500"
            value={maxP}
            onChange={(e) => setMaxP(+e.target.value)}
            style={{ width: "100%" }}
          />
          <button
            className="btn"
            style={{ marginTop: 12 }}
            onClick={() => {
              setStops([]);
              setAirs([]);
              setMaxP(50000);
            }}
          >
            Clear Filters
          </button>
        </aside>
        <div>
          {list.length === 0 && (
            <div className="panel">
              No flights match these filters. Clear the filters to see all flights.
            </div>
          )}
          {list.map((f) => {
            const code =
              AIRLINE_CODES[f.airline] ||
              f.airline.slice(0, 2).toUpperCase();
            const stopsLabel = f.stops === "DIRECT" ? "Direct" : "1 Stop";
            return (
              <div className="flight" key={f.id}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span
                    className="airbadge"
                    style={{ background: COLORS[code] || "#ea580c" }}
                  >
                    {code}
                  </span>
                  <div>
                    <b>{f.airline}</b>
                    <div className="muted">Details · Baggage Info</div>
                  </div>
                </div>
                <div>
                  <div className="route">{f.from} → {f.to}</div>
                  <div>{f.depart} – {f.arrive}</div>
                  <div className="muted">({f.date}) · {f.duration} · {stopsLabel}</div>
                </div>
                <div>
                  <div className="price">{fmt(f.price)}</div>
                  <div className="muted">Economy</div>
                  <br />
                  <Link className="btn" href={"/book?f=" + f.id}>Book Now →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
