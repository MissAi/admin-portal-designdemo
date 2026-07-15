import { useEffect, useRef, useState, type FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  saveAllEnabled: boolean
  showAuditTrail: boolean
  onSaveAll: () => void
  onOpenAuditTrail: () => void
  onDiscardChanges: () => void
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

const ICON_VERSION = '20260715-1710'

const CustomerReceiptList: FC<Props> = ({
  saveAllEnabled,
  showAuditTrail,
  onSaveAll,
  onOpenAuditTrail,
  onDiscardChanges,
  onDisplayClick,
  onBodyClick,
  onHeaderFooterClick,
  onEmailReceiptsClick,
  onHamburgerClick,
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false)
  const actionMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!showActionMenu) return

    const handleMouseDown = (event: MouseEvent) => {
      if (!actionMenuRef.current) return
      if (!actionMenuRef.current.contains(event.target as Node)) {
        setShowActionMenu(false)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [showActionMenu])

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
        <div ref={actionMenuRef} style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <button
            type="button"
            aria-label="Open receipt actions"
            onClick={() => setShowActionMenu((prev) => !prev)}
            style={{
              border: 'none',
              background: 'none',
              color: '#262AFF',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 1,
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
            }}
          >
            ···
          </button>

          {showActionMenu && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                minWidth: 190,
                border: '1px solid #ABC6D8',
                borderRadius: 8,
                background: '#FCFCFC',
                boxShadow: '0 8px 20px rgba(4,4,28,0.12)',
                overflow: 'hidden',
                zIndex: 30,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  if (!saveAllEnabled) return
                  onDiscardChanges()
                  setShowActionMenu(false)
                }}
                style={{
                  width: '100%',
                  border: 'none',
                  background: '#FCFCFC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: saveAllEnabled ? '#04041C' : 'rgba(4, 4, 28, 0.48)',
                  cursor: saveAllEnabled ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                }}
              >
                <img
                  src={`/icons/discard%20changes.svg?v=${ICON_VERSION}`}
                  alt="Discard changes"
                  style={{ width: 16, height: 16, objectFit: 'contain', opacity: saveAllEnabled ? 1 : 0.5 }}
                />
                <span>Discard Changes</span>
              </button>

              {showAuditTrail && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenAuditTrail()
                    setShowActionMenu(false)
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    borderTop: '1px solid #ABC6D8',
                    background: '#FCFCFC',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 14px',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#04041C',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <img
                    src={`/icons/audit%20trail.svg?v=${ICON_VERSION}`}
                    alt="Audit trail"
                    style={{ width: 16, height: 16, objectFit: 'contain' }}
                  />
                  <span>Audit Trail</span>
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              if (!saveAllEnabled) return
              onSaveAll()
            }}
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
                i < ITEMS.length - 1 ? '1px solid #ABC6D8' : 'none',
              cursor: item.tappable ? 'pointer' : 'default',
              background: 'white',
            }}
          >
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
                stroke="#04041C"
                opacity="0.64"
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
