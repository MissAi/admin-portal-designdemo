import { useEffect, useRef, useState, type FC } from 'react'
import { VegaButton, VegaInput, VegaInputSelect, VegaTabGroup } from '@globalpayments/vega-react'
import DiscardChangesIcon from '../../components/DiscardChangesIcon'
import ResponsiveActionGroup from '../../components/ResponsiveActionGroup'
import { DesktopFormLayout } from './DesktopFormLayout'
import { DesktopBodySettings } from './DesktopBodySettings'
import { DesktopEmailReceiptSettings } from './DesktopEmailReceiptSettings'
import { DesktopGlobalHeader } from './DesktopGlobalHeader'
import { DesktopLogoPickerModal } from './DesktopLogoPickerModal'
import { DesktopMarginSettings } from './DesktopMarginSettings'
import { DesktopPageLayout } from './DesktopPageLayout'
import { DesktopReceiptLineSettings, type ReceiptLine } from './DesktopReceiptLineSettings'
import { DesktopSettingsArea } from './DesktopSettingsArea'
import { DesktopSideNavigation } from './DesktopSideNavigation'
import './DesktopPage.css'
import './CustomerReceiptDesktopApp.css'

const LOCATIONS = ['All Locations', 'Ange - Mobile Save', 'Gioia Loc', 'Gioia Loc RN', 'Rebecca APv2', 'Rebecca Loc', 'Rebecca Loc RN']
const SETTINGS_NAV = ['Settings', 'Online Ordering', 'App Ordering', 'Rooms', 'Custom Tender', 'Paid In & Out Types', 'Payout Apportions', 'Tip Out Types', 'Dayparts', 'Payment Gateway', 'Staff', 'Job Types', 'Labor Categories', 'Scheduled Shifts', 'Permissions', 'Report Access', 'Break Types', 'Time Punches', 'Clock In Messages', 'Authorized Devices', 'Payment Terminals', 'Printers', 'Display Formats', 'Customer Receipt']
const RECEIPT_TABS = [
  { label: 'Display', dataTarget: 'receipt-display' },
  { label: 'Receipt Editor', dataTarget: 'receipt-editor' },
  { label: 'E-Mail Receipts', dataTarget: 'receipt-email' },
]

function getVegaValue(event: Event): string {
  const detail = (event as CustomEvent<unknown>).detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && typeof detail[0] === 'string') return detail[0]
  return ''
}

function DiscardResponsiveAction() {
  const discardButton = (className: string, showLabel: boolean) => <button type="button" className={className} aria-label="Discard changes" title="Discard changes"><DiscardChangesIcon />{showLabel && <span>Discard Changes</span>}</button>

  return <ResponsiveActionGroup
    ariaLabel="Settings actions"
    collapsed={<details className="rbd-responsive-actions-menu"><summary>Actions</summary><div role="menu"><button type="button" role="menuitem"><DiscardChangesIcon /><span>Discard Changes</span></button></div></details>}
    icons={discardButton('rbd-undo', false)}
    labels={discardButton('rbd-discard-action', true)}
  />
}

