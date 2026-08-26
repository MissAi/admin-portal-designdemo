import { useState, type FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props { onBack: () => void; onDirty: () => void }

const MarginSettings: FC<Props> = ({ onBack, onDirty }) => {
  const [topMargin, setTopMargin] = useState('24')
  const [bottomMargin, setBottomMargin] = useState('24')
  const update = (setter: (value: string) => void, value: string) => { setter(value); onDirty() }
  return <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F0F3F7' }}>
    <StatusBar background="#FCFCFC" />
    <header style={{ display: 'flex', alignItems: 'center', padding: '16px', background: '#FCFCFC', borderBottom: '1px solid #E5E5EA' }}><button type="button" onClick={onBack} style={backStyle}>Back</button><h1 style={{ flex: 1, margin: 0, marginRight: 60, textAlign: 'center', fontSize: 18, color: '#04041C' }}>Receipt Margins</h1></header>
    <main style={{ padding: 16, background: '#FCFCFC' }}>
      <MarginField label="Top Margin" value={topMargin} onChange={(value) => update(setTopMargin, value)} />
      <MarginField label="Bottom Margin" value={bottomMargin} onChange={(value) => update(setBottomMargin, value)} />
    </main>
  </div>
}

function MarginField({ label, value, onChange }: Readonly<{ label: string; value: string; onChange: (value: string) => void }>) {
  return <label style={{ display: 'grid', gap: 6, marginBottom: 18, color: '#04041C', fontSize: 16, fontWeight: 500 }}>{label}<div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ABC6D8', borderRadius: 10, background: '#fff' }}><input type="number" min="0" value={value} onChange={(event) => onChange(event.target.value)} style={{ width: '100%', border: 'none', outline: 'none', padding: '14px 16px', font: 'inherit', color: '#04041C', background: 'transparent' }} /><span style={{ paddingRight: 16, color: '#6B747D' }}>px</span></div></label>
}

const backStyle: React.CSSProperties = { minWidth: 60, border: 'none', padding: 0, background: 'none', color: '#262AFF', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }

export default MarginSettings