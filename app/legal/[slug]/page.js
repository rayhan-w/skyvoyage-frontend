"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

const tabs = [
  ["privacy", "Privacy Policy"],
  ["terms", "Terms & Conditions"],
  ["refund", "Refund Policy"],
];

export default function Legal({ params }) {
  const slug = (params?.slug || "privacy").toLowerCase();
  const [page, setPage] = useState(null);

  useEffect(() => {
    apiFetch(`/legal/${encodeURIComponent(slug)}`)
      .then((data) => setPage(data))
      .catch(() =>
        setPage({ title: "Legal Information", content: "Unable to load policy." }),
      );
  }, [slug]);

  return (
    <main className="wrap page" style={{ maxWidth: 860 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {tabs.map(([k, label]) => (
          <Link
            key={k}
            href={`/legal/${k}`}
            className={slug === k ? "btn" : "btn ghost"}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="panel" style={{ padding: 28 }}>
        <h1 style={{ marginTop: 0, color: "#0f172a" }}>
          {page?.title || "Loading..."}
        </h1>
        <p style={{ lineHeight: 1.8, fontSize: 16, color: "#334155", whiteSpace: "pre-line" }}>
          {page?.content || "Loading policy text..."}
        </p>
        <hr style={{ border: 0, borderTop: "1px solid #e2e8f0", margin: "22px 0" }} />
        <p className="muted" style={{ margin: 0 }}>
          Questions about this policy?{" "}
          <Link href="/contact" style={{ color: "#ea580c", fontWeight: 700 }}>
            Contact SkyVoyage Support →
          </Link>
        </p>
      </div>
    </main>
  );
}
