"use client";
import { useEffect, useState } from "react";
import { apiFetch, fmt } from "../../../lib/api";

export default function APackages() {
  const [tab, setTab] = useState("packages");
  const [packages, setPackages] = useState([]);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState(null);

  const loadAll = () => {
    Promise.all([
      apiFetch("/admin/packages"),
      apiFetch("/admin/flights"),
      apiFetch("/admin/hotels"),
      apiFetch("/admin/destinations"),
    ])
      .then(([p, f, h, d]) => {
        setPackages(p || []);
        setFlights(f || []);
        setHotels(h || []);
        setDestinations(d || []);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    const fd = new FormData(e.target);

    try {
      if (tab === "packages") {
        const body = {
          type: fd.get("type"),
          name: fd.get("name"),
          badge: fd.get("badge") || null,
          days: fd.get("days"),
          persons: fd.get("persons"),
          place: fd.get("place"),
          rating: Number(fd.get("rating") || 5),
          reviews: Number(fd.get("reviews") || 0),
          price: Number(fd.get("price")),
          imageUrl: fd.get("imageUrl"),
          startDate: fd.get("startDate") || null,
          active: fd.get("active") === "on",
        };
        if (editing?.id) {
          await apiFetch(`/admin/packages/${editing.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
          });
          setMsg("Package updated.");
        } else {
          await apiFetch("/admin/packages", {
            method: "POST",
            body: JSON.stringify(body),
          });
          setMsg("Package created.");
        }
      } else if (tab === "flights") {
        const body = {
          airline: fd.get("airline"),
          fromCity: fd.get("fromCity"),
          toCity: fd.get("toCity"),
          departTime: fd.get("departTime"),
          arriveTime: fd.get("arriveTime"),
          duration: fd.get("duration"),
          stops: fd.get("stops"),
          price: Number(fd.get("price")),
          date: fd.get("date"),
          active: fd.get("active") === "on",
        };
        if (editing?.id) {
          await apiFetch(`/admin/flights/${editing.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
          });
          setMsg("Flight updated.");
        } else {
          await apiFetch("/admin/flights", {
            method: "POST",
            body: JSON.stringify(body),
          });
          setMsg("Flight created.");
        }
      } else if (tab === "hotels") {
        const body = {
          name: fd.get("name"),
          city: fd.get("city"),
          stars: Number(fd.get("stars")),
          pricePerNight: Number(fd.get("pricePerNight")),
          imageUrl: fd.get("imageUrl"),
          active: fd.get("active") === "on",
        };
        if (editing?.id) {
          await apiFetch(`/admin/hotels/${editing.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
          });
          setMsg("Hotel updated.");
        } else {
          await apiFetch("/admin/hotels", {
            method: "POST",
            body: JSON.stringify(body),
          });
          setMsg("Hotel created.");
        }
      } else if (tab === "destinations") {
        const body = {
          name: fd.get("name"),
          country: fd.get("country"),
          price: Number(fd.get("price")),
          imageUrl: fd.get("imageUrl"),
          active: fd.get("active") === "on",
        };
        if (editing?.id) {
          await apiFetch(`/admin/destinations/${editing.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
          });
          setMsg("Destination updated.");
        } else {
          await apiFetch("/admin/destinations", {
            method: "POST",
            body: JSON.stringify(body),
          });
          setMsg("Destination created.");
        }
      }
      setEditing(null);
      loadAll();
    } catch (error) {
      setErr(error.message || "Save failed");
    }
  };

  const handleDelete = async (endpoint, id) => {
    setMsg("");
    setErr("");
    try {
      await apiFetch(`${endpoint}/${id}`, { method: "DELETE" });
      setMsg("Deleted.");
      loadAll();
    } catch (error) {
      setErr(error.message || "Delete failed");
    }
  };

  const readyPackages = packages.filter((p) => p.type === "READY");
  const upcomingPackages = packages.filter((p) => p.type === "UPCOMING");

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Catalog Management</h1>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          ["packages", "Packages"],
          ["flights", "Flights"],
          ["hotels", "Hotels"],
          ["destinations", "Destinations"],
        ].map(([k, label]) => (
          <button
            key={k}
            type="button"
            className={tab === k ? "btn" : "btn ghost"}
            onClick={() => {
              setTab(k);
              setEditing(null);
              setMsg("");
              setErr("");
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {msg && <div className="success" style={{ marginBottom: 12 }}>{msg}</div>}
      {err && <p style={{ color: "#c62828" }}>{err}</p>}

      {tab === "packages" && (
        <>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <button
              type="button"
              className="btn"
              onClick={() => setEditing({ type: "READY", active: true, rating: 4.9, reviews: 0 })}
            >
              + Add Ready Package
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setEditing({ type: "UPCOMING", active: true, rating: 4.9, reviews: 0 })}
            >
              + Add Upcoming Package
            </button>
          </div>
          <div className="panel">
            <h3>Ready Packages</h3>
            <div className="tablewrap">
              <table>
                <thead>
                  <tr><th>Name</th><th>Duration</th><th>Price</th><th>Active</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {readyPackages.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.days}</td>
                      <td>{fmt(p.price)}</td>
                      <td>{p.active ? "Yes" : "No"}</td>
                      <td>
                        <button type="button" className="btn" style={{ padding: "5px 10px", marginRight: 6 }} onClick={() => setEditing(p)}>Edit</button>
                        <button type="button" className="btn ghost" style={{ padding: "5px 10px" }} onClick={() => handleDelete("/admin/packages", p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3>Upcoming Packages</h3>
            <div className="tablewrap">
              <table>
                <thead>
                  <tr><th>Name</th><th>Duration</th><th>Departure</th><th>Price</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {upcomingPackages.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.days}</td>
                      <td>{p.startDate}</td>
                      <td>{fmt(p.price)}</td>
                      <td>
                        <button type="button" className="btn" style={{ padding: "5px 10px", marginRight: 6 }} onClick={() => setEditing(p)}>Edit</button>
                        <button type="button" className="btn ghost" style={{ padding: "5px 10px" }} onClick={() => handleDelete("/admin/packages", p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "flights" && (
        <>
          <button
            type="button"
            className="btn"
            style={{ marginBottom: 16 }}
            onClick={() => setEditing({ stops: "DIRECT", active: true })}
          >
            + Add Flight
          </button>
          <div className="panel">
            <div className="tablewrap">
              <table>
                <thead>
                  <tr><th>Airline</th><th>Route</th><th>Date</th><th>Stops</th><th>Price</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {flights.map((f) => (
                    <tr key={f.id}>
                      <td>{f.airline}</td>
                      <td>{f.fromCity} → {f.toCity}</td>
                      <td>{f.date}</td>
                      <td>{f.stops}</td>
                      <td>{fmt(f.price)}</td>
                      <td>
                        <button type="button" className="btn" style={{ padding: "5px 10px", marginRight: 6 }} onClick={() => setEditing(f)}>Edit</button>
                        <button type="button" className="btn ghost" style={{ padding: "5px 10px" }} onClick={() => handleDelete("/admin/flights", f.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "hotels" && (
        <>
          <button
            type="button"
            className="btn"
            style={{ marginBottom: 16 }}
            onClick={() => setEditing({ stars: 5, active: true })}
          >
            + Add Hotel
          </button>
          <div className="panel">
            <div className="tablewrap">
              <table>
                <thead>
                  <tr><th>Name</th><th>City</th><th>Stars</th><th>Price/Night</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {hotels.map((h) => (
                    <tr key={h.id}>
                      <td>{h.name}</td>
                      <td>{h.city}</td>
                      <td>{h.stars}★</td>
                      <td>{fmt(h.pricePerNight)}</td>
                      <td>
                        <button type="button" className="btn" style={{ padding: "5px 10px", marginRight: 6 }} onClick={() => setEditing(h)}>Edit</button>
                        <button type="button" className="btn ghost" style={{ padding: "5px 10px" }} onClick={() => handleDelete("/admin/hotels", h.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "destinations" && (
        <>
          <button
            type="button"
            className="btn"
            style={{ marginBottom: 16 }}
            onClick={() => setEditing({ active: true })}
          >
            + Add Destination
          </button>
          <div className="panel">
            <div className="tablewrap">
              <table>
                <thead>
                  <tr><th>Name</th><th>Country</th><th>Price</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {destinations.map((d) => (
                    <tr key={d.id}>
                      <td>{d.name}</td>
                      <td>{d.country}</td>
                      <td>{fmt(d.price)}</td>
                      <td>
                        <button type="button" className="btn" style={{ padding: "5px 10px", marginRight: 6 }} onClick={() => setEditing(d)}>Edit</button>
                        <button type="button" className="btn ghost" style={{ padding: "5px 10px" }} onClick={() => handleDelete("/admin/destinations", d.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {editing && (
        <div className="panel" style={{ marginTop: 16 }}>
          <h3>{editing.id ? "Edit Item" : "Create Item"}</h3>
          <form className="form" key={editing.id || "new-" + tab} onSubmit={handleSave}>
            {tab === "packages" && (
              <>
                <label>Type<select name="type" defaultValue={editing.type || "READY"}><option value="READY">READY</option><option value="UPCOMING">UPCOMING</option></select></label>
                <label>Name<input name="name" required defaultValue={editing.name || ""} /></label>
                <label>Badge<input name="badge" defaultValue={editing.badge || ""} /></label>
                <label>Days<input name="days" required defaultValue={editing.days || ""} /></label>
                <label>Persons<input name="persons" required defaultValue={editing.persons || ""} /></label>
                <label>Place<input name="place" required defaultValue={editing.place || ""} /></label>
                <label>Price (BDT)<input name="price" type="number" min="0" required defaultValue={editing.price ?? ""} /></label>
                <label>Rating (0-5)<input name="rating" type="number" step="0.1" min="0" max="5" defaultValue={editing.rating ?? 5} /></label>
                <label>Reviews<input name="reviews" type="number" min="0" defaultValue={editing.reviews ?? 0} /></label>
                <label>Image URL<input name="imageUrl" required defaultValue={editing.imageUrl || "/images/thailand.jpg"} /></label>
                <label>Start Date (Upcoming)<input name="startDate" defaultValue={editing.startDate || ""} /></label>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}><input name="active" type="checkbox" defaultChecked={editing.active !== false} style={{ width: "auto" }} /> Active</label>
              </>
            )}
            {tab === "flights" && (
              <>
                <label>Airline<input name="airline" required defaultValue={editing.airline || ""} /></label>
                <label>From<input name="fromCity" required defaultValue={editing.fromCity || "DAC"} /></label>
                <label>To<input name="toCity" required defaultValue={editing.toCity || "DXB"} /></label>
                <label>Depart<input name="departTime" required defaultValue={editing.departTime || ""} /></label>
                <label>Arrive<input name="arriveTime" required defaultValue={editing.arriveTime || ""} /></label>
                <label>Duration<input name="duration" required defaultValue={editing.duration || ""} /></label>
                <label>Stops<select name="stops" defaultValue={editing.stops || "DIRECT"}><option value="DIRECT">DIRECT</option><option value="ONE_STOP">ONE_STOP</option></select></label>
                <label>Price (BDT)<input name="price" type="number" min="0" required defaultValue={editing.price ?? ""} /></label>
                <label>Date<input name="date" required defaultValue={editing.date || ""} /></label>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}><input name="active" type="checkbox" defaultChecked={editing.active !== false} style={{ width: "auto" }} /> Active</label>
              </>
            )}
            {tab === "hotels" && (
              <>
                <label>Name<input name="name" required defaultValue={editing.name || ""} /></label>
                <label>City<input name="city" required defaultValue={editing.city || ""} /></label>
                <label>Stars (1-5)<input name="stars" type="number" min="1" max="5" required defaultValue={editing.stars ?? 5} /></label>
                <label>Price/Night (BDT)<input name="pricePerNight" type="number" min="0" required defaultValue={editing.pricePerNight ?? ""} /></label>
                <label>Image URL<input name="imageUrl" required defaultValue={editing.imageUrl || "/images/hotel1.jpg"} /></label>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}><input name="active" type="checkbox" defaultChecked={editing.active !== false} style={{ width: "auto" }} /> Active</label>
              </>
            )}
            {tab === "destinations" && (
              <>
                <label>Name<input name="name" required defaultValue={editing.name || ""} /></label>
                <label>Country<input name="country" required defaultValue={editing.country || ""} /></label>
                <label>Price (BDT)<input name="price" type="number" min="0" required defaultValue={editing.price ?? ""} /></label>
                <label>Image URL<input name="imageUrl" required defaultValue={editing.imageUrl || "/images/maldives.jpg"} /></label>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}><input name="active" type="checkbox" defaultChecked={editing.active !== false} style={{ width: "auto" }} /> Active</label>
              </>
            )}
            <div className="wide" style={{ display: "flex", gap: 10 }}>
              <button className="btn">Save</button>
              <button type="button" className="btn ghost" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
