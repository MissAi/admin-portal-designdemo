import type { ReactNode } from 'react'
import './DesktopFormLayout.css'

type DesktopFormLayoutProps = Readonly<{
  children: ReactNode
  ariaLabel?: string
}>

export function DesktopFormLayout({ children, ariaLabel }: DesktopFormLayoutProps) {
  return (
    <div className="desktop-form-layout" aria-label={ariaLabel}>
      <div className="desktop-form-layout__form">{children}</div>
    </div>
  )
}