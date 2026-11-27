"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiFetch, fmt, getPdfUrl } from "../../lib/api";

function Inner() {
  const sp = useSearchParams();
  const id = sp.get("id") || "";
  const [inv, setInv] = useState(null);
  const [settings, setSettings] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiFetch("/settings")
      .then((s) => setSettings(s))
      .catch(() => {});

    if (!id) return;
    apiFetch(`/invoices/${encodeURIComponent(id)}`)
      .then((data) => setInv(data))
      .catch((e) => setErr(e.message || "Invoice not found"));
  }, [id]);

  if (err) return <div className="panel">{err}</div>;
  if (!inv) return <div className="panel">Loading invoice...</div>;

  const tax = Math.round(inv.totalAmount * 0.046);
  const phone = settings?.bookingPhone || settings?.phoneHotline || "";

  return (
    <div className="panel" style={{ padding: 28 }}>
      <h1 style={{ color: "#c2410c", marginTop: 0 }}>SkyVoyage — Invoice</h1>
      <p>
        <b>Invoice No:</b> {inv.invoiceNo}
        <br />
        <b>Booking ID:</b> {inv.booking?.bookingCode}
        <br />
        <b>Customer:</b> {inv.customerName} · {inv.customerEmail}
        <br />
        <b>Date:</b> {inv.booking?.travelDate}
        <br />
        <b>Status:</b> {inv.status}
      </p>
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
      <p className="muted">
        Booking summary only — no online payment. To confirm, call us at <b>{phone}</b> or WhatsApp us.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
  );
}

export default function Inv() {
  return (
    <main className="wrap page" style={{ maxWidth: 780 }}>
      <Suspense>
        <Inner />
      </Suspense>
    </main>
  );
}
