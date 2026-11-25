export const destinations=[
 {name:"Maldives",country:"Indian Ocean",price:65000,img:"/images/maldives.jpg"},
 {name:"Thailand",country:"Bangkok & Pattaya",price:25000,img:"/images/thailand.jpg"},
 {name:"Dubai",country:"UAE",price:32500,img:"/images/dubai.jpg"},
 {name:"Singapore",country:"Singapore",price:35000,img:"/images/singapore.jpg"},
 {name:"Switzerland",country:"Europe",price:145000,img:"/images/switzerland.jpg"},
 {name:"Bali",country:"Indonesia",price:55000,img:"/images/bali.jpg"}];
export const flights=[
 {id:1,airline:"Biman Bangladesh Airlines",code:"BG",from:"DAC",to:"DXB",depart:"10:20",arrive:"14:30",date:"Fri, 12 Nov",duration:"4h 10m",stops:"Direct",price:32500,cls:"Economy"},
 {id:2,airline:"Emirates",code:"EK",from:"DAC",to:"DXB",depart:"23:15",arrive:"06:35",date:"Sat, 13 Nov",duration:"2h 20m",stops:"1 Stop (DXB)",price:41200,cls:"Economy"},
 {id:3,airline:"Qatar Airways",code:"QR",from:"DAC",to:"DXB",depart:"17:40",arrive:"01:30",date:"Sat, 13 Nov",duration:"5h 50m",stops:"1 Stop (DOH)",price:45600,cls:"Economy"},
 {id:4,airline:"Turkish Airlines",code:"TK",from:"DAC",to:"DXB",depart:"08:55",arrive:"16:30",date:"Fri, 12 Nov",duration:"6h 35m",stops:"1 Stop (IST)",price:44800,cls:"Economy"}];
export const hotels=[
 {name:"Burj Al Arab Jumeirah",city:"Dubai, UAE",stars:5,price:18500,img:"/images/hotel1.jpg"},
 {name:"Marina Bay Sands",city:"Singapore",stars:5,price:22000,img:"/images/hotel2.jpg"},
 {name:"Grand Palace Hotel",city:"Bangkok, Thailand",stars:4,price:8500,img:"/images/hotel3.jpg"},
 {name:"The Ritz London",city:"London, UK",stars:5,price:25000,img:"/images/hotel4.jpg"}];
export const readyPackages=[
 {name:"Bangkok & Pattaya Tour",days:"5 Days",persons:"2-6 Person",place:"Thailand",price:25000,rating:"4.9",reviews:120,img:"/images/thailand.jpg",badge:"Popular"},
 {name:"Maldives Luxury Escape",days:"4 Days",persons:"2 Person",place:"Maldives",price:65000,rating:"4.8",reviews:86,img:"/images/maldives.jpg",badge:"Trending"},
 {name:"Dubai Explorer",days:"5 Days",persons:"2-4 Person",place:"UAE",price:68500,rating:"4.9",reviews:210,img:"/images/dubai.jpg",badge:"Best Seller"}];
export const upcomingPackages=[
 {name:"Japan Cherry Blossom Tour",days:"7 Days",persons:"2-8 Person",place:"Japan",price:32000,rating:"5.0",reviews:85,img:"/images/japan.jpg",date:"Apr 15, 2026",badge:"Upcoming"},
 {name:"Europe Highlights",days:"10 Days",persons:"2-10 Person",place:"Switzerland",price:149500,rating:"4.9",reviews:64,img:"/images/switzerland.jpg",date:"May 20, 2026",badge:"Upcoming"},
 {name:"Bali Adventure",days:"6 Days",persons:"2-6 Person",place:"Indonesia",price:55000,rating:"4.8",reviews:92,img:"/images/bali.jpg",date:"Jun 12, 2026",badge:"Upcoming"}];
export const fmt=n=>"৳ "+Number(n).toLocaleString("en-IN");

export const allFlights=[
 ...flights,
 {id:5,airline:"AirAsia",code:"AK",from:"DAC",to:"KUL",depart:"09:30",arrive:"15:20",date:"Fri, 12 Nov",duration:"3h 50m",stops:"Direct",price:28900,cls:"Economy"},
 {id:6,airline:"Singapore Airlines",code:"SQ",from:"DAC",to:"SIN",depart:"13:05",arrive:"21:40",date:"Fri, 12 Nov",duration:"6h 35m",stops:"1 Stop (BKK)",price:39400,cls:"Economy"},
 {id:7,airline:"Saudia",code:"SV",from:"DAC",to:"DXB",depart:"19:25",arrive:"04:10",date:"Sat, 13 Nov",duration:"7h 45m",stops:"1 Stop (RUH)",price:38900,cls:"Economy"},
 {id:8,airline:"US-Bangla Airlines",code:"BS",from:"DAC",to:"BKK",depart:"11:15",arrive:"14:45",date:"Fri, 12 Nov",duration:"2h 30m",stops:"Direct",price:26500,cls:"Economy"}];
export const saveItem=(k,v)=>{try{const a=JSON.parse(localStorage.getItem(k)||"[]");a.unshift(v);localStorage.setItem(k,JSON.stringify(a))}catch(e){}};
export const readItems=k=>{try{return JSON.parse(localStorage.getItem(k)||"[]")}catch(e){return[]}};

export const PHONE="+880 1234 567890";export const PHONE_TEL="tel:+8801234567890";export const WA="https://wa.me/8801234567890";export const EMAIL="info@skyvoyage.com";
