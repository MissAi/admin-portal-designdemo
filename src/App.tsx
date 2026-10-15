import { HashRouter, Routes, Route } from 'react-router-dom'
import CustomerReceiptApp from './apps/CustomerReceiptApp'
import AppOrderingApp from './apps/AppOrderingApp'
import CustomerReceiptDesktopApp from './apps/desktop/CustomerReceiptDesktopApp'
import AccountPermissionsApp, { AccountPermissionsMobileApp } from './apps/desktop/AccountPermissionsApp'
import ResponsiveButtonsDemo from './apps/desktop/ResponsiveButtonsDemo'
import ResponsiveDesktopRoute from './components/ResponsiveDesktopRoute'
import './App.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CustomerReceiptApp />} />
        <Route path="/app-ordering" element={<AppOrderingApp />} />
        <Route
          path="/d/customer-receipt"
          element={<ResponsiveDesktopRoute desktop={<CustomerReceiptDesktopApp />} mobile={<CustomerReceiptApp />} />}
        />
        <Route
          path="/d/ResponsiveButtonsDemo"
          element={<ResponsiveDesktopRoute desktop={<ResponsiveButtonsDemo />} mobile={<CustomerReceiptApp />} />}
        />
        <Route
          path="/d/account-permissions"
          element={<ResponsiveDesktopRoute desktop={<AccountPermissionsApp />} mobile={<AccountPermissionsMobileApp />} />}
        />
        <Route
          path="/d/account-permissions/:permissionId"
          element={<ResponsiveDesktopRoute desktop={<AccountPermissionsApp />} mobile={<AccountPermissionsMobileApp />} />}
        />
      </Routes>
    </HashRouter>
  )
}

export default App
