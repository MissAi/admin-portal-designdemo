import { useMemo, useRef, useState, type FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  onBack: () => void
  onConfirm: (logoUrl: string) => void
}

const PRESET_LOGOS = [
  '/icons/info.svg',
  '/icons/Publish.svg',
  '/favicon.svg',
]

const cardStyle: React.CSSProperties = {
  border: '1px solid #ABC6D8',
  borderRadius: 12,
  background: '#FCFCFC',
  height: 90,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

const LogoImagePicker: FC<Props> = ({ onBack, onConfirm }) => {
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canConfirm = useMemo(() => Boolean(selectedLogo), [selectedLogo])

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
          display: 'grid',
          gridTemplateColumns: '83px 1fr 83px',
          alignItems: 'center',
          padding: '10px 16px',
          columnGap: 8,
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
            width: '100%',
            textAlign: 'left',
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
          }}
        >
          Select Logo
        </span>
        <button
          onClick={() => selectedLogo && onConfirm(selectedLogo)}
          disabled={!canConfirm}
          style={{
            border: 'none',
            background: 'none',
            color: canConfirm ? '#262AFF' : '#9FA8B2',
            fontSize: 16,
            fontWeight: 700,
            cursor: canConfirm ? 'pointer' : 'default',
            padding: 0,
            width: '100%',
            textAlign: 'right',
          }}
        >
          Confirm
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div
          style={{
            background: '#FCFCFC',
            borderRadius: 16,
            padding: 16,
            boxShadow: '0 1px 0 rgba(4,4,28,0.04)',
          }}
        >
          <div style={{ color: '#04041C', fontSize: 15, fontWeight: 600, marginBottom: 12 }}>
            Choose a logo image
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 10,
              marginBottom: 14,
            }}
          >
            {PRESET_LOGOS.map((logoSrc) => {
              const isActive = selectedLogo === logoSrc
              return (
                <button
                  key={logoSrc}
                  onClick={() => setSelectedLogo(logoSrc)}
                  style={{
                    ...cardStyle,
                    border: isActive ? '2px solid #262AFF' : '1px solid #ABC6D8',
                    padding: 0,
                  }}
                >
                  <img
                    src={logoSrc}
                    alt="logo option"
                    style={{ maxWidth: 56, maxHeight: 56, objectFit: 'contain' }}
                  />
                </button>
              )
            })}
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%',
              minHeight: 42,
              border: '1px solid #ABC6D8',
              borderRadius: 8,
              background: '#FFFFFF',
              color: '#262AFF',
              fontWeight: 600,
              fontSize: 15,
              marginBottom: 12,
              cursor: 'pointer',
            }}
          >
            Upload from device
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (!file) return
              const objectUrl = URL.createObjectURL(file)
              setSelectedLogo(objectUrl)
            }}
          />

          {selectedLogo && (
            <div
              style={{
                border: '1px dashed #ABC6D8',
                borderRadius: 8,
                minHeight: 110,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
              }}
            >
              <img
                src={selectedLogo}
                alt="Selected"
                style={{ maxWidth: '100%', maxHeight: 90, objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LogoImagePicker
