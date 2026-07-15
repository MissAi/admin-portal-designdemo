import type { FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  saveAllEnabled: boolean
  onDisplayClick: () => void
  onBodyClick: () => void
  onHeaderFooterClick: () => void
  onEmailReceiptsClick: () => void
  onHamburgerClick: () => void
}

const ITEMS = [
  { label: 'Display', tappable: true },
  { label: 'Body', tappable: true },
  { label: 'Header & Footer Lines', tappable: true },
  { label: 'E-Mail Receipts', tappable: true },
]

const CustomerReceiptList: FC<Props> = ({
  saveAllEnabled,
  onDisplayClick,
  onBodyClick,
  onHeaderFooterClick,
  onEmailReceiptsClick,
  onHamburgerClick,
}) => {
  function handleItemClick(label: string) {
    if (label === 'Display') onDisplayClick()
    if (label === 'Body') onBodyClick()
    if (label === 'Header & Footer Lines') onHeaderFooterClick()
    if (label === 'E-Mail Receipts') onEmailReceiptsClick()
  }

  return (
    <div
      style={{
        height: '100%',
        background: '#f2f2f7',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StatusBar />

      {/* App header */}
      <div
        style={{
          background: '#f2f2f7',
          padding: '10px 16px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onHamburgerClick}
          style={{
            border: '1px solid #abc6d8',
            background: 'white ',
            fontSize: 22,
            cursor: 'pointer',
            padding: ' 8px 12px',
            borderRadius: 20,
            lineHeight: 1,
            color: '#04041C',
          }}
        >
          ≡
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 20, color: '#04041C' }}>
              Redwood Grill 1
            </span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="#04041C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#6B747D', marginTop: 1 }}>
            Location Setup
          </div>
        </div>
        {/* Utility icons */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img
            src="/icons/Publish.svg"
            alt="Publish"
            style={{ width: 44, height: 44, objectFit: 'contain' }}
          />
          <img
            src="/icons/info.svg"
            alt="Info"
            style={{ width: 44, height: 44, objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Section header row */}
      <div
        style={{
          background: '#f2f2f7',
          padding: '16px 16px 8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
          flexShrink: 0,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 18, color: '#04041C' }}>
          Customer Receipt
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#262AFF', fontSize: 18, fontWeight: 800, letterSpacing: 1 }}>
            ···
          </span>
          <button
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: 'none',
              fontWeight: 700,
              fontSize: 16,
              fontFamily: 'inherit',
              background: saveAllEnabled ? '#262AFF' : '#E0E0E0',
              color: saveAllEnabled ? 'white' : '#9E9E9E',
              cursor: saveAllEnabled ? 'pointer' : 'not-allowed',
              transition: 'background 0.25s, color 0.25s',
            }}
          >
            Save All
          </button>
        </div>
      </div>

      {/* Items list */}
      <div style={{ background: 'white', flexShrink: 0 }}>
        {ITEMS.map((item, i) => (
          <div
            key={item.label}
            onClick={() => handleItemClick(item.label)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '24px 24px',
              borderBottom:
                i < ITEMS.length - 1 ? '1px solid #e5e5ea' : 'none',
              cursor: item.tappable ? 'pointer' : 'default',
              background: 'white',
            }}
          >
            {/* Info circle icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ marginRight: 12, flexShrink: 0 }}
            >
              <circle
                cx="10"
                cy="10"
                r="8.5"
                stroke="#262AFF"
                strokeWidth="1.5"
              />
              <path
                d="M10 9.5v4.5"
                stroke="#262AFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="10" cy="7" r="0.8" fill="#262AFF" />
            </svg>
            <span
              style={{
                flex: 1,
                fontWeight: 700,
                fontSize: 16,
                color: '#04041C',
              }}
            >
              {item.label}
            </span>
            {/* Chevron right */}
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path
                d="M2 2l6 6-6 6"
                stroke="#C7C7CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerReceiptList
