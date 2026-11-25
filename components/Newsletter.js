"use client";import {useState} from "react";
export default function Newsletter(){const[done,setDone]=useState(false);
return(<section className="newsbar"><div className="wrap newsin"><div><h3>Subscribe to Our Newsletter</h3><p>Get the latest travel deals and updates.</p></div>
{done?<b>Subscribed! Welcome to SkyVoyage deals.</b>:<form className="newsform" onSubmit={e=>{e.preventDefault();setDone(true)}}><input type="email" required placeholder="Your Email Address"/><button className="btn" style={{background:"#ffb300",color:"#17335c"}}>Subscribe</button></form>}
<div className="touch"><b>Get in Touch</b><span>Dhaka, Bangladesh</span><span>+880 1234 567890</span><span>info@skyvoyage.com</span></div></div></section>)}
