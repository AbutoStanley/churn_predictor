import React, { useRef, useState } from "react"

interface Props {
  onCustomers: (customers: any[]) => void
}

const REQUIRED_COLS = [
  "gender","SeniorCitizen","Partner","Dependents","tenure","PhoneService",
  "MultipleLines","InternetService","OnlineSecurity","OnlineBackup",
  "DeviceProtection","TechSupport","StreamingTV","StreamingMovies",
  "Contract","PaperlessBilling","PaymentMethod","MonthlyCharges","TotalCharges"
]

const NUMERIC_COLS = ["SeniorCitizen","tenure","MonthlyCharges","TotalCharges"]

function parseCSV(text: string): any[] {
  const lines = text.trim().split(/\r?\n/)
  const headers = lines[0].split(",").map(h => h.trim())

  return lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.trim())
    const row: any = {}
    headers.forEach((h, i) => {
      row[h] = NUMERIC_COLS.includes(h) ? Number(values[i]) : values[i]
    })
    return row
  })
}

const CSVUploader: React.FC<Props> = ({ onCustomers }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setStatus("idle")
    setMessage("")

    const reader = new FileReader()

    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string
        const rows = parseCSV(text)

        if (rows.length === 0) {
          setStatus("error")
          setMessage("CSV is empty.")
          return
        }

        // Validate columns
        const missing = REQUIRED_COLS.filter(c => !(c in rows[0]))
        if (missing.length > 0) {
          setStatus("error")
          setMessage(`Missing columns: ${missing.join(", ")}`)
          return
        }

        if (rows.length > 10) {
          setStatus("error")
          setMessage(`CSV has ${rows.length} rows — max 10 allowed. Trim the file and try again.`)
          return
        }

        onCustomers(rows)
        setStatus("ok")
        setMessage(`${rows.length} customer${rows.length !== 1 ? "s" : ""} loaded into queue.`)

        // Reset input so same file can be re-uploaded
        if (inputRef.current) inputRef.current.value = ""

      } catch {
        setStatus("error")
        setMessage("Failed to parse CSV. Check the file format.")
      }
    }

    reader.readAsText(file)
  }

  return (
    <div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 14px",
          background: "var(--surface2)",
          border: "1px dashed var(--border2)",
          borderRadius: 6,
          cursor: "pointer",
          transition: "border-color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border2)")}
      >
        <span style={{ fontSize: 16 }}>📂</span>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)"
        }}>
          Choose CSV file
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </label>

      {message && (
        <div style={{
          marginTop: 10,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.06em",
          color: status === "ok" ? "var(--low)" : "var(--high)",
          padding: "7px 12px",
          background: status === "ok" ? "rgba(92,184,122,0.07)" : "rgba(217,95,75,0.07)",
          border: `1px solid ${status === "ok" ? "rgba(92,184,122,0.2)" : "rgba(217,95,75,0.2)"}`,
          borderRadius: 5
        }}>
          {status === "ok" ? "✓ " : "✗ "}{message}
        </div>
      )}
    </div>
  )
}

export default CSVUploader