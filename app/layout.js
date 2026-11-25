import "./globals.css";import Header from "../components/Header";import Footer from "../components/Footer";import RevealInit from "../components/RevealInit";
export const metadata={title:"SkyVoyage — Book Cheap Flight Tickets",description:"Find the best flight deals, hotels, packages and visa services."};
export default function Layout({children}){return(<html lang="en"><body><Header/>{children}<Footer/><RevealInit/></body></html>)}
