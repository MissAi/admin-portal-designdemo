import { useEffect, useRef, useState, type FC } from 'react'
import { VegaInputSelect } from '@globalpayments/vega-react'
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

type VegaSelectSourceItem = {
  id: string
  displayName: string
}

function toFontDisplayName(option: string): string {
  return option
    .replace(' (iOS)', '')
    .replace(' (Android)', '')
    .replace('/ ', '/ ')
}

function createSelectSource(
  options: string[],
  formatter?: (option: string) => string,
): VegaSelectSourceItem[] {
  return options.map((option) => ({
    id: option,
    displayName: formatter ? formatter(option) : option,
  }))
}

const FONT_BODY_SOURCE = createSelectSource(FONT_BODY_OPTIONS, toFontDisplayName)
const SIZE_SOURCE = createSelectSource(SIZE_OPTIONS)

function getVegaSelectValue(event: Event): string | null {
  const customEvent = event as CustomEvent<unknown>
  const detail = customEvent.detail

  if (typeof detail === 'string') return detail

  if (detail && typeof detail === 'object' && 'value' in detail) {
    const value = (detail as { value?: unknown }).value
    if (typeof value === 'string') return value
  }

  return null
}

const BodySettings: FC<Props> = ({ onBack, onDirty }) => {
  const [fontBody, setFontBody] = useState(
    'Menlo-Bold (iOS)/ RobotoMono-Bold (Android)',
  )
  const [size, setSize] = useState('Small')
  const hasMarkedDirtyRef = useRef(false)
  const [formReady, setFormReady] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setFormReady(true), 240)
    return () => window.clearTimeout(id)
  }, [])

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
          {!formReady ? (
            <FieldSkeleton rows={2} />
          ) : (<>
          <div>
            <FieldLabel label="Font Body" />
            <VegaInputSelect
              label=""
              selectType="single"
              source={FONT_BODY_SOURCE}
              value={fontBody}
              vegaDropdownProps={{ searchable: true }}
              selectedLabelTooltipProps={{ maxWidth: 0 }}
              dropdownItemTooltipProps={{ maxWidth: 0 }}
              onVegaChange={(event: Event) => {
                const next = getVegaSelectValue(event)
                if (next && next !== fontBody) {
                  setFontBody(next)
                  markDirtyOnce()
                }
              }}
            />
          </div>

          <div>
            <FieldLabel label="Size" />
            <VegaInputSelect
              label=""
              selectType="single"
              source={SIZE_SOURCE}
              value={size}
              vegaDropdownProps={{ searchable: false }}
              selectedLabelTooltipProps={{ maxWidth: 0 }}
              dropdownItemTooltipProps={{ maxWidth: 0 }}
              onVegaChange={(event: Event) => {
                const next = getVegaSelectValue(event)
                if (next && next !== size) {
                  setSize(next)
                  markDirtyOnce()
                }
              }}
            />
          </div>
          </>)}
        </div>
      </div>
    </div>
  )
}

function FieldSkeleton({ rows }: { rows: number }) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ height: 52, borderRadius: 8, background: '#F0F3F7' }} />
      ))}
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
        marginBottom: 6,
      }}
    >
      {label}
    </div>
  )
}

export default BodySettings
