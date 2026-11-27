import QueryForm from "../../components/QueryForm";

const steps = [
  ["1", "Send Visa Query", "Tell us your destination, travel date, and visa type."],
  ["2", "Receive Checklist", "Our team emails and WhatsApps the exact document checklist."],
  ["3", "Submit & Track", "We review your file and guide you through submission."],
];

const countries = [
  ["🇦🇪", "UAE / Dubai", "Tourist & Transit Visa"],
  ["🇹🇭", "Thailand", "Single & Multiple Entry"],
  ["🇸🇬", "Singapore", "Tourist & Business Visa"],
  ["🇲🇾", "Malaysia", "e-Visa & Sticker Visa"],
  ["🇬🇧", "United Kingdom", "Standard Visitor Visa"],
  ["🇹🇷", "Turkey", "Tourist & Business Visa"],
];

export default function Visa() {
  return (
    <main className="wrap page">
      <div className="sechead" style={{ marginBottom: 6 }}>
        <h1 style={{ margin: 0 }}>Visa Services</h1>
      </div>
      <p className="sub">
        Tourist, business, and transit visa processing for UAE, Thailand, Singapore, Malaysia, UK,
        Turkey, and more. Send a query and our team will email the document checklist.
      </p>

      <div className="grid3" style={{ marginBottom: 24 }}>
        {steps.map((s) => (
          <div className="panel" key={s[0]} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span className="ticon" style={{ width: 36, height: 36, fontSize: 16 }}>
              {s[0]}
            </span>
            <div>
              <b style={{ display: "block", marginBottom: 4 }}>{s[1]}</b>
              <span className="muted">{s[2]}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="layout">
        <div>
          <div className="panel">
            <h3 style={{ marginTop: 0 }}>Popular Visa Destinations</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {countries.map((c) => (
                <div
                  key={c[1]}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderRadius: 10,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{c[0]}</span>
                  <div>
                    <b style={{ display: "block", fontSize: 14 }}>{c[1]}</b>
                    <span className="muted" style={{ fontSize: 12 }}>
                      {c[2]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 style={{ marginTop: 0 }}>Request Visa Assistance</h3>
          <QueryForm type="Visa" />
        </div>
      </div>
    </main>
  );
}
