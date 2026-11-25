"use client";
import { useEffect, useState } from "react";
import { apiFetch, fmt } from "../../../lib/api";

export default function ABookings() {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");

  const load = () => {
    apiFetch("/admin/bookings")
      .then((d) => setRows(d || []))
      .catch(() => {});
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id, status) => {
    setMsg("");
    try {
      await apiFetch(`/admin/bookings/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setMsg(`Booking #${id} updated to ${status}`);
      load();
    } catch (e) {
      setMsg(e.message || "Update failed");
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Bookings</h1>
      {msg && <div className="success" style={{ marginBottom: 12 }}>{msg}</div>}
      <div className="panel">
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Mobile</th>
                <th>Item</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.bookingCode}</td>
                  <td>{r.customerName}</td>
                  <td>{r.customerMobile}</td>
                  <td>{r.itemTitle}</td>
                  <td>{r.travelDate}</td>
                  <td>{r.status}</td>
                  <td>{fmt(r.totalAmount)}</td>
                  <td>
                    <select
                      value={r.status}
                      onChange={(e) => changeStatus(r.id, e.target.value)}
                      style={{ padding: 6, borderRadius: 6, border: "1px solid #d5e1f2" }}
                    >
                      <option value="REQUESTED">REQUESTED</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
