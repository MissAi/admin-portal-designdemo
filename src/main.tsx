import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@globalpayments/vega/style/vega.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