function CheckField({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  const descriptions: Record<string, string> = {
    'Hide Separator Lines': 'Remove the dashed lines between modifiers on receipts.',
    'Show Promised Time': 'Show the promise time on delivery receipts.',
    'Show Surcharge Clause': "Show a clause informing the customer of a ticket's potential credit card surcharge fee.",
    'Roll Up Modifiers Prices': 'Item prices will include the prices of their added modifiers.',
    'Roll Up Duplicates': 'Identical items, discounts, and adjustments will be consolidated.',
    'Show Seat Details': 'Breakout receipt totals by their seat.',
    'Show Tax-Inclusive Details': 'Show the tax amount on the receipt for tax-inclusive items.',
  }
  return <div className="rbd-check-field"><span className="rbd-check-field__label">{label}</span><button type="button" className="rbd-check-field__control" role="checkbox" aria-checked={checked} onClick={onChange}><span className={`rbd-check-field__box${checked ? ' is-checked' : ''}`} aria-hidden="true">{checked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}</span><span className="rbd-check-field__description">{descriptions[label]}</span></button></div>
}

type ReceiptSectionId = 'top-margin' | 'logo' | 'header' | 'body' | 'footer' | 'bottom-margin'

function getReceiptSectionProps(sectionId: ReceiptSectionId, selectedSection: ReceiptSectionId | null, onSelectSection: (section: ReceiptSectionId) => void) {
  return {
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': `Edit ${sectionId.replace('-', ' ')}`,
    'aria-pressed': selectedSection === sectionId,
    className: `rbd-receipt-section${selectedSection === sectionId ? ' is-selected' : ''}`,
    onClick: () => onSelectSection(sectionId),
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelectSection(sectionId)
      }
    },
  }
}

function ReceiptPreview({ selectedSection, activeLineId, logoUrl, headerLines, footerLines, bodyFont, bodySize, topMargin, bottomMargin, onSelectSection, onSelectLine }: Readonly<{ selectedSection: ReceiptSectionId | null; activeLineId: number; logoUrl: string | null; headerLines: ReceiptLine[]; footerLines: ReceiptLine[]; bodyFont: string; bodySize: string; topMargin: string; bottomMargin: string; onSelectSection: (section: ReceiptSectionId) => void; onSelectLine: (section: 'header' | 'footer', lineId: number) => void }>) {
  const sectionProps = (sectionId: ReceiptSectionId) => getReceiptSectionProps(sectionId, selectedSection, onSelectSection)
  const marginHeight = (value: string) => Math.min(30, Math.max(0, Number(value) || 0)) * 30
  return <div className="rbd-receipt-preview-frame" onClick={(event) => event.stopPropagation()}><div className="rbd-receipt-preview__rail" /><section className="rbd-receipt-preview" aria-label="Receipt preview"><p {...sectionProps('top-margin')} className={`${sectionProps('top-margin').className} rbd-receipt-preview__muted rbd-receipt-preview__margin-row`} style={{ height: `${marginHeight(topMargin)}px` }}><span>(Top Margin)</span></p><div {...sectionProps('logo')} className={`${sectionProps('logo').className} rbd-logo-placeholder-row`}>{logoUrl ? <img className="rbd-receipt-logo" src={logoUrl} alt="Selected receipt logo" /> : <div className="rbd-logo-placeholder"><span className="rbd-logo-placeholder__plus" aria-hidden="true" /><span>Set<br />Logo</span></div>}</div>{headerLines.length > 0 && <ReceiptMessageSection section="header" lines={headerLines} activeLineId={activeLineId} isSectionSelected={selectedSection === 'header'} onSelectLine={onSelectLine} />}<ReceiptBodySample {...sectionProps('body')} font={bodyFont} size={bodySize} />{footerLines.length > 0 && <ReceiptMessageSection section="footer" lines={footerLines} activeLineId={activeLineId} isSectionSelected={selectedSection === 'footer'} onSelectLine={onSelectLine} />}<p {...sectionProps('bottom-margin')} className={`${sectionProps('bottom-margin').className} rbd-receipt-preview__muted rbd-receipt-preview__margin-row`} style={{ height: `${marginHeight(bottomMargin)}px` }}><span>(Bottom Margin)</span></p></section><img className="rbd-receipt-preview__footer-edge" src={`${import.meta.env.BASE_URL}receipt%20footer.svg`} alt="" /></div>
}

