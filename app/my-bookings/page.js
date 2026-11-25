"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch, fmt, getToken } from "../../lib/api";

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
      <main className="wrap page">
        <h1>My Bookings</h1>
        <div className="panel">
          <p>Please login to view your bookings and download invoices.</p>
          <Link className="btn" href="/login">
            Login / Sign Up
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="wrap page">
      <h1>My Bookings</h1>
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
                  <td colSpan={6} className="muted">
                    No bookings found yet.
                  </td>
                </tr>
              )}
              {rows.map((b) => (
                <tr key={b.id}>
                  <td>{b.bookingCode}</td>
                  <td>{b.itemTitle}</td>
                  <td>{b.travelDate}</td>
                  <td>{b.status}</td>
                  <td>{fmt(b.totalAmount)}</td>
                  <td>
                    <Link
                      href={"/invoice/" + encodeURIComponent(b.bookingCode)}
                      style={{ color: "#ea580c", fontWeight: 700 }}
                    >
                      View Invoice
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
