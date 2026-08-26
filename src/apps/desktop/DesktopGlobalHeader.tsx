import { useState } from 'react'
import './DesktopGlobalHeader.css'

const ICON_BASE = `${import.meta.env.BASE_URL}icons/`

type DesktopGlobalHeaderProps = Readonly<{
  title: string
  subtitle: string
  location: string
  locations?: readonly string[]
  onLocationSelect?: (location: string) => void
  onMenuClick?: () => void
}>

export function DesktopGlobalHeader({
  title,
  subtitle,
  location,
  locations = [location],
  onLocationSelect,
  onMenuClick,
}: DesktopGlobalHeaderProps) {
  const [locationMenuOpen, setLocationMenuOpen] = useState(false)

  const selectLocation = (nextLocation: string) => {
    onLocationSelect?.(nextLocation)
    setLocationMenuOpen(false)
  }

  return (
    <header className="desktop-global-header">
      <div className="desktop-global-header__identity">
        <button
          type="button"
          className="desktop-global-header__control desktop-global-header__menu"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <img src={`${ICON_BASE}Interface%20Setting%20Menu%201.svg`} alt="" />
        </button>
        <div className="desktop-global-header__title">
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </div>
      </div>

      <div className="desktop-global-header__actions">
        <button
          type="button"
          className="desktop-global-header__control desktop-global-header__genius"
          aria-label="Genius AI"
        >
          <span className="desktop-global-header__genius-mark" aria-hidden="true">✦</span>
          <span>Genius AI</span>
        </button>
        <div className="desktop-global-header__location-wrap">
          <button
            type="button"
            className="desktop-global-header__control desktop-global-header__location"
            aria-expanded={locationMenuOpen}
            onClick={() => setLocationMenuOpen((isOpen) => !isOpen)}
          >
            <img src={`${ICON_BASE}fa-glyph-wrapper-4.svg`} alt="" />
            <span>{location}</span>
            <img src={`${ICON_BASE}fa-glyph-wrapper-2.svg`} alt="" />
          </button>
          {locationMenuOpen && (
            <div className="desktop-global-header__location-menu" role="menu">
              {locations.map((item) => (
                <button
                  type="button"
                  role="menuitem"
                  key={item}
                  className={item === location ? 'is-selected' : undefined}
                  onClick={() => selectLocation(item)}
                >
                  <span aria-hidden="true">{item === location ? '✓' : ''}</span>
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="desktop-global-header__control desktop-global-header__icon-control desktop-global-header__publish"
          aria-label="Publish"
        >
          <img src={`${ICON_BASE}fa-glyph-wrapper-1.svg`} alt="" />
        </button>
        <button
          type="button"
          className="desktop-global-header__control desktop-global-header__icon-control desktop-global-header__resource"
          aria-label="Resource center"
        >
          <img src={`${ICON_BASE}fa-glyph-wrapper.svg`} alt="" />
        </button>
        <button
          type="button"
          className="desktop-global-header__control desktop-global-header__avatar"
          aria-label="Account menu"
        >
          <img src={`${ICON_BASE}fa-glyph-wrapper-3.svg`} alt="" />
          <img src={`${ICON_BASE}fa-glyph-wrapper-2.svg`} alt="" />
        </button>
      </div>
    </header>
  )
}
