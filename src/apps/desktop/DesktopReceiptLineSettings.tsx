import { useEffect, useRef } from 'react'
import { VegaButton, VegaInputSelect } from '@globalpayments/vega-react'

export type ReceiptLine = {
  id: number
  text: string
  font: string
  size: string
  alignment: string
}

type DesktopReceiptLineSettingsProps = Readonly<{
  kind: 'header' | 'footer'
  line: ReceiptLine
  shouldFocus: boolean
  onChange: (line: ReceiptLine) => void
  onTextChange: (text: string) => void
  onAdd: () => void
  onRemove: () => void
  onFocusLeave: () => void
}>

const FONTS = ['Helvetica-Bold', 'Helvetica-Regular', 'Menlo-Bold', 'Menlo-Regular']
const SIZES = Array.from({ length: 31 }, (_, index) => String(12 + index * 2))
const ALIGNMENTS = ['Left', 'Center', 'Right']
const source = (options: string[]) => options.map((option) => ({ id: option, displayName: option }))

function eventValue(event: Event): string {
  const detail = (event as CustomEvent<unknown>).detail
  if (typeof detail === 'string') return detail
  if (detail && typeof detail === 'object' && 'value' in detail && typeof (detail as { value?: unknown }).value === 'string') {
    return (detail as { value: string }).value
  }
  return ''
}

export function DesktopReceiptLineSettings({ kind, line, shouldFocus, onChange, onTextChange, onAdd, onRemove, onFocusLeave }: DesktopReceiptLineSettingsProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const title = kind === 'header' ? 'Header Lines' : 'Footer Lines'
  const update = (changes: Partial<ReceiptLine>) => onChange({ ...line, ...changes })

  useEffect(() => {
    if (shouldFocus) textareaRef.current?.focus()
  }, [line.id, shouldFocus])

  return <section className="rbd-line-settings" aria-label={`${title} settings`} onBlur={(event) => {
    const nextTarget = event.relatedTarget
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return
    onFocusLeave()
  }}>
    <div className="rbd-line-settings__fields">
      <h2>{title}</h2>
      <textarea
        ref={textareaRef}
        aria-label={`${kind === 'header' ? 'Header' : 'Footer'} line text`}
        value={line.text}
        onInput={(event) => {
          onTextChange(event.currentTarget.value)
          update({ text: event.currentTarget.value })
        }}
        onChange={() => undefined}
      />
      <VegaInputSelect label="Font" selectType="single" source={source(FONTS)} value={line.font} vegaDropdownProps={{ searchable: false }} onVegaChange={(event: Event) => {
        const value = eventValue(event)
        if (value) update({ font: value })
      }} />
      <div className="rbd-line-settings__row">
        <VegaInputSelect label="Size" selectType="single" source={source(SIZES)} value={line.size} vegaDropdownProps={{ searchable: false }} onVegaChange={(event: Event) => {
          const value = eventValue(event)
          if (value) update({ size: value })
        }} />
        <VegaInputSelect label="Alignment" selectType="single" source={source(ALIGNMENTS)} value={line.alignment} vegaDropdownProps={{ searchable: false }} onVegaChange={(event: Event) => {
          const value = eventValue(event)
          if (value) update({ alignment: value })
        }} />
      </div>
    </div>
    <div className="rbd-line-settings__actions">
      <VegaButton className="rbd-line-settings__add" label="Add New Line" variant="secondary" onVegaClick={onAdd} />
      <VegaButton className="rbd-line-settings__remove" label="Remove This Line" variant="secondary" danger onVegaClick={onRemove} />
    </div>
  </section>
}