import { useState, type FC } from 'react'
import { VegaInputSelect } from '@globalpayments/vega-react'
import StatusBar from '../components/StatusBar'

interface Props {
  onBack: () => void
  onDirty: () => void
}

type SelectItem = { id: string; displayName: string }

const fonts = ['Helvetica-Bold', 'Helvetica-Regular', 'Menlo-Bold', 'Menlo-Regular']
const sizes = Array.from({ length: 31 }, (_, index) => String(12 + index * 2))
const alignments = ['Left', 'Center', 'Right']
const source = (options: string[]): SelectItem[] => options.map((option) => ({ id: option, displayName: option }))

function selectValue(event: Event): string | null {
  const detail = (event as CustomEvent<unknown>).detail
  if (typeof detail === 'string') return detail
  if (detail && typeof detail === 'object' && 'value' in detail && typeof (detail as { value?: unknown }).value === 'string') return (detail as { value: string }).value
  return null
}

const HeaderFooterLines: FC<Props> = ({ onBack, onDirty }) => {
  const [text, setText] = useState('Welcome to Our Restaurant!')
  const [font, setFont] = useState('Helvetica-Bold')
  const [size, setSize] = useState('18')
  const [alignment, setAlignment] = useState('Center')
  const update = <T,>(setter: (value: T) => void, value: T) => { setter(value); onDirty() }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FCFCFC' }}>
      <StatusBar background="#FCFCFC" />
      <header style={{ display: 'flex', alignItems: 'center', padding: '16px 22px', borderBottom: '1px solid #ABC6D8' }}>
        <button type="button" onClick={onBack} style={headerButton}>Cancel</button>
        <h1 style={{ flex: 1, margin: 0, textAlign: 'center', fontSize: 18, color: '#04041C' }}>Header Line</h1>
        <button type="button" onClick={onBack} style={{ ...headerButton, textAlign: 'right' }}>Done</button>
      </header>
      <main style={{ padding: '20px 22px', display: 'grid', gap: 20 }}>
        <textarea aria-label="Header line text" value={text} onChange={(event) => update(setText, event.target.value)} style={{ height: 165, resize: 'vertical', padding: '16px 22px', border: '1px solid #ABC6D8', borderRadius: 12, outline: 'none', font: 'inherit', fontSize: 16, color: '#15162D' }} />
        <VegaInputSelect label="Font" selectType="single" source={source(fonts)} value={font} vegaDropdownProps={{ searchable: false }} onVegaChange={(event: Event) => { const value = selectValue(event); if (value) update(setFont, value) }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <VegaInputSelect label="Size" selectType="single" source={source(sizes)} value={size} vegaDropdownProps={{ searchable: false }} onVegaChange={(event: Event) => { const value = selectValue(event); if (value) update(setSize, value) }} />
          <VegaInputSelect label="Alignment" selectType="single" source={source(alignments)} value={alignment} vegaDropdownProps={{ searchable: false }} onVegaChange={(event: Event) => { const value = selectValue(event); if (value) update(setAlignment, value) }} />
        </div>
      </main>
      <div style={{ flex: 1 }} />
      <button type="button" style={{ margin: '0 22px 20px', padding: '13px', border: '2px solid #A7091A', borderRadius: 999, background: 'white', color: '#A7091A', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Remove This Line</button>
    </div>
  )
}

const headerButton: React.CSSProperties = { width: 72, border: 'none', padding: 0, background: 'none', color: '#262AFF', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }

export default HeaderFooterLines