function ReceiptMessageSection({ section, lines, activeLineId, isSectionSelected, onSelectLine }: Readonly<{ section: 'header' | 'footer'; lines: ReceiptLine[]; activeLineId: number; isSectionSelected: boolean; onSelectLine: (section: 'header' | 'footer', lineId: number) => void }>) {
  return <div className="rbd-receipt-preview__message-section">
    {lines.map((line, index) => <div
      className={`rbd-receipt-section rbd-receipt-preview__message-line${isSectionSelected && activeLineId === line.id ? ' is-selected' : ''}`}
      key={line.id}
      role="button"
      tabIndex={0}
      aria-label={index === 0 ? `Edit ${section}` : `Edit ${section} line ${index + 1}`}
      aria-pressed={isSectionSelected && activeLineId === line.id}
      onClick={() => onSelectLine(section, line.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelectLine(section, line.id)
        }
      }}
      style={{ fontFamily: line.font.startsWith('Menlo') ? 'Menlo, monospace' : 'Helvetica, Arial, sans-serif', fontSize: `${line.size}px`, fontWeight: line.font.endsWith('Bold') ? 700 : 400, justifyContent: line.alignment === 'Center' ? 'center' : line.alignment === 'Right' ? 'flex-end' : 'flex-start', textAlign: line.alignment.toLowerCase() as React.CSSProperties['textAlign'] }}
    >{line.text || '\u00a0'}</div>)}
  </div>
}

function ReceiptBodySample({ font, size, ...props }: ReturnType<typeof getReceiptSectionProps> & Readonly<{ font: string; size: string }>) {
  const fontSize = size === 'Large' ? 16 : size === 'Standard' ? 14 : 12
  return <div {...props} className={`${props.className} rbd-receipt-preview__body-sample`} style={{ fontFamily: font.startsWith('Menlo') ? 'Menlo, monospace' : 'Helvetica, Arial, sans-serif', fontSize: `${fontSize}px`, fontWeight: font.endsWith('Bold') ? 700 : 400 }}>
    <div className="rbd-receipt-row rbd-receipt-row--spread"><span>MM/DD/YY, HH:MM AM</span><span>Ticket Number</span></div>
    <div className="rbd-receipt-line">Server Name</div>
    <div className="rbd-receipt-line">Restaurant Name</div>
    <div className="rbd-receipt-line">Invoice</div>
    <div className="rbd-receipt-divider" />
    <div className="rbd-receipt-grid rbd-receipt-grid--heading"><span>QTY/ITEM</span><span>CASH</span><span>CARD</span></div>
    <div className="rbd-receipt-grid rbd-receipt-grid--underlines"><span /><span /><span /></div>
    <div className="rbd-receipt-grid"><span>1 Item name</span><span>$0.00</span><span>$0.00</span></div>
    <div className="rbd-receipt-grid"><span>Subtotal</span><span>$0.00</span><span>$0.00</span></div>
    <div className="rbd-receipt-grid"><span>Tax</span><span>$0.00</span><span>$0.00</span></div>
    <div className="rbd-receipt-divider" />
    <div className="rbd-receipt-grid rbd-receipt-grid--total"><span>Total</span><span>$0.00</span><span>$0.00</span></div>
  </div>
}

const CustomerReceiptDesktopApp: FC = () => {
  const [location, setLocation] = useState('All Locations')
  const [section, setSection] = useState('Settings')
  const [tab, setTab] = useState('receipt-display')
  const [settings, setSettings] = useState<Record<string, boolean>>({ separator: true, promise: false, surcharge: false, modifiers: true, duplicates: false, seat: false, tax: false })
  const chooseLocation = (nextLocation: string) => { setLocation(nextLocation); if (nextLocation !== 'All Locations') setSection('Settings') }
  const isLocationSetup = location !== 'All Locations'
  const showCustomerReceipt = section === 'Customer Receipt'

  if (isLocationSetup) {
    return <DesktopPageLayout
      headerProps={{
        title: 'Redwood Grill',
        subtitle: 'Location Setup',
        location,
        locations: LOCATIONS,
        onLocationSelect: chooseLocation,
      }}
      currentFeatureName={section}
      navigation={<DesktopSideNavigation items={SETTINGS_NAV} selectedItem={section} ariaLabel="Location setup sections" onSelect={setSection} />}
    >
      {!showCustomerReceipt
        ? <LocationSettings location={location} />
        : <CustomerReceiptSettings tab={tab} setTab={setTab} settings={settings} setSettings={setSettings} />}
    </DesktopPageLayout>
  }

  return <div className="rbd-page desktop-page">
    <DesktopGlobalHeader
      title="Redwood Grill"
      subtitle="Menu"
      location={location}
      locations={LOCATIONS}
      onLocationSelect={chooseLocation}
    />
    <div className="rbd-start-message"><h1>Choose a location to begin</h1><p>Select <strong>All Locations</strong> in the global header, then choose <strong>Ange - Mobile Save</strong>.</p></div>
  </div>
}

