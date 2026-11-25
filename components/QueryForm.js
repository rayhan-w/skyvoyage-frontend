"use client";
import { useState } from "react";
import { apiFetch } from "../lib/api";

export default function QueryForm({ type = "General", service = "" }) {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (done) {
    return (
      <div className="success">
        Query received! Our team will reply by email and phone. Your query is now visible in the Admin Panel (Queries).
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const f = new FormData(e.target);
    const queryType = f.get("type");
    const payload = {
      name: f.get("name"),
      mobile: f.get("mobile"),
      email: f.get("email"),
      type: queryType,
      service: f.get("service") || undefined,
      message: f.get("message"),
    };

    try {
      const endpoint =
        queryType === "Custom Package" ? "/packages/custom-request" : "/queries";
      await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setDone(true);
    } catch (error) {
      setErr(error.message || "Failed to send query");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Full Name
        <input name="name" required placeholder="Your name" />
      </label>
      <label>
        Mobile
        <input name="mobile" required placeholder="01XXXXXXXXX" />
      </label>
      <label>
        Email
        <input name="email" type="email" required placeholder="you@email.com" />
      </label>
      <label>
        Query Type
        <select name="type" defaultValue={type}>
          <option>Flights</option>
          <option>Hotels</option>
          <option>Ready Package</option>
          <option>Upcoming Package</option>
          <option>Custom Package</option>
          <option>Visa</option>
          <option>General</option>
        </select>
      </label>
      <label className="wide">
        Service / Package
        <input
          name="service"
          defaultValue={service}
          placeholder="e.g. Bangkok & Pattaya Tour"
        />
      </label>
      <label className="wide">
        Your Message
        <textarea
          name="message"
          required
          rows="4"
          placeholder="Write your query in detail..."
        />
      </label>
      {err && (
        <p className="wide" style={{ color: "#c62828", margin: 0 }}>
          {err}
        </p>
      )}
      <button className="btn wide" disabled={busy}>
        {busy ? "Sending..." : "Send Query"}
      </button>
    </form>
  );
}
