import { useEffect, useRef, useState, type FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  onSelectCustomerReceipt: () => void
  onClose: () => void
}

const ICON_BASE = `${import.meta.env.BASE_URL}icons/`

const NAV_ITEMS = [
  'Settings',
  'Online Ordering',
  'App Ordering',
  'Rooms',
  'Custom Tender',
  'Paid In & Out Types',
  'Payout Apportins',
  'Tip Out Types',
  'Dayparts',
  'Payment gateway',
  'Staff',
  'Job Types',
  'Labor Categories',
  'Scheduled Shifts',
  'Permissions',
  'Report Access',
  'Break Types',
  'Time Punches',
  'Clock In Messages',
  'Authorized Devices',
  'Payment Terminals',
  'Printers',
  'Display Formats',
]

const MENU_ITEMS = [
  'Items',
  'Sections',
  'Groups',
  'Sizes',
  'Attributes / Tags',
  'Kitchen Groups',
  'Report Categories',
  'Modifiers',
  'Ingredients',
  'Context Items',
  'Taxes',
  'Pricing Rules',
  'Discounts / Promotions',
  'Service Charges / Fees',
  'Void Reasons',
  'Upsell Profiles',
  'Upsell Groups',
]

const LeftNav: FC<Props> = ({ onSelectCustomerReceipt, onClose }) => {
  const selectedItemRef = useRef<HTMLDivElement | null>(null)
  const [isLocationSetupExpanded, setIsLocationSetupExpanded] = useState(true)
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)

  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* White nav panel */}
      <div
        style={{
          flex: 1,
          background: '#FCFCFC',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <StatusBar />

        <div className="left-nav-scroll" style={{ overflowY: 'auto', paddingTop: 8 }}>
          {/* Account header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1.5px solid #ABC6D8',
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 20, color: '#04041C' }}>
              Redwood Account
            </span>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="#262AFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Account Info */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <img
              src={`${ICON_BASE}account%20info.svg`}
              alt="Account info"
              style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0 }}
            />
            <span
              style={{ color: '#04041C', fontSize: 16, fontWeight: 500 }}
            >
              Account Info
            </span>
          </div>

          {/* Location Setup section */}
          <div style={{ padding: '16px 16px 16px 16px' }}>
            <div
              onClick={() => {
                const nextExpanded = !isLocationSetupExpanded
                setIsLocationSetupExpanded(nextExpanded)
                if (nextExpanded) {
                  setIsMenuExpanded(false)
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3.5 3.5v9M6.7 3.5v9" stroke="#6B747D" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M10.3 4.4l.8.8m2-2L9.1 7.2m2 2l1.2 1.2m-2-1.2-1.2 1.2" stroke="#6B747D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  style={{ fontWeight: 500, fontSize: 16, color: '#04041C' }}
                >
                  Location Setup
                </span>
              </div>
              <img
                src={`${ICON_BASE}collcapsearrow.svg`}
                alt="Collapse"
                style={{
                  width: 16,
                  height: 16,
                  objectFit: 'contain',
                  flexShrink: 0,
                  transform: isLocationSetupExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              />
            </div>

            {isLocationSetupExpanded && (
              <>
                {/* Sub-items */}
                {NAV_ITEMS.map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: '10px 8px 10px 28px',
                      color: '#1D2030',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </div>
                ))}

                {/* Customer Receipt — selected */}
                <div
                  ref={selectedItemRef}
                  onClick={onSelectCustomerReceipt}
                  style={{
                    padding: '10px 12px 10px 28px',
                    fontSize: 16,
                    fontWeight: 500,
                    background: 'rgba(0, 151, 255, 0.3)',
                    color: 'black',
                    borderRadius: 6,
                    cursor: 'pointer',
                    marginTop: 2,
                  }}
                >
                  Customer Receipt
                </div>
              </>
            )}

            <div
              onClick={() => {
                const nextExpanded = !isMenuExpanded
                setIsMenuExpanded(nextExpanded)
                if (nextExpanded) {
                  setIsLocationSetupExpanded(false)
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0',
                marginTop: 16,
                marginBottom: 16,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img
                  src={`${ICON_BASE}location%20setup.svg`}
                  alt="Menu"
                  style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0 }}
                />
                <span style={{ color: '#04041C', fontSize: 16, fontWeight: 500 }}>Menu</span>
              </div>
              <img
                src={`${ICON_BASE}collcapsearrow.svg`}
                alt="Collapse"
                style={{
                  width: 16,
                  height: 16,
                  objectFit: 'contain',
                  flexShrink: 0,
                  transform: isMenuExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              />
            </div>

            {isMenuExpanded && (
              <div style={{ paddingLeft: 28 }}>
                {MENU_ITEMS.map((item) => (
                  <div
                    key={item}
                    style={{
                      minHeight: 40,
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#1D2030',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dark overlay strip simulating main content behind */}
      <div
        onClick={onClose}
        aria-label="Close navigation"
        style={{
          width: 52,
          background: '#121227',
          opacity: 0.88,
          flexShrink: 0,
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

export default LeftNav
