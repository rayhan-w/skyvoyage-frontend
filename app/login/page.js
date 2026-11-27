"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, setAuth } from "../../lib/api";

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const fd = new FormData(e.target);

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload =
        mode === "login"
          ? { email: fd.get("email"), password: fd.get("password") }
          : {
              name: fd.get("name"),
              mobile: fd.get("mobile"),
              email: fd.get("email"),
              password: fd.get("password"),
            };
      const res = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setAuth(res.token, res.user);
      router.push("/my-bookings");
    } catch (error) {
      setErr(error.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="wrap page" style={{ maxWidth: 500 }}>
      <div className="panel" style={{ padding: 28 }}>
        <h1 style={{ marginTop: 0, marginBottom: 6 }}>
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="sub" style={{ marginTop: 0 }}>
          {mode === "login"
            ? "Sign in to view your bookings and download invoices."
            : "Register with SkyVoyage to track your booking requests."}
        </p>
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <button
            type="button"
            className={mode === "login" ? "btn" : "btn ghost"}
            style={{ flex: 1 }}
            onClick={() => {
              setMode("login");
              setErr("");
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "register" ? "btn" : "btn ghost"}
            style={{ flex: 1 }}
            onClick={() => {
              setMode("register");
              setErr("");
            }}
          >
            Sign Up
          </button>
        </div>
        <form
          className="form"
          style={{ gridTemplateColumns: "1fr", padding: 0, boxShadow: "none" }}
          onSubmit={handleSubmit}
        >
          {mode === "register" && (
            <>
              <label>
                Full Name
                <input name="name" required placeholder="Your name" />
              </label>
              <label>
                Mobile
                <input name="mobile" required placeholder="+8801XXXXXXXXX" />
              </label>
            </>
          )}
          <label>
            Email
            <input name="email" type="email" required placeholder="you@email.com" />
          </label>
          <label>
            Password
            <input name="password" type="password" required placeholder="••••••••" />
          </label>
          {err && <p style={{ color: "#c62828", margin: 0 }}>{err}</p>}
          <button className="btn" disabled={busy}>
            {busy ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
        <p className="muted" style={{ marginTop: 18, marginBottom: 0, textAlign: "center" }}>
          Staff member?{" "}
          <Link href="/admin/login" style={{ color: "#ea580c", fontWeight: 700 }}>
            Admin Login →
          </Link>
        </p>
      </div>
    </main>
  );
}
