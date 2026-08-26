const ICON_BASE = `${import.meta.env.BASE_URL}icons/`

export const DISCARD_CHANGES_ACTION_ICON_SRC = `${ICON_BASE}discard_blue.svg`
const DISCARD_CHANGES_NEUTRAL_ICON_SRC = `${ICON_BASE}discard-changes.svg`

type DiscardChangesIconProps = Readonly<{
  tone?: 'action' | 'neutral'
  size?: number
  disabled?: boolean
  className?: string
}>

export default function DiscardChangesIcon({
  tone = 'action',
  size = 16,
  disabled = false,
  className,
}: DiscardChangesIconProps) {
  return (
    <img
      src={tone === 'action' ? DISCARD_CHANGES_ACTION_ICON_SRC : DISCARD_CHANGES_NEUTRAL_ICON_SRC}
      alt=""
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size, objectFit: 'contain', opacity: disabled ? 0.5 : 1 }}
    />
  )
}