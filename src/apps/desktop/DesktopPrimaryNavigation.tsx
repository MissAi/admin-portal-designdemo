import { useEffect } from 'react'
import {
  BarChart3,
  CreditCard,
  FileText,
  Image,
  LayoutDashboard,
  Link2,
  MapPin,
  Phone,
  RefreshCw,
  Sparkles,
  Store,
  Tag,
  Users,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './DesktopPrimaryNavigation.css'

export type PrimaryNavigationScope = 'account' | 'location'

type PrimaryNavigationItem = Readonly<{
  label: string
  icon: LucideIcon
  route?: string
}>

const ACCOUNT_ITEMS: readonly PrimaryNavigationItem[] = [
  { label: 'Account Info', icon: FileText },
  { label: 'Locations', icon: MapPin },
  { label: 'Account Menu', icon: UtensilsCrossed, route: '/d/ResponsiveButtonsDemo' },
  { label: 'Loyalty Setup', icon: Tag },
  { label: 'Image Library', icon: Image },
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Reports', icon: BarChart3 },
  { label: 'Tools', icon: Wrench },
  { label: 'Call Center', icon: Phone },
  { label: 'Users', icon: Users, route: '/d/account-permissions' },
  { label: 'Billing', icon: CreditCard },
  { label: 'Heartland Info Central', icon: Link2 },
]

const LOCATION_ITEMS: readonly PrimaryNavigationItem[] = [
  { label: 'Account Info', icon: FileText },
  { label: 'Location Setup', icon: Store, route: '/d/customer-receipt' },
  { label: 'Menu', icon: UtensilsCrossed },
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Reports', icon: BarChart3 },
  { label: 'Integrations', icon: RefreshCw },
  { label: 'Call Center', icon: Phone },
  { label: 'Heartland Info Central', icon: Link2 },
]

type DesktopPrimaryNavigationProps = Readonly<{
  accountName: string
  scope: PrimaryNavigationScope
  activeItem?: string
  location?: string
  onClose: () => void
}>

export function DesktopPrimaryNavigation({
  accountName,
  scope,
  activeItem,
  location,
  onClose,
}: DesktopPrimaryNavigationProps) {
  const navigate = useNavigate()
  const items = scope === 'account' ? ACCOUNT_ITEMS : LOCATION_ITEMS

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  const selectItem = (item: PrimaryNavigationItem) => {
    if (item.route) {
      let route = item.route
      if (item.label === 'Location Setup' && location) {
        route = `${item.route}?location=${encodeURIComponent(location)}`
      }
      void navigate(route)
    }
    onClose()
  }

  return (
    <dialog
      open
      className="desktop-primary-navigation"
      aria-label={`${scope === 'account' ? 'Account' : 'Location'} navigation`}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <button
        type="button"
        className="desktop-primary-navigation__backdrop"
        aria-label="Close navigation"
        onClick={onClose}
      />
      <aside
        className="desktop-primary-navigation__drawer"
      >
        <div className="desktop-primary-navigation__account">
          <strong>{accountName}</strong>
          <button type="button" aria-label="Switch account">
            <span aria-hidden="true">⌄</span>
          </button>
        </div>
        <div className="desktop-primary-navigation__genius">
          <Sparkles aria-hidden="true" />
          <span>Genius AI</span>
        </div>
        <nav aria-label={`${scope === 'account' ? 'Account' : 'Location'} primary sections`}>
          <ul>
            {items.map((item) => {
              const Icon = item.icon
              const isActive = item.label === activeItem
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    className={isActive ? 'is-active' : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => selectItem(item)}
                  >
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </dialog>
  )
}