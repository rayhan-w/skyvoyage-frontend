export default function ASettings(){return(<div><h1 style={{marginTop:0}}>Settings</h1><form className="form" onSubmit={undefined}>
<label>Office Address (Location)<input defaultValue="Dhaka, Bangladesh"/></label>
<label>Phone / Hotline<input defaultValue="+880 9612 345678"/></label>
<label>Support Email<input defaultValue="support@skyvoyage.example"/></label>
<label>Booking Phone Number<input defaultValue="+880 1234 567890"/></label>
<label>WhatsApp Number<input defaultValue="+880 1234 567890"/></label>
<label className="wide">Privacy Policy Text<textarea rows="4" defaultValue="Draft legal text — replace with final policy."/></label>
<label className="wide">Terms & Conditions Text<textarea rows="4" defaultValue="Draft legal text — replace with final terms."/></label>
<label className="wide">Refund Policy Text<textarea rows="4" defaultValue="Draft legal text — replace with final refund policy."/></label>
<button className="btn wide">Save Settings (backend)</button></form></div>)}
