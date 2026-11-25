import Link from "next/link";import AdminGate from "../../components/AdminGate";
export default function AdminLayout({children}){return(<main className="wrap page"><div className="adminlayout">
<aside className="adminside"><h3 style={{marginTop:0}}>SkyVoyage Admin</h3>
<Link href="/admin">Dashboard</Link><Link href="/admin/bookings">Bookings</Link><Link href="/admin/queries">Queries / Enquiries</Link><Link href="/admin/packages">Packages</Link><Link href="/admin/invoices">Invoices</Link><Link href="/admin/settings">Settings</Link><Link href="/admin/login">Admin Login</Link><Link href="/">View Website</Link></aside>
<div className="adminmain"><AdminGate>{children}</AdminGate></div></div></main>)}
