"use client";import {useEffect,useState} from "react";import {usePathname} from "next/navigation";import Link from "next/link";
export default function AdminGate({children}){const p=usePathname();const[ok,setOk]=useState(null);useEffect(()=>{setOk(sessionStorage.getItem("sv_admin")==="1")},[p]);
if(p==="/admin/login")return children; if(ok===null)return <div className="panel">Checking admin session...</div>;
if(!ok)return(<div className="panel"><h2>Admin Login Required</h2><p className="muted">Demo credentials — Email: <b>admin@skyvoyage.com</b> · Password: <b>admin123</b> (frontend demo only; real secure login comes with the backend).</p><Link className="btn" href="/admin/login">Go to Admin Login</Link></div>);
return children}
