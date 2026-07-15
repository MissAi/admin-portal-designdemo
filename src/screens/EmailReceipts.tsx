import { useRef, useState, type FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  onBack: () => void
  onDirty: () => void
}

const EmailReceipts: FC<Props> = ({ onBack, onDirty }) => {
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBodyText, setEmailBodyText] = useState('')
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
            display: 'grid',
            gap: 16,
          }}
        >
          <FieldLabel
            label="Email Subject"
            helper="Displayed as the subject line for receipt emails."
          />
          <input
            value={emailSubject}
            onChange={(event) => {
              const next = event.target.value
              if (next !== emailSubject) {
                setEmailSubject(next)
                markDirtyOnce()
              }
            }}
            style={inputStyle}
          />

          <FieldLabel label="Email Body Text" />
          <textarea
            value={emailBodyText}
            rows={6}
            onChange={(event) => {
              const next = event.target.value
              if (next !== emailBodyText) {
                setEmailBodyText(next)
                markDirtyOnce()
              }
            }}
            style={textareaStyle}
          />
        </div>
      </div>
    </div>
  )
}

function FieldLabel({
  label,
  helper,
}: {
  label: string
  helper?: string
}) {
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <div
        style={{
          fontSize: 16,
          color: '#04041C',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      {helper && (
        <div style={{ fontSize: 13, lineHeight: 1.4, color: '#6B747D' }}>
          {helper}
        </div>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
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

const textareaStyle: React.CSSProperties = {
  width: '100%',
  minHeight: 132,
  border: '1px solid #ABC6D8',
  borderRadius: 8,
  background: '#FFFFFF',
  padding: '12px',
  fontSize: 15,
  lineHeight: 1.5,
  color: '#04041C',
  outline: 'none',
  resize: 'vertical',
  fontFamily: 'inherit',
}

export default EmailReceipts