"use client";import {useState} from "react";import {useRouter} from "next/navigation";
const TABS=[["package","Tour Package","/packages"],["flight","Flight","/flights"],["hotel","Hotel","/hotels"],["visa","Visa","/visa"]];
export default function SearchWidget(){const[tab,setTab]=useState("package");const r=useRouter();const dest=tab==="flight"?["Dubai","Bangkok","Singapore","Kuala Lumpur","London","Istanbul"]:["Thailand","Maldives","Dubai","Singapore","Bali","Japan"];
return(<div className="searchcard"><div className="tabs">{TABS.map(t=><button key={t[0]} type="button" className={tab===t[0]?"tab on":"tab"} onClick={()=>setTab(t[0])}>{t[1]}</button>)}</div>
<form key={tab} className="searchrow" onSubmit={e=>{e.preventDefault();r.push(TABS.find(t=>t[0]===tab)[2])}}>
<label>Destination<select>{dest.map(x=><option key={x}>{x}</option>)}</select></label>
<label>Travel Date<input type="date"/></label>
<label>Guests<select><option>1 Person</option><option>2 Persons</option><option>3 Persons</option><option>4+ Persons</option></select></label>
<button className="btn searchbtn">Search</button></form></div>)}
