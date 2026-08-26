import { useState } from 'react'
import { VegaInput, VegaTextarea } from '@globalpayments/vega-react'

function eventValue(event: Event): string {
  const detail = (event as CustomEvent<unknown>).detail
  if (typeof detail === 'string') return detail
  if (detail && typeof detail === 'object' && 'value' in detail && typeof (detail as { value?: unknown }).value === 'string') {
    return (detail as { value: string }).value
  }
  return ''
}

export function DesktopEmailReceiptSettings({ onDirty }: Readonly<{ onDirty: () => void }>) {
  const [subject, setSubject] = useState('')
  const [bodyText, setBodyText] = useState('')

  return <div className="rbd-email-settings">
    <VegaInput label="Email Subject" value={subject} onVegaChange={(event: Event) => { const value = eventValue(event); if (value !== subject) { setSubject(value); onDirty() } }} />
    <VegaTextarea label="Email Body Text" value={bodyText} rows={6} onVegaChange={(event: Event) => { const value = eventValue(event); if (value !== bodyText) { setBodyText(value); onDirty() } }} />
  </div>
}