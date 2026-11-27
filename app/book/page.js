"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, fmt, telHref, waHref } from "../../lib/api";

function Inner() {
  const sp = useSearchParams();
  const r = useRouter();
  const [done, setDone] = useState(null);
  const [sel, setSel] = useState(null);
  const [settings, setSettings] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const pkgName = sp.get("pkg");
  const flightId = sp.get("f");

  useEffect(() => {
    apiFetch("/settings")
      .then((s) => setSettings(s))
      .catch(() => {});

    if (pkgName) {
      apiFetch("/packages")
        .then((pkgs) => {
          const pk = (pkgs || []).find((x) => x.name === pkgName);
          if (pk) {
            setSel({
              title: pk.name,
              sub: `${pk.days} · ${pk.persons} · ${pk.place}`,
              date: pk.date || "Flexible date",
              price: pk.price,
              item: `${pk.name} Package`,
              itemType: "PACKAGE",
              packageId: pk.id,
            });
          }
        })
        .catch(() => {});
    } else {
      apiFetch("/flights")
        .then((flights) => {
          const list = flights || [];
          const f =
            (flightId ? list.find((x) => x.id === Number(flightId)) : null) ||
            list[0];
          if (f) {
            setSel({
              title: f.airline,
              sub: `${f.from} to ${f.to} · ${f.depart} – ${f.arrive}`,
              date: f.date,
              price: f.price,
              item: `${f.airline} ${f.from} to ${f.to}`,
              itemType: "FLIGHT",
              flightId: f.id,
            });
          }
        })
        .catch(() => {});
    }
  }, [pkgName, flightId]);

  const phone = settings?.bookingPhone || settings?.phoneHotline || "";
  const waNum = settings?.whatsappNumber || phone;

  if (done) {
    return (
      <div className="panel" style={{ padding: 28 }}>
        <span
          style={{
            display: "inline-block",
            background: "#dcfce7",
            color: "#166534",
            fontWeight: 800,
            fontSize: 12,
            padding: "5px 12px",
            borderRadius: 999,
            marginBottom: 10,
          }}
        >
          REQUEST RECEIVED
        </span>
        <h2 style={{ marginTop: 0 }}>Booking Request Received!</h2>
        <p>
          Request ID: <b>{done.booking.bookingCode}</b>
        </p>
        <p>
          {done.booking.customerName} · {done.booking.itemTitle} ·{" "}
          {done.booking.travelDate} · Approx. <b>{fmt(done.booking.totalAmount)}</b>
        </p>
        <p>
          <b>
            To confirm this booking, contact us now — our team will confirm
            everything by phone:
          </b>
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "16px 0" }}>
          <a className="btn" href={telHref(phone)}>
            Call {phone}
          </a>
          <a
            className="btn"
            style={{ background: "#25d366" }}
            href={waHref(waNum)}
            target="_blank"
          >
            WhatsApp Us
          </a>
          <Link
            className="btn ghost"
            href={"/invoice/" + encodeURIComponent(done.booking.bookingCode)}
          >
            View Invoice
          </Link>
          <Link className="btn ghost" href="/contact">
            Contact Page
          </Link>
        </div>
        <p className="muted">
          There is no online payment on this website. All bookings are confirmed
          directly by phone or WhatsApp. Your request is also saved in My
          Bookings and the Admin Panel.
        </p>
        <button className="btn" onClick={() => r.push("/my-bookings")}>
          Go to My Bookings →
        </button>
      </div>
    );
  }

  if (!sel) {
    return <div className="panel">Loading booking details...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const fd = new FormData(e.target);

    try {
      const res = await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify({
          customerName: fd.get("name"),
          customerMobile: fd.get("mobile"),
          customerEmail: fd.get("email"),
          passportNo: fd.get("passport") || undefined,
          itemTitle: sel.item,
          itemType: sel.itemType,
          packageId: sel.packageId,
          flightId: sel.flightId,
          travelDate: sel.date,
          note: fd.get("note") || undefined,
          totalAmount: sel.price,
        }),
      });
      setDone(res);
    } catch (error) {
      setErr(error.message || "Booking request failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: 14 }}>Booking Request</h1>
      <div
        className="panel"
        style={{
          marginBottom: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
          borderLeft: "4px solid #ea580c",
        }}
      >
        <div>
          <b style={{ fontSize: 18, display: "block" }}>{sel.title}</b>
          <span className="muted">
            {sel.sub} · {sel.date}
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="price">{fmt(sel.price)}</div>
          <span className="muted" style={{ fontSize: 12 }}>
            Confirm by phone · No online payment
          </span>
        </div>
      </div>
      <p className="sub">
        Fill in your details and send the request — then call or WhatsApp us at{" "}
        <b>{phone}</b> to confirm.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input name="name" required placeholder="Your full name" />
        </label>
        <label>
          Mobile (we will call this number)
          <input name="mobile" required placeholder="+8801XXXXXXXXX" />
        </label>
        <label>
          Email
          <input name="email" type="email" required placeholder="you@email.com" />
        </label>
        <label>
          Passport / NID No
          <input name="passport" placeholder="Optional" />
        </label>
        <label className="wide">
          Anything we should know?
          <textarea
            name="note"
            rows="3"
            placeholder="Travel date, persons, special request..."
          />
        </label>
        {err && (
          <p className="wide" style={{ color: "#c62828", margin: 0 }}>
            {err}
          </p>
        )}
        <button className="btn wide" disabled={busy}>
          {busy ? "Sending..." : "Send Booking Request"}
        </button>
      </form>
    </div>
  );
}

export default function Book() {
  return (
    <main className="wrap page" style={{ maxWidth: 780 }}>
      <Suspense>
        <Inner />
      </Suspense>
    </main>
  );
}
