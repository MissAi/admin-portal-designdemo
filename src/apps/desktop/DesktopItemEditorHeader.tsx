import type { ReactNode } from 'react'
import { VegaButton } from '@globalpayments/vega-react'
import ResponsiveActionGroup from '../../components/ResponsiveActionGroup'
import './DesktopItemEditorHeader.css'

const ICON_BASE = `${import.meta.env.BASE_URL}icons/`

type DesktopItemEditorHeaderProps = Readonly<{
  title: string
  collapsedActions: ReactNode
  iconActions: ReactNode
  labeledActions: ReactNode
  onBack: () => void
  onSave: () => void
  saveLabel?: string
  saveDisabled?: boolean
}>

export function DesktopItemEditorHeader({
  title,
  collapsedActions,
  iconActions,
  labeledActions,
  onBack,
  onSave,
  saveLabel = 'Save',
  saveDisabled = false,
}: DesktopItemEditorHeaderProps) {
  return (
    <div className="desktop-item-editor-header">
      <div className="desktop-item-editor-header__identity">
        <button
          type="button"
          className="desktop-item-editor-header__back"
          aria-label="Back"
          onClick={onBack}
        >
          <img src={`${ICON_BASE}arrow_back.svg`} alt="" aria-hidden="true" />
        </button>
        <h1 className="desktop-item-editor-header__title">{title}</h1>
      </div>

      <div className="desktop-item-editor-header__commands">
        <ResponsiveActionGroup
          collapsed={collapsedActions}
          icons={iconActions}
          labels={labeledActions}
        />
        <VegaButton
          className="desktop-item-editor-header__save"
          label={saveLabel}
          variant="primary"
          size="default"
          type="button"
          disabled={saveDisabled}
          onClick={onSave}
        />
      </div>
    </div>
  )
}