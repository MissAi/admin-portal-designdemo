import type { ReactNode } from 'react'
import './ResponsiveActionGroup.css'

type ResponsiveActionGroupProps = Readonly<{
  collapsed: ReactNode
  icons: ReactNode
  labels: ReactNode
  ariaLabel?: string
}>

export default function ResponsiveActionGroup({
  collapsed,
  icons,
  labels,
  ariaLabel = 'Page actions',
}: ResponsiveActionGroupProps) {
  return (
    <div className="responsive-action-group" role="toolbar" aria-label={ariaLabel}>
      <div className="responsive-action-group__collapsed">{collapsed}</div>
      <div className="responsive-action-group__icons">{icons}</div>
      <div className="responsive-action-group__labels">{labels}</div>
    </div>
  )
}