function CustomerReceiptSettings({ tab, setTab, settings, setSettings }: Readonly<{ tab: string; setTab: (tab: string) => void; settings: Record<string, boolean>; setSettings: (settings: Record<string, boolean>) => void }>) {
  return <DesktopSettingsArea
    className="customer-receipt-settings-area"
    ariaLabel="Customer receipt settings"
    header={<div className="rbd-page-actions"><DiscardResponsiveAction /><VegaButton label="Save" variant="primary" disabled size="small" /></div>}
    secondaryHeader={<VegaTabGroup className="rbd-customer-tabs" variant="primary" gap="size-8" showCloseButton={false} tabItems={RECEIPT_TABS} selectedTabDataTarget={tab} onVegaClick={(event: CustomEvent<string>) => setTab(event.detail)} />}
  >
    {tab === 'receipt-display' && <DesktopFormLayout ariaLabel="Receipt display form"><Display settings={settings} setSettings={setSettings} /></DesktopFormLayout>}
    {tab === 'receipt-editor' && <DesktopFormLayout ariaLabel="Receipt editor form"><Editor /></DesktopFormLayout>}
    {tab === 'receipt-email' && <DesktopFormLayout ariaLabel="Email receipts form"><DesktopEmailReceiptSettings /></DesktopFormLayout>}
  </DesktopSettingsArea>
}

