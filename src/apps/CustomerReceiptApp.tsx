import { useState } from 'react'
import LeftNav from '../screens/LeftNav'
import CustomerReceiptList from '../screens/CustomerReceiptList'
import BodySettings from '../screens/BodySettings'
import EmailReceipts from '../screens/EmailReceipts'
import DisplaySettings from '../screens/DisplaySettings'
import HeaderFooterLines from '../screens/HeaderFooterLines'
import LogoImagePicker from '../screens/LogoImagePicker'
import HomeBar from '../components/HomeBar'
import '../App.css'

type Screen =
  | 'left-nav'
  | 'receipt-list'
  | 'body'
  | 'display'
  | 'logo-image-picker'
  | 'header-footer'
  | 'email-receipts'

export default function CustomerReceiptApp() {
  const [screen, setScreen] = useState<Screen>('left-nav')
  const [saveAllEnabled, setSaveAllEnabled] = useState(false)
  const [showAuditTrail, setShowAuditTrail] = useState(false)
  const [selectedLogoUrl, setSelectedLogoUrl] = useState<string | null>(null)

  return (
    <div className="phone-shell">
      {screen === 'left-nav' && (
        <LeftNav
          onSelectCustomerReceipt={() => setScreen('receipt-list')}
        />
      )}
      {screen === 'receipt-list' && (
        <CustomerReceiptList
          saveAllEnabled={saveAllEnabled}
          showAuditTrail={showAuditTrail}
          onSaveAll={() => {
            setSaveAllEnabled(false)
            setShowAuditTrail(true)
          }}
          onOpenAuditTrail={() => {
            // Placeholder action for prototype menu interaction.
          }}
          onDiscardChanges={() => {
            setSelectedLogoUrl(null)
            setSaveAllEnabled(false)
          }}
          onDisplayClick={() => setScreen('display')}
          onBodyClick={() => setScreen('body')}
          onHeaderFooterClick={() => setScreen('header-footer')}
          onEmailReceiptsClick={() => setScreen('email-receipts')}
          onHamburgerClick={() => setScreen('left-nav')}
        />
      )}
      {screen === 'body' && (
        <BodySettings onBack={() => setScreen('receipt-list')} />
      )}
      {screen === 'display' && (
        <DisplaySettings
          logoUrl={selectedLogoUrl}
          onOpenLogoPicker={() => setScreen('logo-image-picker')}
          onBack={() => {
            setSaveAllEnabled(true)
            setScreen('receipt-list')
          }}
        />
      )}
      {screen === 'logo-image-picker' && (
        <LogoImagePicker
          onBack={() => setScreen('display')}
          onConfirm={(logoUrl) => {
            setSelectedLogoUrl(logoUrl)
            setScreen('display')
          }}
        />
      )}
      {screen === 'header-footer' && (
        <HeaderFooterLines onBack={() => setScreen('receipt-list')} />
      )}
      {screen === 'email-receipts' && (
        <EmailReceipts onBack={() => setScreen('receipt-list')} />
      )}
      <HomeBar />
    </div>
  )
}
