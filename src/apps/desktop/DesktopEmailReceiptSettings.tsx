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

export function DesktopEmailReceiptSettings() {
  const [subject, setSubject] = useState('')
  const [bodyText, setBodyText] = useState('')

  return <div className="rbd-email-settings">
    <VegaInput label="Email Subject" value={subject} onVegaChange={(event: Event) => setSubject(eventValue(event))} />
    <VegaTextarea label="Email Body Text" value={bodyText} rows={6} onVegaChange={(event: Event) => setBodyText(eventValue(event))} />
  </div>
}