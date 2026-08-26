import { VegaInputSelect } from '@globalpayments/vega-react'

type DesktopBodySettingsProps = Readonly<{
  font: string
  size: string
  onFontChange: (font: string) => void
  onSizeChange: (size: string) => void
}>

const FONTS = ['Helvetica-Bold', 'Helvetica-Regular', 'Menlo-Bold', 'Menlo-Regular']
const SIZES = ['Small', 'Standard', 'Large']
const source = (options: string[]) => options.map((option) => ({ id: option, displayName: option }))

function eventValue(event: Event): string {
  const detail = (event as CustomEvent<unknown>).detail
  if (typeof detail === 'string') return detail
  if (detail && typeof detail === 'object' && 'value' in detail && typeof (detail as { value?: unknown }).value === 'string') {
    return (detail as { value: string }).value
  }
  return ''
}

export function DesktopBodySettings({ font, size, onFontChange, onSizeChange }: DesktopBodySettingsProps) {
  return <section className="rbd-body-settings" aria-label="Body Font & Size settings">
    <h2>Body Font &amp; Size</h2>
    <VegaInputSelect label="Font" selectType="single" source={source(FONTS)} value={font} vegaDropdownProps={{ searchable: false }} onVegaChange={(event: Event) => {
      const value = eventValue(event)
      if (value) onFontChange(value)
    }} />
    <VegaInputSelect label="Size" selectType="single" source={source(SIZES)} value={size} vegaDropdownProps={{ searchable: false }} onVegaChange={(event: Event) => {
      const value = eventValue(event)
      if (value) onSizeChange(value)
    }} />
  </section>
}