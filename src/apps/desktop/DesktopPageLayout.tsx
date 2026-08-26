import type { ComponentProps, ReactNode } from 'react'
import { DesktopGlobalHeader } from './DesktopGlobalHeader'
import './DesktopPage.css'
import './DesktopPageLayout.css'

type DesktopPageLayoutProps = Readonly<{
  headerProps: ComponentProps<typeof DesktopGlobalHeader>
  navigation: ReactNode
  children: ReactNode
}>

export function DesktopPageLayout({
  headerProps,
  navigation,
  children,
}: DesktopPageLayoutProps) {
  return (
    <div className="desktop-page desktop-page-layout">
      <DesktopGlobalHeader {...headerProps} />
      <div className="desktop-page-layout__body">
        <aside className="desktop-page-layout__navigation">{navigation}</aside>
        <main className="desktop-page-layout__settings">{children}</main>
      </div>
    </div>
  )
}