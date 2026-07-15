import type { FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  onSelectCustomerReceipt: () => void
}

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
]

const LeftNav: FC<Props> = ({ onSelectCustomerReceipt }) => {
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

        <div style={{ overflowY: 'auto', paddingTop: 8 }}>
          {/* Account header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1.5px solid #ABC6D8',
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 20, color: '#04041C' }}>
              Redwood Account
            </span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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
            }}
          >
            <span
              style={{ color: '#6B747D', fontSize: 16, fontWeight: 500 }}
            >
              Account Info
            </span>
          </div>

          {/* Location Setup section */}
          <div style={{ padding: '14px 16px 12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 6,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Fork & knife icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B747D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="3" x2="3" y2="21" />
                  <path d="M3 7h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3" />
                  <line x1="15" y1="3" x2="15" y2="21" />
                  <line x1="21" y1="3" x2="21" y2="12" />
                  <path d="M21 3a6 6 0 0 0-6 6v3h6" />
                </svg>
                <span
                  style={{ fontWeight: 500, fontSize: 16, color: '#04041C' }}
                >
                  Location Setup
                </span>
              </div>
              {/* Chevron up */}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 10l4-4 4 4"
                  stroke="#6B747D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Sub-items */}
            {NAV_ITEMS.map((item) => (
              <div
                key={item}
                style={{
                  padding: '10px 8px 10px 28px',
                  color: '#6B747D',
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {item}
              </div>
            ))}

            {/* Customer Receipt — selected */}
            <div
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
          </div>
        </div>
      </div>

      {/* Dark overlay strip simulating main content behind */}
      <div
        style={{
          width: 52,
          background: '#121227',
          opacity: 0.88,
          flexShrink: 0,
        }}
      />
    </div>
  )
}

export default LeftNav
