import { useRef, useState, type FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  onBack: () => void
  onDirty: () => void
}

const FONT_BODY_OPTIONS = [
  'Menlo-Bold (iOS)/ RobotoMono-Bold (Android)',
  'Menlo-Regular (iOS)/ RobotoMono-Regular (Android)',
  'Helvetica Neue (iOS)/ Roboto (Android)',
  'San Francisco (iOS)/ Roboto (Android)',
  'Avenir Next (iOS)/ Roboto (Android)',
  'Courier New (iOS)/ RobotoMono (Android)',
  'Times New Roman (iOS)/ Noto Serif (Android)',
  'Georgia (iOS)/ Noto Serif (Android)',
]

const SIZE_OPTIONS = ['Small', 'Standard', 'Large']

const BodySettings: FC<Props> = ({ onBack, onDirty }) => {
  const [fontBody, setFontBody] = useState(
    'Menlo-Bold (iOS)/ RobotoMono-Bold (Android)',
  )
  const [size, setSize] = useState('Small')
  const hasMarkedDirtyRef = useRef(false)

  const markDirtyOnce = () => {
    if (hasMarkedDirtyRef.current) return
    hasMarkedDirtyRef.current = true
    onDirty()
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#F0F3F7',
      }}
    >
      <StatusBar background="#FCFCFC" />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 16px',
          background: '#FCFCFC',
          borderBottom: '1px solid #e5e5ea',
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            border: 'none',
            background: 'none',
            color: '#262AFF',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            minWidth: 60,
          }}
        >
          Back
        </button>
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 18,
            color: '#04041C',
            marginRight: 60,
          }}
        >
          Body
        </span>
      </div>

      <div style={{ flex: 1, background: '#F0F3F7' }}>
        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: '#FCFCFC',
            padding: '16px 16px 48px',
            boxShadow: '0 1px 0 rgba(4,4,28,0.04)',
            display: 'grid',
            gap: 16,
          }}
        >
          <FieldLabel label="Font Body" />
          <select
            value={fontBody}
            onChange={(event) => {
              const next = event.target.value
              if (next !== fontBody) {
                setFontBody(next)
                markDirtyOnce()
              }
            }}
            style={selectStyle}
          >
            {FONT_BODY_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <FieldLabel label="Size" />
          <select
            value={size}
            onChange={(event) => {
              const next = event.target.value
              if (next !== size) {
                setSize(next)
                markDirtyOnce()
              }
            }}
            style={selectStyle}
          >
            {SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

function FieldLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        fontSize: 16,
        color: '#04041C',
        fontWeight: 500,
        marginBottom: 8,
      }}
    >
      {label}
    </div>
  )
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  height: 44,
  border: '1px solid #ABC6D8',
  borderRadius: 8,
  background: '#FFFFFF',
  padding: '0 12px',
  fontSize: 15,
  color: '#04041C',
  outline: 'none',
  fontFamily: 'inherit',
}

export default BodySettings
