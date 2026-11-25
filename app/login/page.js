"use client";
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
    <main className="wrap page" style={{ maxWidth: 520 }}>
      <h1>{mode === "login" ? "Login" : "Create Account"}</h1>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button
          type="button"
          className={mode === "login" ? "btn" : "btn ghost"}
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
          onClick={() => {
            setMode("register");
            setErr("");
          }}
        >
          Sign Up
        </button>
      </div>
      <form className="form" style={{ gridTemplateColumns: "1fr" }} onSubmit={handleSubmit}>
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
    </main>
  );
}
