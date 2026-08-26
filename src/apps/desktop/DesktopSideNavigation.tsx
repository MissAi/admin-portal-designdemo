import './DesktopSideNavigation.css'

type DesktopSideNavigationProps = Readonly<{
  items: readonly string[]
  selectedItem: string
  ariaLabel: string
  onSelect?: (item: string) => void
}>

export function DesktopSideNavigation({
  items,
  selectedItem,
  ariaLabel,
  onSelect,
}: DesktopSideNavigationProps) {
  return (
    <nav className="desktop-side-navigation" aria-label={ariaLabel}>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <button
              type="button"
              className={item === selectedItem ? 'is-active' : undefined}
              aria-current={item === selectedItem ? 'page' : undefined}
              onClick={() => onSelect?.(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
