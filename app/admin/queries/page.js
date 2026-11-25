"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function AQueries() {
  const [rows, setRows] = useState([]);
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [msg, setMsg] = useState("");

  const load = () => {
    apiFetch("/admin/queries")
      .then((d) => setRows(d || []))
      .catch(() => {});
  };

  useEffect(() => {
    load();
  }, []);

  const sendReply = async (e) => {
    e.preventDefault();
    if (!replyingId || !replyText.trim()) return;
    setMsg("");
    try {
      await apiFetch(`/admin/queries/${replyingId}/reply`, {
        method: "POST",
        body: JSON.stringify({ reply: replyText }),
      });
      setMsg("Reply sent and saved.");
      setReplyingId(null);
      setReplyText("");
      load();
    } catch (err) {
      setMsg(err.message || "Failed to send reply");
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Queries / Enquiries</h1>
      {msg && <div className="success" style={{ marginBottom: 12 }}>{msg}</div>}
      <div className="panel">
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.queryCode}</td>
                  <td>
                    {r.name}
                    <div className="muted">{r.email}</div>
                  </td>
                  <td>{r.type}</td>
                  <td>
                    {r.message}
                    {r.adminReply && (
                      <div className="muted">Reply: {r.adminReply}</div>
                    )}
                  </td>
                  <td>{r.status}</td>
                  <td>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        setReplyingId(r.id);
                        setReplyText(r.adminReply || "");
                      }}
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {replyingId && (
        <div className="panel" style={{ marginTop: 16 }}>
          <h3>Reply to Query #{replyingId}</h3>
          <form className="form" onSubmit={sendReply}>
            <label className="wide">
              Reply Message (emailed to customer)
              <textarea
                rows="3"
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn">Send Reply</button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => setReplyingId(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
