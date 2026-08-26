import { useEffect, useRef } from 'react'
import { VegaInputNumeric } from '@globalpayments/vega-react'

type DesktopMarginSettingsProps = Readonly<{
  topMargin: string
  bottomMargin: string
  onTopMarginChange: (value: string) => void
  onBottomMarginChange: (value: string) => void
}>

export function DesktopMarginSettings({ topMargin, bottomMargin, onTopMarginChange, onBottomMarginChange }: DesktopMarginSettingsProps) {
  const settingsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let cancelled = false
    const alignSuffixes = async () => {
      await customElements.whenDefined('vega-input-numeric')
      const numericInputs = settingsRef.current?.querySelectorAll('vega-input-numeric') ?? []
      for (const numericInput of numericInputs) {
        const numericComponent = numericInput as HTMLElement & { componentOnReady?: () => Promise<HTMLElement> }
        await numericComponent.componentOnReady?.()
        const innerInput = numericComponent.shadowRoot?.querySelector('vega-input') as (HTMLElement & { componentOnReady?: () => Promise<HTMLElement> }) | null
        await innerInput?.componentOnReady?.()
        if (cancelled || !innerInput?.shadowRoot || innerInput.shadowRoot.querySelector('[data-margin-suffix-style]')) continue
        const style = document.createElement('style')
        style.dataset.marginSuffixStyle = ''
        style.textContent = '.suffix-text { text-align: right; }'
        innerInput.shadowRoot.append(style)
      }
    }
    void alignSuffixes()
    return () => { cancelled = true }
  }, [])

  return <section ref={settingsRef} className="rbd-margin-settings" aria-label="Top & Bottom Margin settings">
    <h2>Top &amp; Bottom Margin</h2>
    <MarginField label="Top Margin" value={topMargin} onChange={onTopMarginChange} />
    <MarginField label="Bottom Margin" value={bottomMargin} onChange={onBottomMarginChange} />
  </section>
}

function MarginField({ label, value, onChange }: Readonly<{ label: string; value: string; onChange: (value: string) => void }>) {
  return <VegaInputNumeric
    label={label}
    value={value}
    integerOnly
    suffixText="line"
    showClearIcon={false}
    size="medium"
    onVegaChange={(event: Event) => {
      const target = event.currentTarget as { value?: unknown }
      if (typeof target.value === 'string') {
        onChange(target.value)
        return
      }
      const detail = (event as CustomEvent<number>).detail
      onChange(Number.isNaN(detail) ? '' : String(detail))
    }}
  />
}