import { createContext, useContext, useState, type ComponentProps, type ReactNode } from 'react'
import { DesktopGlobalHeader } from './DesktopGlobalHeader'
import { DesktopPrimaryNavigation, type PrimaryNavigationScope } from './DesktopPrimaryNavigation'
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
  primaryNavigation?: Readonly<{
    scope: PrimaryNavigationScope
    activeItem?: string
  }>
  children: ReactNode
}>

export function DesktopPageLayout({
  headerProps,
  navigation,
  currentFeatureName,
  primaryNavigation,
  children,
}: DesktopPageLayoutProps) {
  const [isPrimaryNavigationOpen, setIsPrimaryNavigationOpen] = useState(false)
  const scope = primaryNavigation?.scope
    ?? (headerProps.location.toLowerCase() === 'all locations' ? 'account' : 'location')
  const handleMenuClick = () => {
    headerProps.onMenuClick?.()
    setIsPrimaryNavigationOpen(true)
  }

  return (
    <DesktopFeatureNameContext.Provider value={currentFeatureName}>
      <div className="desktop-page desktop-page-layout">
        <DesktopGlobalHeader {...headerProps} onMenuClick={handleMenuClick} />
        <div className="desktop-page-layout__body">
          <aside className="desktop-page-layout__navigation">{navigation}</aside>
          <main className="desktop-page-layout__settings">{children}</main>
        </div>
        {isPrimaryNavigationOpen && (
          <DesktopPrimaryNavigation
            accountName={headerProps.title}
            scope={scope}
            activeItem={primaryNavigation?.activeItem}
            location={headerProps.location}
            onClose={() => setIsPrimaryNavigationOpen(false)}
          />
        )}
      </div>
    </DesktopFeatureNameContext.Provider>
  )
}