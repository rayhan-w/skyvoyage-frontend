"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch, fmt } from "../../lib/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiFetch("/admin/dashboard")
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  const stats = [
    ["Total Bookings", data ? String(data.totalBookings) : "—"],
    ["Pending Queries", data ? String(data.pendingQueries) : "—"],
    ["Confirmed Total", data ? fmt(data.confirmedTotalAmount) : "—"],
    ["Packages Live", data ? String(data.totalPackages) : "—"],
    ["Invoices Issued", data ? String(data.totalInvoices) : "—"],
    ["Registered Customers", data ? String(data.totalCustomers) : "—"],
  ];

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      <div className="grid3">
        {stats.map((s) => (
          <div className="panel" key={s[0]}>
            <div className="muted">{s[0]}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#c2410c" }}>{s[1]}</div>
          </div>
        ))}
      </div>
      <div className="panel" style={{ marginTop: 18 }}>
        <h3>Latest Bookings</h3>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {(data?.latestBookings || []).map((b) => (
                <tr key={b.id}>
                  <td>{b.bookingCode}</td>
                  <td>{b.customerName}</td>
                  <td>{b.itemTitle}</td>
                  <td>{b.status}</td>
                  <td>{fmt(b.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <Link className="btn" href="/admin/bookings">
          Manage Bookings
        </Link>
      </div>
    </div>
  );
}
