"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { apiFetch, clearAuth, getStoredUser, getToken } from "../lib/api";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const f = () => setSc(window.scrollY > 10);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    apiFetch("/settings")
      .then((s) => setSettings(s))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const syncAuth = () => {
      const token = getToken();
      if (!token) {
        setUser(null);
        return;
      }
      const cached = getStoredUser();
      if (cached) setUser(cached);
      apiFetch("/auth/me")
        .then((u) => setUser(u))
        .catch(() => {
          clearAuth();
          setUser(null);
        });
    };
    syncAuth();
    window.addEventListener("sv-auth-change", syncAuth);
    return () => window.removeEventListener("sv-auth-change", syncAuth);
  }, []);

  const close = () => setOpen(false);
  const handleLogout = () => {
    clearAuth();
    setUser(null);
    close();
  };

  return (
    <>
      <div className="topbar">
        <div className="wrap topin">
          <span>{settings?.bookingPhone || settings?.phoneHotline || ""}</span>
          <span>{settings?.supportEmail || ""}</span>
          <span className="topright">
            {settings?.officeAddress ? `${settings.officeAddress} · EN` : "EN"}
          </span>
        </div>
      </div>
      <header className={"header" + (sc ? " scrolled" : "")}>
        <div className="wrap nav">
          <Link href="/" className="logo" onClick={close}>
            <span className="plane">✈</span>
            <span className="logotext">
              Sky<span>Voyage</span>
              <small>Fly More · Explore More</small>
            </span>
          </Link>
          <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>
          <nav className={open ? "links open" : "links"}>
            <Link href="/" onClick={close}>Home</Link>
            <Link href="/packages" onClick={close}>Packages</Link>
            <Link href="/contact" onClick={close}>Inquiry</Link>
            <Link href="/about" onClick={close}>About Us</Link>
            <Link href="/contact" onClick={close}>Contact</Link>
            {user ? (
              <>
                <Link href="/my-bookings" onClick={close}>{user.name}</Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                    color: "inherit",
                    padding: 0,
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={close}>Login</Link>
            )}
            <Link href="/flights" className="bookbtn" onClick={close}>Book Now</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
