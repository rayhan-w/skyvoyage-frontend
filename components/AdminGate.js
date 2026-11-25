"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { apiFetch, getToken } from "../lib/api";

export default function AdminGate({ children }) {
  const p = usePathname();
  const [ok, setOk] = useState(null);

  useEffect(() => {
    if (p === "/admin/login") return;
    const token = getToken();
    if (!token) {
      setOk(false);
      return;
    }
    apiFetch("/auth/me")
      .then((user) => {
        setOk(user?.role === "ADMIN");
      })
      .catch(() => setOk(false));
  }, [p]);

  if (p === "/admin/login") return children;
  if (ok === null) return <div className="panel">Checking admin session...</div>;
  if (!ok) {
    return (
      <div className="panel">
        <h2>Admin Login Required</h2>
        <p className="muted">Please sign in with an ADMIN account to access the Admin Panel.</p>
        <Link className="btn" href="/admin/login">
          Go to Admin Login
        </Link>
      </div>
    );
  }
  return children;
}
