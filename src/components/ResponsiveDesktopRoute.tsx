import type { ReactNode } from 'react'
import './ResponsiveDesktopRoute.css'

type ResponsiveDesktopRouteProps = Readonly<{
  desktop: ReactNode
  mobile: ReactNode
}>

export default function ResponsiveDesktopRoute({ desktop, mobile }: ResponsiveDesktopRouteProps) {
  return (
    <div className="responsive-desktop-route">
      <div className="responsive-desktop-route__desktop">{desktop}</div>
      <div className="responsive-desktop-route__mobile">{mobile}</div>
    </div>
  )
}