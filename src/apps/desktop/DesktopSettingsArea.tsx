import type { ReactNode } from 'react'
import './DesktopSettingsArea.css'

type DesktopSettingsAreaProps = Readonly<{
  header: ReactNode
  children: ReactNode
  ariaLabel?: string
  className?: string
}>

export function DesktopSettingsArea({
  header,
  children,
  ariaLabel = 'Settings',
  className = '',
}: DesktopSettingsAreaProps) {
  return (
    <section className={`desktop-settings-area ${className}`.trim()} aria-label={ariaLabel}>
      <div className="desktop-settings-area__header">{header}</div>
      <div className="desktop-settings-area__surface">{children}</div>
    </section>
  )
}