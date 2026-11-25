"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch, fmt } from "../../../lib/api";

export default function AInvoices() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    apiFetch("/admin/invoices")
      .then((d) => setRows(d || []))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Invoices</h1>
      <div className="panel">
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Booking</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.invoiceNo}</td>
                  <td>{r.booking?.bookingCode}</td>
                  <td>{r.customerName}</td>
                  <td>{fmt(r.totalAmount)}</td>
                  <td>{r.status}</td>
                  <td>
                    <Link
                      href={"/invoice/" + encodeURIComponent(r.invoiceNo)}
                      style={{ color: "#ea580c", fontWeight: 700 }}
                    >
                      Invoice
                    </Link>
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
