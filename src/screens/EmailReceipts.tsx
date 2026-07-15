import type { FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  onBack: () => void
}

const EmailReceipts: FC<Props> = ({ onBack }) => {
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
          padding: '10px 16px',
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
          E-Mail Receipts
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
          }}
        >
          <FieldGroup label="Email Subject">
            <input style={inputStyle} defaultValue="" />
          </FieldGroup>
          <FieldGroup label="Email Body Text">
            <textarea style={textareaStyle} defaultValue="" />
          </FieldGroup>
        </div>
      </div>
    </div>
  )
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={labelStyle}>{label}</div>
      {children}
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  color: '#04041C',
  marginBottom: 8,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  minHeight: 40,
  padding: '0 12px',
  border: '1px solid #ABC6D8',
  borderRadius: 8,
  background: '#FCFCFC',
  fontFamily: 'inherit',
  fontSize: 16,
  color: '#04041C',
  outline: 'none',
}

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 120,
  padding: '10px 12px',
  resize: 'none',
}

export default EmailReceipts