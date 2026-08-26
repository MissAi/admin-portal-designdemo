import { useState, type FC } from 'react'
import { VegaButton, VegaInput, VegaInputSelect, VegaTabGroup } from '@globalpayments/vega-react'
import { DesktopFormLayout } from './DesktopFormLayout'
import { DesktopGlobalHeader } from './DesktopGlobalHeader'
import { DesktopLogoPickerModal } from './DesktopLogoPickerModal'
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

type IconName = 'menu' | 'pin' | 'chevron' | 'upload' | 'help' | 'account' | 'undo'
function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'menu') return <svg {...common}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
  if (name === 'pin') return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
  if (name === 'chevron') return <svg {...common}><polyline points="7 10 12 15 17 10" /></svg>
  if (name === 'upload') return <svg {...common}><path d="M4 17v3h16v-3" /><path d="m8 9 4-4 4 4" /><line x1="12" y1="5" x2="12" y2="16" /></svg>
  if (name === 'help') return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.7 2.7 0 1 1 4.5 2c-1.5 1-2 1.5-2 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
  if (name === 'undo') return <svg {...common}><path d="M9 7 5 11l4 4" /><path d="M5 11h8a6 6 0 1 1-6 6" /></svg>
  return <svg {...common}><circle cx="12" cy="8" r="3" /><path d="M5 21a7 7 0 0 1 14 0" /></svg>
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

function ReceiptPreview({ selectedSection, logoUrl, onSelectSection }: Readonly<{ selectedSection: ReceiptSectionId | null; logoUrl: string | null; onSelectSection: (section: ReceiptSectionId) => void }>) {
  const sectionProps = (sectionId: ReceiptSectionId) => getReceiptSectionProps(sectionId, selectedSection, onSelectSection)
  return <div className="rbd-receipt-preview-frame"><div className="rbd-receipt-preview__rail" /><section className="rbd-receipt-preview" aria-label="Receipt preview"><p {...sectionProps('top-margin')} className={`${sectionProps('top-margin').className} rbd-receipt-preview__muted rbd-receipt-preview__margin-row`}><span>(Top Margin)</span></p><div {...sectionProps('logo')} className={`${sectionProps('logo').className} rbd-logo-placeholder-row`}>{logoUrl ? <img className="rbd-receipt-logo" src={logoUrl} alt="Selected receipt logo" /> : <div className="rbd-logo-placeholder"><span className="rbd-logo-placeholder__plus" aria-hidden="true" /><span>Set<br />Logo</span></div>}</div><h2 {...sectionProps('header')} className={`${sectionProps('header').className} rbd-receipt-preview__message-row`}>Welcome to Our Restaurant!</h2><ReceiptBodySample {...sectionProps('body')} /><h2 {...sectionProps('footer')} className={`${sectionProps('footer').className} rbd-receipt-preview__message-row`}>Thank you for visiting us!</h2><p {...sectionProps('bottom-margin')} className={`${sectionProps('bottom-margin').className} rbd-receipt-preview__muted rbd-receipt-preview__margin-row`}><span>(Bottom Margin)</span></p></section><img className="rbd-receipt-preview__footer-edge" src={`${import.meta.env.BASE_URL}receipt%20footer.svg`} alt="" /></div>
}

function ReceiptBodySample(props: ReturnType<typeof getReceiptSectionProps>) {
  return <div {...props} className={`${props.className} rbd-receipt-preview__body-sample`}>
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
  return <div className="rbd-page desktop-page">
    <DesktopGlobalHeader
      title="Redwood Grill"
      subtitle={isLocationSetup ? 'Location Setup' : 'Menu'}
      location={location}
      locations={LOCATIONS}
      onLocationSelect={chooseLocation}
    />
    {isLocationSetup ? <div className="rbd-body"><DesktopSideNavigation items={SETTINGS_NAV} selectedItem={section} ariaLabel="Location setup sections" onSelect={setSection} /><main className="rbd-main">{!showCustomerReceipt ? <LocationSettings location={location} /> : <CustomerReceiptSettings tab={tab} setTab={setTab} settings={settings} setSettings={setSettings} />}</main></div> : <div className="rbd-start-message"><h1>Choose a location to begin</h1><p>Select <strong>All Locations</strong> in the global header, then choose <strong>Ange - Mobile Save</strong>.</p></div>}
  </div>
}

