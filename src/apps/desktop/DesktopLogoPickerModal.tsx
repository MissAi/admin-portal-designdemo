import { useEffect, useRef, useState } from 'react'
import { VegaButton, VegaModal } from '@globalpayments/vega-react'

type LogoItem = {
  id: string
  name: string
  url: string
}

type DesktopLogoPickerModalProps = Readonly<{
  open: boolean
  savedLogoUrl: string | null
  onClose: () => void
  onSave: (logoUrl: string | null) => void
}>

const bundledLogoModules = import.meta.glob('../../assets/mock-logos/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const bundledLogos: LogoItem[] = Object.entries(bundledLogoModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .slice(0, 8)
  .map(([filePath, url], index) => ({ id: filePath, name: `Logo ${index + 1}`, url }))

export function DesktopLogoPickerModal({ open, savedLogoUrl, onClose, onSave }: DesktopLogoPickerModalProps) {
  const [logoItems, setLogoItems] = useState<LogoItem[]>(bundledLogos)
  const [selectedLogoUrl, setSelectedLogoUrl] = useState<string | null>(savedLogoUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setSelectedLogoUrl(savedLogoUrl)
  }, [open, savedLogoUrl])

  return <VegaModal
    className="rbd-logo-picker"
    open={open}
    size={900}
    height="730px"
    contentMaxHeight="calc(100vh - 64px)"
    backdrop="static"
    corners="rounded-8"
    margin={{ x: 'auto' }}
    isVerticallyCentered
    padding={{ header: 'size-24', content: '0', footer: 'size-24' }}
    showCloseButton
    handleClose={() => true}
    onVegaClose={onClose}
  >
    <div slot="modal-title">Logos</div>
    <div slot="modal-content" className="rbd-logo-picker__content">
      <div className="rbd-logo-picker__grid">
        <button type="button" className="rbd-logo-picker__upload" onClick={() => fileInputRef.current?.click()}>
          <span className="rbd-logo-picker__upload-plus" aria-hidden="true">+</span>
          <strong>Upload Logo</strong>
          <span>Only *.jpg, *jpeg, *.png,<br />*.gif</span>
        </button>

        {logoItems.map((logo) => {
          const isSelected = selectedLogoUrl === logo.url
          return <article className={`rbd-logo-picker__card${isSelected ? ' is-selected' : ''}`} key={logo.id}>
            <button
              type="button"
              className="rbd-logo-picker__image"
              aria-label={`Select ${logo.name}`}
              aria-pressed={isSelected}
              onClick={() => setSelectedLogoUrl(logo.url)}
            >
              <img src={logo.url} alt="" />
              {isSelected && <img className="rbd-logo-picker__check" src={`${import.meta.env.BASE_URL}icons/checkmark.svg`} alt="Selected" />}
            </button>
            <div className="rbd-logo-picker__meta">
              <span>{logo.name}</span>
              <button type="button" aria-label={`Delete ${logo.name}`} onClick={() => {
                setLogoItems((items) => items.filter((item) => item.id !== logo.id))
                setSelectedLogoUrl((current) => current === logo.url ? null : current)
              }}>
                <img src={`${import.meta.env.BASE_URL}icons/delete.svg`} alt="" />
              </button>
            </div>
          </article>
        })}
      </div>

      <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.gif" hidden onChange={(event) => {
        const file = event.currentTarget.files?.[0]
        if (!file) return
        const uploadedLogo = {
          id: `${file.name}-${Date.now()}`,
          name: file.name.replace(/\.[^.]+$/, ''),
          url: URL.createObjectURL(file),
        }
        setLogoItems((items) => [uploadedLogo, ...items])
        setSelectedLogoUrl(uploadedLogo.url)
        event.currentTarget.value = ''
      }} />
    </div>
    <div slot="modal-footer" className="rbd-logo-picker__footer">
      <VegaButton label="Reset To Default" variant="secondary" size="small" onVegaClick={() => setSelectedLogoUrl(null)} />
      <VegaButton label="Save" variant="primary" size="small" disabled={selectedLogoUrl === savedLogoUrl} onVegaClick={() => {
        onSave(selectedLogoUrl)
        onClose()
      }} />
    </div>
  </VegaModal>
}