"use client";import {useState} from "react";import {saveItem} from "../lib/data";
export default function QueryForm({type="General",service=""}){const[done,setDone]=useState(false);
if(done)return <div className="success">Query received! Our team will reply by email and phone. Your query is now visible in the Admin Panel (Queries).</div>;
return(<form className="form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.target);saveItem("sv_queries",{id:"Q-"+Date.now().toString().slice(-5),name:f.get("name"),mobile:f.get("mobile"),email:f.get("email"),type:f.get("type"),message:(f.get("service")?"Service: "+f.get("service")+" — ":"")+(f.get("message")||""),status:"New",at:new Date().toLocaleString()});setDone(true)}}>
<label>Full Name<input name="name" required placeholder="Your name"/></label>
<label>Mobile<input name="mobile" required placeholder="01XXXXXXXXX"/></label><label>Email<input name="email" type="email" required placeholder="you@email.com"/></label>
<label>Query Type<select name="type" defaultValue={type}><option>Flights</option><option>Hotels</option><option>Ready Package</option><option>Upcoming Package</option><option>Custom Package</option><option>Visa</option><option>General</option></select></label>
<label className="wide">Service / Package<input name="service" defaultValue={service} placeholder="e.g. Bangkok & Pattaya Tour"/></label>
<label className="wide">Your Message<textarea name="message" required rows="4" placeholder="Write your query in detail..."/></label>
<button className="btn wide">Send Query</button></form>)}
