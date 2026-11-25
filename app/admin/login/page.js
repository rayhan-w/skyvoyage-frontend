"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, setAuth } from "../../../lib/api";

export default function ALogin() {
  const r = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const f = new FormData(e.target);

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: f.get("email"),
          password: f.get("pass"),
        }),
      });
      if (res.user?.role !== "ADMIN") {
        setErr("Admin access required");
        setBusy(false);
        return;
      }
      setAuth(res.token, res.user);
      r.push("/admin");
    } catch (error) {
      setErr(error.message || "Invalid email or password");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 460 }}>
      <h1 style={{ marginTop: 0 }}>Admin Login</h1>
      <form className="form" style={{ gridTemplateColumns: "1fr" }} onSubmit={handleSubmit}>
        <label>
          Admin Email
          <input name="email" type="email" required placeholder="admin@skyvoyage.com" />
        </label>
        <label>
          Password
          <input name="pass" type="password" required placeholder="••••••••" />
        </label>
        {err && <p style={{ color: "#c62828", margin: 0 }}>{err}</p>}
        <button className="btn" disabled={busy}>
          {busy ? "Signing in..." : "Login to Admin Panel"}
        </button>
      </form>
    </div>
  );
}
