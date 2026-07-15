import { HashRouter, Routes, Route } from 'react-router-dom'
import CustomerReceiptApp from './apps/CustomerReceiptApp'
import AppOrderingApp from './apps/AppOrderingApp'
import './App.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CustomerReceiptApp />} />
        <Route path="/app-ordering" element={<AppOrderingApp />} />
      </Routes>
    </HashRouter>
  )
}

export default App
