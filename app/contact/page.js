"use client";
import { useEffect, useState } from "react";
import ContactForm from "../../components/ContactForm";
import { apiFetch, telHref, waHref } from "../../lib/api";

export default function Contact() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    apiFetch("/settings")
      .then((s) => setSettings(s))
      .catch(() => {});
  }, []);

  const phone = settings?.bookingPhone || settings?.phoneHotline || "";
  const waNum = settings?.whatsappNumber || phone;
  const email = settings?.supportEmail || "";
  const address = settings?.officeAddress || "";

  return (
    <main className="wrap page">
      <h1>Contact & Location</h1>
      <p className="sub">
        Want any service? Call or WhatsApp us directly — booking is confirmed by
        phone. No online payment.
      </p>
      <div className="grid3" style={{ marginBottom: 20 }}>
        <a className="panel" href={telHref(phone)} style={{ display: "block" }}>
          <h3 style={{ marginTop: 0 }}>Call Us</h3>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#c2410c", margin: "4px 0" }}>
            {phone}
          </p>
          <p className="muted">Tap to call — 24/7 support</p>
        </a>
        <a
          className="panel"
          href={waHref(waNum)}
          target="_blank"
          style={{ display: "block" }}
        >
          <h3 style={{ marginTop: 0 }}>WhatsApp</h3>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#1ebe5b", margin: "4px 0" }}>
            {waNum}
          </p>
          <p className="muted">Tap to chat on WhatsApp</p>
        </a>
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Email & Office</h3>
          <p style={{ margin: "4px 0" }}>{email}</p>
          <p className="muted">{address}</p>
        </div>
      </div>
      <div className="layout">
        <div>
          <div className="panel">
            <h3>Our Office — Location</h3>
            <p>
              {address}
              <br />
              Phone / WhatsApp: {phone}
              <br />
              Email: {email}
            </p>
          </div>
          <iframe
            title="SkyVoyage Location — Dhaka"
            src={`https://www.google.com/maps?q=${encodeURIComponent(address || "Dhaka,Bangladesh")}&output=embed`}
            style={{ width: "100%", height: 320, border: 0, borderRadius: 14, marginTop: 16 }}
            loading="lazy"
          ></iframe>
        </div>
        <div>
          <h3 style={{ marginTop: 0 }}>Send a Query — All Queries</h3>
          <p className="sub">
            Flight, hotel, package or visa — send a query here, or simply call us.
            Every query goes to our admin panel.
          </p>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