function LocationSettings({ location }: { location: string }) { const [locationName, setLocationName] = useState(location); const [language, setLanguage] = useState('Account Default'); return <DesktopSettingsArea ariaLabel="Location settings" header={<div className="rbd-page-actions"><DiscardResponsiveAction /><VegaButton label="Save" variant="primary" disabled size="small" /></div>}><section className="rbd-location-settings"><div className="rbd-location-banner"><span>Bring your menus to life<br />with digital menu boards</span></div><div className="rbd-settings-tabs"><span className="is-active">Location Info</span><span>App Settings</span><span>Payroll Settings</span><span>Transaction Settings</span></div><section className="rbd-location-form"><h1>Location Info</h1><div className="rbd-location-form__top"><div className="rbd-logo-tile">Set Logo</div><div><Field label="Location Number" value="3412520003" disabled /><Field label="Reseller" value="7498reseller" disabled /></div></div><Field label="Location Name *" value={locationName} onChange={setLocationName} /><Field label="Country *" value="United States" disabled /><Field label="Language" value={language} onChange={setLanguage} /></section></section></DesktopSettingsArea> }
function Field({ label, value, disabled, onChange }: { label: string; value: string; disabled?: boolean; onChange?: (value: string) => void }) { return <VegaInput label={label} value={value} disabled={disabled} onVegaChange={onChange ? (event: Event) => onChange(getVegaValue(event)) : undefined} /> }
function Display({ settings, setSettings }: { settings: Record<string, boolean>; setSettings: (settings: Record<string, boolean>) => void }) { const [modifierVisibility, setModifierVisibility] = useState('hide-all'); const toggle = (key: string) => setSettings({ ...settings, [key]: !settings[key] }); return <div className="rbd-display-form"><CheckField label="Hide Separator Lines" checked={settings.separator} onChange={() => toggle('separator')} /><CheckField label="Show Promised Time" checked={settings.promise} onChange={() => toggle('promise')} /><CheckField label="Show Surcharge Clause" checked={settings.surcharge} onChange={() => toggle('surcharge')} /><CheckField label="Roll Up Modifiers Prices" checked={settings.modifiers} onChange={() => toggle('modifiers')} /><CheckField label="Roll Up Duplicates" checked={settings.duplicates} onChange={() => toggle('duplicates')} /><VegaInputSelect label="Modifiers" selectType="single" source={[{ id: 'hide-all', displayName: 'Hide All' }, { id: 'show-all', displayName: 'Show All' }]} value={modifierVisibility} vegaDropdownProps={{ searchable: false }} onVegaChange={(event: Event) => setModifierVisibility(getVegaValue(event))} /><CheckField label="Show Seat Details" checked={settings.seat} onChange={() => toggle('seat')} /><CheckField label="Show Tax-Inclusive Details" checked={settings.tax} onChange={() => toggle('tax')} /></div> }
function Editor() {
  const [selectedSection, setSelectedSection] = useState<ReceiptSectionId | null>(null)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isLogoPickerOpen, setIsLogoPickerOpen] = useState(false)
  const [headerLines, setHeaderLines] = useState<ReceiptLine[]>([{ id: 1, text: 'Welcome to Our Restaurant!', font: 'Helvetica-Bold', size: '18', alignment: 'Center' }])
  const [footerLines, setFooterLines] = useState<ReceiptLine[]>([{ id: 1, text: 'Thank you for visiting us!', font: 'Helvetica-Bold', size: '18', alignment: 'Center' }])
  const [bodyFont, setBodyFont] = useState('Helvetica-Bold')
  const [bodySize, setBodySize] = useState('Small')
  const [topMargin, setTopMargin] = useState('1')
  const [bottomMargin, setBottomMargin] = useState('1')
  const [activeLineId, setActiveLineId] = useState(1)
  const [focusNewLine, setFocusNewLine] = useState(false)
  const draftTextRef = useRef('')
  const selectSection = (nextSection: ReceiptSectionId) => {
    setSelectedSection(nextSection)
    setFocusNewLine(false)
    if (nextSection === 'header' && headerLines.length > 0) setActiveLineId(headerLines[0].id)
    if (nextSection === 'footer' && footerLines.length > 0) setActiveLineId(footerLines[0].id)
    if (nextSection === 'logo') setIsLogoPickerOpen(true)
  }
  const selectLine = (kind: 'header' | 'footer', lineId: number) => {
    setSelectedSection(kind)
    setActiveLineId(lineId)
    setFocusNewLine(false)
  }
  const activeKind = selectedSection === 'header' || selectedSection === 'footer' ? selectedSection : null
  const activeLines = activeKind === 'header' ? headerLines : footerLines
  const activeLine = activeLines.find((line) => line.id === activeLineId) ?? activeLines[0]
  const setLines = activeKind === 'header' ? setHeaderLines : setFooterLines
  const updateLine = (updatedLine: ReceiptLine) => {
    setLines((lines) => lines.map((line) => line.id === updatedLine.id ? updatedLine : line))
  }
  const addLine = (kind: 'header' | 'footer') => {
    const lines = kind === 'header' ? headerLines : footerLines
    const nextLine = { id: Math.max(0, ...lines.map((line) => line.id)) + 1, text: '', font: 'Helvetica-Bold', size: lines.length === 0 ? '18' : '12', alignment: lines.length === 0 ? 'Center' : 'Left' }
    const insertAfterSelected = (current: ReceiptLine[]) => {
      const selectedIndex = kind === activeKind ? current.findIndex((line) => line.id === activeLineId) : -1
      if (selectedIndex < 0) return [...current, nextLine]
      return [...current.slice(0, selectedIndex + 1), nextLine, ...current.slice(selectedIndex + 1)]
    }
    if (kind === 'header') setHeaderLines(insertAfterSelected)
    else setFooterLines(insertAfterSelected)
    setSelectedSection(kind)
    setActiveLineId(nextLine.id)
    draftTextRef.current = ''
    setFocusNewLine(true)
  }
  const removeLine = () => {
    if (!activeKind || !activeLine) return
    const remainingLines = activeLines.filter((line) => line.id !== activeLine.id)
    setLines(remainingLines)
    setFocusNewLine(false)
    if (remainingLines.length === 0) setSelectedSection(null)
    else setActiveLineId(remainingLines[0].id)
  }
  const handleSettingsFocusLeave = () => {
    if (!focusNewLine || !activeLine || draftTextRef.current.trim()) return
    setLines((lines) => lines.filter((line) => line.id !== activeLine.id))
    setSelectedSection(null)
    setFocusNewLine(false)
  }
  const clearSelection = () => {
    setSelectedSection(null)
    setFocusNewLine(false)
  }
  const showMarginSettings = selectedSection === 'top-margin' || selectedSection === 'bottom-margin'
  const closeLogoPicker = () => {
    setIsLogoPickerOpen(false)
    setSelectedSection(null)
  }

  useEffect(() => {
    const handlePagePointerDown = (event: PointerEvent) => {
      if (!selectedSection || !(event.target instanceof Element)) return
      const receiptEditorForm = event.target.closest('[aria-label="Receipt editor form"]')
      if (!receiptEditorForm) return
      if (event.target.closest('.rbd-receipt-preview-frame, .rbd-line-settings, .rbd-body-settings, .rbd-margin-settings, .rbd-editor__hint, .rbd-editor__buttons, .rbd-logo-picker')) return
      clearSelection()
    }
    document.addEventListener('pointerdown', handlePagePointerDown)
    return () => document.removeEventListener('pointerdown', handlePagePointerDown)
  }, [selectedSection])

  return <>
    <div className="rbd-editor"><div className="rbd-editor__preview-pane"><ReceiptPreview selectedSection={selectedSection} activeLineId={activeLineId} logoUrl={logoUrl} headerLines={headerLines} footerLines={footerLines} bodyFont={bodyFont} bodySize={bodySize} topMargin={topMargin} bottomMargin={bottomMargin} onSelectSection={selectSection} onSelectLine={selectLine} /></div><div className="rbd-editor__settings">{showMarginSettings ? <DesktopMarginSettings topMargin={topMargin} bottomMargin={bottomMargin} onTopMarginChange={setTopMargin} onBottomMarginChange={setBottomMargin} /> : selectedSection === 'body' ? <DesktopBodySettings font={bodyFont} size={bodySize} onFontChange={setBodyFont} onSizeChange={setBodySize} /> : activeKind && activeLine ? <DesktopReceiptLineSettings key={`${activeKind}-${activeLine.id}`} kind={activeKind} line={activeLine} shouldFocus={focusNewLine} onChange={updateLine} onTextChange={(text) => { draftTextRef.current = text }} onAdd={() => addLine(activeKind)} onRemove={removeLine} onFocusLeave={handleSettingsFocusLeave} /> : <><div className="rbd-editor__hint"><div className="rbd-editor__illustration-viewport"><img className="rbd-editor__illustration" src={`${import.meta.env.BASE_URL}empty%20illustration_customer%20receipt.svg`} alt="" /></div><p>Click the part of the receipt you want to edit.</p></div><div className="rbd-editor__buttons"><VegaButton className="rbd-editor__button" label="Add Footer Line" variant="secondary" onVegaClick={() => addLine('footer')} /><VegaButton className="rbd-editor__button" label="Add Header Line" variant="primary" onVegaClick={() => addLine('header')} /></div></>}</div></div>
    <DesktopLogoPickerModal open={isLogoPickerOpen} savedLogoUrl={logoUrl} onClose={closeLogoPicker} onSave={setLogoUrl} />
  </>
}
export default CustomerReceiptDesktopApp