function CustomerReceiptSettings({ tab, setTab, settings, setSettings }: Readonly<{ tab: string; setTab: (tab: string) => void; settings: Record<string, boolean>; setSettings: (settings: Record<string, boolean>) => void }>) {
  return <DesktopSettingsArea className="customer-receipt-settings-area" ariaLabel="Customer receipt settings" header={<><div className="rbd-page-actions"><button type="button" className="rbd-undo" aria-label="Discard changes"><Icon name="undo" /></button><VegaButton label="Save" variant="primary" disabled size="small" /></div><VegaTabGroup className="rbd-customer-tabs" variant="primary" gap="size-8" showCloseButton={false} tabItems={RECEIPT_TABS} selectedTabDataTarget={tab} onVegaClick={(event: CustomEvent<string>) => setTab(event.detail)} /></>}>
    {tab === 'receipt-display' && <DesktopFormLayout ariaLabel="Receipt display form"><Display settings={settings} setSettings={setSettings} /></DesktopFormLayout>}
    {tab === 'receipt-editor' && <DesktopFormLayout ariaLabel="Receipt editor form"><Editor /></DesktopFormLayout>}
    {tab === 'receipt-email' && <DesktopFormLayout ariaLabel="Email receipts form"><div className="rbd-empty-state">Email receipt settings</div></DesktopFormLayout>}
  </DesktopSettingsArea>
}

function LocationSettings({ location }: { location: string }) { const [locationName, setLocationName] = useState(location); const [language, setLanguage] = useState('Account Default'); return <section className="rbd-location-settings"><div className="rbd-page-actions"><button type="button" className="rbd-undo" aria-label="Discard changes"><Icon name="undo" /></button><VegaButton label="Save" variant="primary" disabled size="small" /></div><div className="rbd-location-banner"><span>Bring your menus to life<br />with digital menu boards</span></div><div className="rbd-settings-tabs"><span className="is-active">Location Info</span><span>App Settings</span><span>Payroll Settings</span><span>Transaction Settings</span></div><section className="rbd-location-form"><h1>Location Info</h1><div className="rbd-location-form__top"><div className="rbd-logo-tile">Set Logo</div><div><Field label="Location Number" value="3412520003" disabled /><Field label="Reseller" value="7498reseller" disabled /></div></div><Field label="Location Name *" value={locationName} onChange={setLocationName} /><Field label="Country *" value="United States" disabled /><Field label="Language" value={language} onChange={setLanguage} /></section></section> }
function Field({ label, value, disabled, onChange }: { label: string; value: string; disabled?: boolean; onChange?: (value: string) => void }) { return <VegaInput label={label} value={value} disabled={disabled} onVegaChange={onChange ? (event: Event) => onChange(getVegaValue(event)) : undefined} /> }
function Display({ settings, setSettings }: { settings: Record<string, boolean>; setSettings: (settings: Record<string, boolean>) => void }) { const [modifierVisibility, setModifierVisibility] = useState('hide-all'); const toggle = (key: string) => setSettings({ ...settings, [key]: !settings[key] }); return <div className="rbd-display-form"><CheckField label="Hide Separator Lines" checked={settings.separator} onChange={() => toggle('separator')} /><CheckField label="Show Promised Time" checked={settings.promise} onChange={() => toggle('promise')} /><CheckField label="Show Surcharge Clause" checked={settings.surcharge} onChange={() => toggle('surcharge')} /><CheckField label="Roll Up Modifiers Prices" checked={settings.modifiers} onChange={() => toggle('modifiers')} /><CheckField label="Roll Up Duplicates" checked={settings.duplicates} onChange={() => toggle('duplicates')} /><VegaInputSelect label="Modifiers" selectType="single" source={[{ id: 'hide-all', displayName: 'Hide All' }, { id: 'show-all', displayName: 'Show All' }]} value={modifierVisibility} vegaDropdownProps={{ searchable: false }} onVegaChange={(event: Event) => setModifierVisibility(getVegaValue(event))} /><CheckField label="Show Seat Details" checked={settings.seat} onChange={() => toggle('seat')} /><CheckField label="Show Tax-Inclusive Details" checked={settings.tax} onChange={() => toggle('tax')} /></div> }
function Editor() {
  const [selectedSection, setSelectedSection] = useState<ReceiptSectionId | null>(null)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isLogoPickerOpen, setIsLogoPickerOpen] = useState(false)
  const selectSection = (nextSection: ReceiptSectionId) => {
    setSelectedSection(nextSection)
    if (nextSection === 'logo') setIsLogoPickerOpen(true)
  }
  return <>
    <div className="rbd-editor"><div className="rbd-editor__preview-pane"><ReceiptPreview selectedSection={selectedSection} logoUrl={logoUrl} onSelectSection={selectSection} /></div><div className="rbd-editor__settings"><div className="rbd-editor__hint"><div className="rbd-editor__illustration-viewport"><img className="rbd-editor__illustration" src={`${import.meta.env.BASE_URL}empty%20illustration_customer%20receipt.svg`} alt="" /></div><p>Click the part of the receipt you want to edit.</p></div><div className="rbd-editor__buttons"><VegaButton className="rbd-editor__button" label="Add Footer Line" variant="secondary" /><VegaButton className="rbd-editor__button" label="Add Header Line" variant="primary" /></div></div></div>
    <DesktopLogoPickerModal open={isLogoPickerOpen} savedLogoUrl={logoUrl} onClose={() => setIsLogoPickerOpen(false)} onSave={setLogoUrl} />
  </>
}
export default CustomerReceiptDesktopApp
