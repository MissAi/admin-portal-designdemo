import type { ReactNode } from 'react'
import PageSaveButton from '../../components/PageSaveButton'
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
  requiredValues?: readonly (string | number | boolean | readonly unknown[] | null | undefined)[]
  isDirty?: boolean
}>

export function DesktopItemEditorHeader({
  title,
  collapsedActions,
  iconActions,
  labeledActions,
  onBack,
  onSave,
  saveLabel = 'Save',
  requiredValues = [],
  isDirty = false,
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
        <PageSaveButton
          className="desktop-item-editor-header__save"
          label={saveLabel}
          requiredValues={requiredValues}
          isDirty={isDirty}
          onSave={onSave}
        />
      </div>
    </div>
  )
}