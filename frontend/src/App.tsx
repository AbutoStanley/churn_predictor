import { Routes, Route } from "react-router-dom"
import Predict from "./pages/Predict"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Predict />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  )
}

export default App