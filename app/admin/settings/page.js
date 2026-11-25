"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function ASettings() {
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    apiFetch("/admin/settings")
      .then((s) => setForm(s))
      .catch((e) => setErr(e.message || "Failed to load settings"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    setBusy(true);
    try {
      const updated = await apiFetch("/admin/settings", {
        method: "PUT",
        body: JSON.stringify({
          officeAddress: form.officeAddress,
          phoneHotline: form.phoneHotline,
          supportEmail: form.supportEmail,
          bookingPhone: form.bookingPhone,
          whatsappNumber: form.whatsappNumber,
          privacyPolicy: form.privacyPolicy,
          termsConditions: form.termsConditions,
          refundPolicy: form.refundPolicy,
        }),
      });
      setForm(updated);
      setMsg("Settings saved successfully.");
    } catch (error) {
      setErr(error.message || "Failed to save settings");
    } finally {
      setBusy(false);
    }
  };

  if (!form) {
    return (
      <div>
        <h1 style={{ marginTop: 0 }}>Settings</h1>
        <div className="panel">{err || "Loading settings..."}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Settings</h1>
      {msg && <div className="success" style={{ marginBottom: 12 }}>{msg}</div>}
      {err && <p style={{ color: "#c62828" }}>{err}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Office Address (Location)
          <input
            value={form.officeAddress || ""}
            onChange={(e) => setForm({ ...form, officeAddress: e.target.value })}
          />
        </label>
        <label>
          Phone / Hotline
          <input
            value={form.phoneHotline || ""}
            onChange={(e) => setForm({ ...form, phoneHotline: e.target.value })}
          />
        </label>
        <label>
          Support Email
          <input
            type="email"
            value={form.supportEmail || ""}
            onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
          />
        </label>
        <label>
          Booking Phone Number
          <input
            value={form.bookingPhone || ""}
            onChange={(e) => setForm({ ...form, bookingPhone: e.target.value })}
          />
        </label>
        <label>
          WhatsApp Number
          <input
            value={form.whatsappNumber || ""}
            onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
          />
        </label>
        <label className="wide">
          Privacy Policy Text
          <textarea
            rows="4"
            value={form.privacyPolicy || ""}
            onChange={(e) => setForm({ ...form, privacyPolicy: e.target.value })}
          />
        </label>
        <label className="wide">
          Terms & Conditions Text
          <textarea
            rows="4"
            value={form.termsConditions || ""}
            onChange={(e) => setForm({ ...form, termsConditions: e.target.value })}
          />
        </label>
        <label className="wide">
          Refund Policy Text
          <textarea
            rows="4"
            value={form.refundPolicy || ""}
            onChange={(e) => setForm({ ...form, refundPolicy: e.target.value })}
          />
        </label>
        <button className="btn wide" disabled={busy}>
          {busy ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
