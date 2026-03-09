import { useState } from "react"

interface Props { addCustomer: (customer: any) => void }

const internetAddon = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }, { label: "No Internet Service", value: "No internet service" }]
const phoneAddon    = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }, { label: "No Phone Service", value: "No phone service" }]

const FIELDS: any[] = [
  { name: "gender",          label: "Gender",            type: "select", options: [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }] },
  { name: "SeniorCitizen",   label: "Senior Citizen",    type: "select", options: [{ label: "No", value: 0 }, { label: "Yes", value: 1 }] },
  { name: "Partner",         label: "Partner",           type: "select", options: [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }] },
  { name: "Dependents",      label: "Dependents",        type: "select", options: [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }] },
  { name: "tenure",          label: "Tenure (months)",   type: "number" },
  { name: "Contract",        label: "Contract",          type: "select", options: [{ label: "Month-to-month", value: "Month-to-month" }, { label: "One year", value: "One year" }, { label: "Two year", value: "Two year" }] },
  { name: "PaymentMethod",   label: "Payment Method",    type: "select", options: [{ label: "Electronic check", value: "Electronic check" }, { label: "Mailed check", value: "Mailed check" }, { label: "Bank transfer", value: "Bank transfer (automatic)" }, { label: "Credit card", value: "Credit card (automatic)" }] },
  { name: "PaperlessBilling",label: "Paperless Billing", type: "select", options: [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }] },
  { name: "MonthlyCharges",  label: "Monthly Charges ($)",type: "number" },
  { name: "TotalCharges",    label: "Total Charges ($)", type: "number" },
  { name: "PhoneService",    label: "Phone Service",     type: "select", options: [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }] },
  { name: "MultipleLines",   label: "Multiple Lines",    type: "select", options: phoneAddon },
  { name: "InternetService", label: "Internet Service",  type: "select", options: [{ label: "Fiber optic", value: "Fiber optic" }, { label: "DSL", value: "DSL" }, { label: "No internet", value: "No" }] },
  { name: "OnlineSecurity",  label: "Online Security",   type: "select", options: internetAddon },
  { name: "OnlineBackup",    label: "Online Backup",     type: "select", options: internetAddon },
  { name: "DeviceProtection",label: "Device Protection", type: "select", options: internetAddon },
  { name: "TechSupport",     label: "Tech Support",      type: "select", options: internetAddon },
  { name: "StreamingTV",     label: "Streaming TV",      type: "select", options: internetAddon },
  { name: "StreamingMovies", label: "Streaming Movies",  type: "select", options: internetAddon },
]

const SECTIONS = [
  { title: "Demographics", fields: ["gender", "SeniorCitizen", "Partner", "Dependents"] },
  { title: "Account",      fields: ["tenure", "Contract", "PaymentMethod", "PaperlessBilling"] },
  { title: "Charges",      fields: ["MonthlyCharges", "TotalCharges"] },
  { title: "Services",     fields: ["PhoneService", "MultipleLines", "InternetService", "OnlineSecurity", "OnlineBackup", "DeviceProtection", "TechSupport", "StreamingTV", "StreamingMovies"] },
]

const DEFAULTS: any = {
  gender: "Male", SeniorCitizen: 0, Partner: "No", Dependents: "No",
  tenure: 12, PhoneService: "Yes", MultipleLines: "No", InternetService: "Fiber optic",
  OnlineSecurity: "No", OnlineBackup: "No", DeviceProtection: "No", TechSupport: "No",
  StreamingTV: "No", StreamingMovies: "No", Contract: "Month-to-month",
  PaperlessBilling: "Yes", PaymentMethod: "Electronic check", MonthlyCharges: 70, TotalCharges: 800
}

const NUMERIC = ["SeniorCitizen", "tenure", "MonthlyCharges", "TotalCharges"]

export default function PredictionForm({ addCustomer }: Props) {
  const [formData, setFormData] = useState(DEFAULTS)
  const fieldMap = Object.fromEntries(FIELDS.map(f => [f.name, f]))

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: NUMERIC.includes(name) ? Number(value) : value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    addCustomer(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, color: "var(--text)" }}>Customer Details</h2>

      {SECTIONS.map((section, si) => (
        <div key={section.title} style={{ marginBottom: 24 }}>
          {si > 0 && <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 20 }} />}
          <p className="section-title">{section.title}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px" }}>
            {section.fields.map(name => {
              const field = fieldMap[name]
              return (
                <div key={name}>
                  <label className="field-label">{field.label}</label>
                  {field.type === "select" ? (
                    <select name={name} value={formData[name]} onChange={handleChange} className="field-input">
                      {field.options.map(({ label, value }: any) => (
                        <option key={String(value)} value={value}>{label}</option>
                      ))}
                    </select>
                  ) : (
                    <input name={name} type="number" min={0} value={formData[name]} onChange={handleChange} className="field-input" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <button type="submit" className="btn-primary" style={{ marginTop: 6 }}>
        + Add to Queue
      </button>
    </form>
  )
}