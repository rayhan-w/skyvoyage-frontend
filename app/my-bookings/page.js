"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch, fmt, getToken } from "../../lib/api";

function statusStyle(status) {
  if (status === "CONFIRMED") {
    return { background: "#dcfce7", color: "#166534", border: "1px solid #86efac" };
  }
  if (status === "CANCELLED") {
    return { background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" };
  }
  return { background: "#ffedd5", color: "#9a3412", border: "1px solid #fdba74" };
}

export default function Bookings() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setNeedsLogin(true);
      setLoading(false);
      return;
    }

    apiFetch("/bookings/mine")
      .then((data) => {
        setRows(data || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 401) setNeedsLogin(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="wrap page">
        <h1>My Bookings</h1>
        <div className="panel">Loading your bookings...</div>
      </main>
    );
  }

  if (needsLogin) {
    return (
      <main className="wrap page" style={{ maxWidth: 640 }}>
        <div className="panel" style={{ textAlign: "center", padding: 32 }}>
          <h1 style={{ marginTop: 0 }}>My Bookings</h1>
          <p className="muted" style={{ marginBottom: 20 }}>
            Please login to view your booking requests, status updates, and PDF invoices.
          </p>
          <Link className="btn" href="/login">
            Login / Sign Up →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="wrap page">
      <div className="sechead" style={{ marginBottom: 16 }}>
        <div>
          <h1 style={{ margin: "0 0 4px" }}>My Bookings</h1>
          <p className="muted" style={{ margin: 0 }}>
            All bookings are confirmed by phone or WhatsApp — no online payment required.
          </p>
        </div>
        <Link className="btn" href="/packages">
          + New Booking
        </Link>
      </div>
      <div className="panel">
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Item</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 28 }}>
                    <p className="muted" style={{ margin: "0 0 12px" }}>
                      No bookings found yet.
                    </p>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                      <Link className="btn" href="/packages">
                        Explore Packages
                      </Link>
                      <Link className="btn ghost" href="/flights">
                        Search Flights
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
              {rows.map((b) => (
                <tr key={b.id}>
                  <td>
                    <b>{b.bookingCode}</b>
                  </td>
                  <td>{b.itemTitle}</td>
                  <td>{b.travelDate}</td>
                  <td>
                    <span
                      style={{
                        ...statusStyle(b.status),
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 800,
                        display: "inline-block",
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <b>{fmt(b.totalAmount)}</b>
                  </td>
                  <td>
                    <Link
                      href={"/invoice/" + encodeURIComponent(b.bookingCode)}
                      style={{ color: "#ea580c", fontWeight: 700 }}
                    >
                      View Invoice →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
