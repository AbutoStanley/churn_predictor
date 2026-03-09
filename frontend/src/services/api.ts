const API_URL = "http://localhost:8000"

export async function predictChurn(customers: any[]) {

  const response = await fetch(`${API_URL}/predict/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(customers)
  })

  if (!response.ok) {
    throw new Error("Prediction request failed")
  }

  return response.json()
}

export const uploadCSV = async (file: File) => {

  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("http://127.0.0.1:8000/predict-csv", {
    method: "POST",
    body: formData
  })

  return res.json()
}