import Link from "next/link";import {fmt} from "../../lib/data";
const stats=[["Total Bookings","128"],["Pending Queries","14"],["Revenue (Nov)",fmt(1845000)],["Packages Live","9"],["Invoices Issued","121"],["Registered Customers","342"]];
export default function Dashboard(){return(<div><h1 style={{marginTop:0}}>Dashboard</h1><div className="grid3">{stats.map(s=><div className="panel" key={s[0]}><div className="muted">{s[0]}</div><div style={{fontSize:28,fontWeight:800,color:"#c2410c"}}>{s[1]}</div></div>)}</div>
<div className="panel" style={{marginTop:18}}><h3>Latest Bookings</h3><div className="tablewrap"><table><thead><tr><th>ID</th><th>Customer</th><th>Item</th><th>Status</th><th>Total</th></tr></thead><tbody>
<tr><td>SV-1001</td><td>Demo Customer</td><td>DAC to DXB Flight</td><td>Confirmed</td><td>{fmt(32500)}</td></tr>
<tr><td>SV-1002</td><td>Demo Customer</td><td>Dubai Explorer Package</td><td>Requested</td><td>{fmt(68500)}</td></tr>
<tr><td>SV-1003</td><td>Rahim Uddin</td><td>Bangkok Holiday Package</td><td>Confirmed</td><td>{fmt(54900)}</td></tr></tbody></table></div>
<p className="muted">Demo data. Backend will load real bookings, queries and revenue here.</p><Link className="btn" href="/admin/bookings">Manage Bookings</Link></div></div>)}
