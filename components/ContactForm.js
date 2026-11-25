"use client";import {Suspense} from "react";import {useSearchParams} from "next/navigation";import QueryForm from "./QueryForm";
function Inner(){const sp=useSearchParams();return <QueryForm type="General" service={sp.get("service")||""}/>}
export default function ContactForm(){return(<Suspense><Inner/></Suspense>)}
