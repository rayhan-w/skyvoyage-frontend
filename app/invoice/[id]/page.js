"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch, fmt, getPdfUrl } from "../../../lib/api";

export default function Invoice({ params }) {
  const id = decodeURIComponent(params?.id || "");
  const [inv, setInv] = useState(null);
  const [settings, setSettings] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiFetch("/settings")
      .then((s) => setSettings(s))
      .catch(() => {});

    if (id) {
      apiFetch(`/invoices/${encodeURIComponent(id)}`)
        .then((data) => setInv(data))
        .catch((e) => setErr(e.message || "Invoice not found"));
    }
  }, [id]);

  if (err) {
    return (
      <main className="wrap page" style={{ maxWidth: 760 }}>
        <div className="panel">{err}</div>
      </main>
    );
  }

  if (!inv) {
    return (
      <main className="wrap page" style={{ maxWidth: 760 }}>
        <div className="panel">Loading invoice...</div>
      </main>
    );
  }

  const tax = Math.round(inv.totalAmount * 0.046);
  const phone = settings?.bookingPhone || settings?.phoneHotline || "";

  return (
    <main className="wrap page" style={{ maxWidth: 780 }}>
      <div className="panel" style={{ padding: 28 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            borderBottom: "2px solid #f1f5f9",
            paddingBottom: 16,
            marginBottom: 18,
          }}
        >
          <div>
            <h1 style={{ color: "#c2410c", margin: "0 0 4px" }}>SkyVoyage — Invoice</h1>
            <span className="muted">Booking Summary (No Online Payment)</span>
          </div>
          <span
            style={{
              background: inv.status === "CONFIRMED" ? "#dcfce7" : "#ffedd5",
              color: inv.status === "CONFIRMED" ? "#166534" : "#9a3412",
              padding: "6px 14px",
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            {inv.status}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 20,
            background: "#f8fafc",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <div>
            <div className="muted" style={{ fontSize: 12 }}>INVOICE DETAILS</div>
            <div><b>Invoice No:</b> {inv.invoiceNo}</div>
            <div><b>Booking ID:</b> {inv.booking?.bookingCode}</div>
            <div><b>Travel Date:</b> {inv.booking?.travelDate}</div>
          </div>
          <div>
            <div className="muted" style={{ fontSize: 12 }}>CUSTOMER</div>
            <div><b>{inv.customerName}</b></div>
            <div>{inv.customerEmail}</div>
            <div>{inv.customerMobile}</div>
          </div>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{inv.itemDescription}</td>
                <td>1</td>
                <td>{fmt(inv.totalAmount - tax)}</td>
              </tr>
              <tr>
                <td>Taxes & Fees</td>
                <td>1</td>
                <td>{fmt(tax)}</td>
              </tr>
              <tr>
                <td><b>Total</b></td>
                <td></td>
                <td><b className="price">{fmt(inv.totalAmount)}</b></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="muted" style={{ marginTop: 16 }}>
          Booking summary only — no online payment. To confirm, call us at <b>{phone}</b> or WhatsApp us.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <a
            className="btn"
            href={getPdfUrl(inv.invoiceNo)}
            target="_blank"
            rel="noopener noreferrer"
            download={`${inv.invoiceNo}.pdf`}
          >
            Download PDF
          </a>
          <Link className="btn ghost" href="/my-bookings">
            Back to My Bookings
          </Link>
        </div>
      </div>
    </main>
  );
}
