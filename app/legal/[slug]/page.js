"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function Legal({ params }) {
  const slug = params?.slug || "privacy";
  const [page, setPage] = useState(null);

  useEffect(() => {
    apiFetch(`/legal/${encodeURIComponent(slug)}`)
      .then((data) => setPage(data))
      .catch(() => setPage({ title: "Legal Information", content: "Unable to load policy." }));
  }, [slug]);

  return (
    <main className="wrap page" style={{ maxWidth: 820 }}>
      <h1>{page?.title || "Loading..."}</h1>
      <div className="panel">
        <p>{page?.content || "Loading policy text..."}</p>
      </div>
    </main>
  );
}
