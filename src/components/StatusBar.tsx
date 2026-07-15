/* Shared iOS-style status bar */
export default function StatusBar({
  background = 'transparent',
}: {
  background?: string
}) {
  return (
    <div
      style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        background,
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 700, color: '#04041C' }}>
        9:41
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="#04041C">
          <rect x="0" y="6" width="3" height="6" rx="0.5" />
          <rect x="4.5" y="4" width="3" height="8" rx="0.5" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        {/* Wi-Fi */}
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          stroke="#04041C"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 4.2C4 1.2 12 1.2 15 4.2" strokeWidth="1.4" />
          <path d="M3.2 6.8C5 5 11 5 12.8 6.8" strokeWidth="1.4" />
          <path d="M5.8 9.4C6.8 8.4 9.2 8.4 10.2 9.4" strokeWidth="1.4" />
          <circle cx="8" cy="12" r="0.9" fill="#04041C" stroke="none" />
        </svg>
        {/* Battery */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect
            x="0.6"
            y="1"
            width="21"
            height="11"
            rx="2.2"
            stroke="#04041C"
            strokeWidth="1.2"
          />
          <rect x="2" y="2.5" width="17.5" height="8" rx="1.2" fill="#04041C" />
          <path
            d="M23 4.5v4"
            stroke="#04041C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
