import type { ReactNode } from 'react'
import { useDesktopFeatureName } from './DesktopPageLayout'
import './DesktopSettingsArea.css'

type DesktopSettingsAreaProps = Readonly<{
  header: ReactNode
  secondaryHeader?: ReactNode
  children: ReactNode
  ariaLabel?: string
  className?: string
}>

export function DesktopSettingsArea({
  header,
  secondaryHeader,
  children,
  ariaLabel = 'Settings',
  className = '',
}: DesktopSettingsAreaProps) {
  const featureName = useDesktopFeatureName()

  return (
    <section className={`desktop-settings-area ${className}`.trim()} aria-label={ariaLabel}>
      <div className="desktop-settings-area__header">
        <div className="desktop-settings-area__header-row">
          <h1 className="desktop-settings-area__feature-title">{featureName}</h1>
          <div className="desktop-settings-area__header-content">{header}</div>
        </div>
        {secondaryHeader && <div className="desktop-settings-area__secondary-header">{secondaryHeader}</div>}
      </div>
      <div className="desktop-settings-area__surface">{children}</div>
    </section>
  )
}