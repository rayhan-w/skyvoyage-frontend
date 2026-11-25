"use client";import {useEffect} from "react";
export default function RevealInit(){useEffect(()=>{const els=[...document.querySelectorAll(".section,.pkgcard,.destcard,.why3>div,.testi,.offer3,.newsbar,.card,.flight,.panel,.trust>div,.stat,.fcol")];if(!("IntersectionObserver" in window)){return}
els.forEach(el=>{el.setAttribute("data-rv","");const sibs=[...el.parentElement.children].filter(c=>c.hasAttribute&&els.includes(c));el.style.transitionDelay=Math.min(sibs.indexOf(el)*70,350)+"ms"});
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("vis");io.unobserve(e.target)}})},{threshold:.08});
els.forEach(el=>io.observe(el));return ()=>io.disconnect()},[]);return null}
