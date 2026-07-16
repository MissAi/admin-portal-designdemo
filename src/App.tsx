import { HashRouter, Routes, Route } from 'react-router-dom'
import CustomerReceiptApp from './apps/CustomerReceiptApp'
import AppOrderingApp from './apps/AppOrderingApp'
import ResponsiveButtonsDemo from './apps/desktop/ResponsiveButtonsDemo'
import './App.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CustomerReceiptApp />} />
        <Route path="/app-ordering" element={<AppOrderingApp />} />
        <Route path="/d/ResponsiveButtonsDemo" element={<ResponsiveButtonsDemo />} />
      </Routes>
    </HashRouter>
  )
}

export default App
