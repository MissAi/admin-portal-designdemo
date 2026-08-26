import { useState, type FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  onBack: () => void
  onBodyClick: () => void
  onHeaderFooterClick: () => void
  onMarginsClick: () => void
}

const ReceiptEditor: FC<Props> = ({
  onBack,
  onBodyClick,
  onHeaderFooterClick,
  onMarginsClick,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false)

  return <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F0F3F7' }}>
    <StatusBar background="#FCFCFC" />
    <header style={{ display: 'flex', alignItems: 'center', padding: '16px', background: '#FCFCFC', borderBottom: '1px solid #ABC6D8' }}>
      <button type="button" onClick={onBack} style={headerButtonStyle}>Back</button>
      <h1 style={{ flex: 1, margin: 0, textAlign: 'center', fontSize: 18, color: '#04041C' }}>Receipt Editor</h1>
      <div style={{ position: 'relative', width: 72, textAlign: 'right' }}>
        <button type="button" onClick={() => setShowAddMenu((isOpen) => !isOpen)} style={{ ...headerButtonStyle, minWidth: 0 }}>Add Line</button>
        {showAddMenu && (
          <div style={{ position: 'absolute', top: 30, right: 0, width: 176, padding: '6px 0', border: '1px solid #ABC6D8', borderRadius: 8, background: '#FCFCFC', boxShadow: '0 8px 20px rgba(4,4,28,0.14)', textAlign: 'left', zIndex: 10 }}>
            <button type="button" onClick={onHeaderFooterClick} style={menuItemStyle}>Add Header Line</button>
            <button type="button" onClick={onHeaderFooterClick} style={menuItemStyle}>Add Footer Line</button>
          </div>
        )}
      </div>
    </header>
    <div style={{ width: '100%', padding: '28px 22px', background: '#FCFCFC' }}>
      <span style={{ display: 'block', width: '100%', color: '#04041C', fontSize: 17, lineHeight: 1.3 }}>Tap a section in the receipt preview below to edit it.</span>
    </div>
    <main style={{ flex: 1, overflowY: 'auto', padding: '48px 26px 32px', background: 'linear-gradient(135deg, #F5F8FA, #E8EDF1)' }}>
      <div style={{ height: 14, borderRadius: 999, background: '#D3D9DE', margin: '0 -26px -2px' }} />
      <section style={{ position: 'relative', padding: '12px 18px 42px', background: '#FCFCFC', color: '#080922', boxShadow: '0 8px 24px rgba(4,4,28,0.08)' }}>
        <ReceiptSection onClick={onMarginsClick} label="(Top Margin)" centered muted />
        <ReceiptSection onClick={onHeaderFooterClick} label="Welcome to Our Restaurant!" centered strong />
        <ReceiptSection onClick={onBodyClick} label={<><div style={{ display: 'flex', justifyContent: 'space-between' }}><span>07 / 23/26, 10:49 AM</span><span>Ticket: M1</span></div><p>Server: Angelina A</p><p>Morning & Evening Table 9</p><p>Invoice: 260604-1-1</p><hr /><div style={{ display: 'flex', justifyContent: 'space-between' }}><span>QTY/ITEM</span><span>CASH&nbsp;&nbsp; CARD</span></div><hr style={{ width: '100%' }} /><p>1 Item name <span style={{ float: 'right' }}>$0.00&nbsp; $0.00</span></p><p>1 Item name <span style={{ float: 'right' }}>$0.00&nbsp; $0.00</span></p></>} />
        <ReceiptSection onClick={onHeaderFooterClick} label="Thank you for visiting us!" centered strong />
        <ReceiptSection onClick={onMarginsClick} label="(Bottom Margin)" centered muted />
      </section>
    </main>
  </div>
}

function ReceiptSection({ label, onClick, centered, muted, strong }: Readonly<{ label: React.ReactNode; onClick: () => void; centered?: boolean; muted?: boolean; strong?: boolean }>) {
  return <button type="button" onClick={onClick} style={{ display: 'block', width: '100%', border: 'none', background: 'transparent', padding: '10px 0', color: muted ? '#777989' : '#080922', cursor: 'pointer', fontFamily: 'inherit', fontSize: strong ? 20 : 14, fontWeight: strong ? 800 : 700, textAlign: centered ? 'center' : 'left', lineHeight: 1.55 }}>{label}</button>
}

const headerButtonStyle: React.CSSProperties = { minWidth: 60, border: 'none', padding: 0, background: 'none', color: '#262AFF', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }
const menuItemStyle: React.CSSProperties = { width: '100%', border: 'none', padding: '11px 14px', background: 'transparent', color: '#04041C', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, textAlign: 'left' }

export default ReceiptEditor