import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomerReceiptApp from './apps/CustomerReceiptApp'
import AppOrderingApp from './apps/AppOrderingApp'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerReceiptApp />} />
        <Route path="/app-ordering" element={<AppOrderingApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
