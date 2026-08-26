import { createContext, useContext, type ComponentProps, type ReactNode } from 'react'
import { DesktopGlobalHeader } from './DesktopGlobalHeader'
import './DesktopPage.css'
import './DesktopPageLayout.css'

const DesktopFeatureNameContext = createContext('')

export function useDesktopFeatureName() {
  return useContext(DesktopFeatureNameContext)
}

type DesktopPageLayoutProps = Readonly<{
  headerProps: ComponentProps<typeof DesktopGlobalHeader>
  navigation: ReactNode
  currentFeatureName: string
  children: ReactNode
}>

export function DesktopPageLayout({
  headerProps,
  navigation,
  currentFeatureName,
  children,
}: DesktopPageLayoutProps) {
  return (
    <DesktopFeatureNameContext.Provider value={currentFeatureName}>
      <div className="desktop-page desktop-page-layout">
        <DesktopGlobalHeader {...headerProps} />
        <div className="desktop-page-layout__body">
          <aside className="desktop-page-layout__navigation">{navigation}</aside>
          <main className="desktop-page-layout__settings">{children}</main>
        </div>
      </div>
    </DesktopFeatureNameContext.Provider>
  )
}