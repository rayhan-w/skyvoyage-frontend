"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    apiFetch("/settings")
      .then((s) => setSettings(s))
      .catch(() => {});
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="wrap fgrid">
          <div>
            <div className="logo light">
              <span className="plane">✈</span>
              <span className="logotext">Sky<span>Voyage</span></span>
            </div>
            <p>Your trusted travel partner for a better and more exciting journey.</p>
            <div className="socials"><span>f</span><span>▶</span><span>◎</span><span>in</span></div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/packages">Packages</Link>
            <Link href="/contact">Inquiry</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin">Admin Panel</Link>
          </div>
          <div>
            <h4>Legal Pages</h4>
            <Link href="/legal/privacy">Privacy Policy</Link>
            <Link href="/legal/terms">Terms & Conditions</Link>
            <Link href="/legal/refund">Refund Policy</Link>
            <Link href="/legal/terms">Cancellation Policy</Link>
          </div>
          <div>
            <h4>Our Services</h4>
            <Link href="/packages">Tour Packages</Link>
            <Link href="/flights">Flight Booking</Link>
            <Link href="/hotels">Hotel Booking</Link>
            <Link href="/visa">Visa Assistance</Link>
          </div>
          <div>
            <h4>Book by Phone</h4>
            <p style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "4px 0" }}>
              {settings?.bookingPhone || ""}
            </p>
            <p>Call or WhatsApp us to book any service. No online payment — we confirm everything by phone.</p>
            <p>
              {settings?.supportEmail || ""}
              <br />
              {settings?.officeAddress || ""}
            </p>
          </div>
        </div>
        <div className="wrap fbottom">
          <span>© 2026 SkyVoyage. All Rights Reserved.</span>
          <span>Designed for Travelers</span>
        </div>
      </footer>
    </>
  );
}
