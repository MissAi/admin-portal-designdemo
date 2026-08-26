import { VegaButton } from '@globalpayments/vega-react'

type RequiredValue = string | number | boolean | readonly unknown[] | null | undefined

function isFilled(value: RequiredValue) {
  if (typeof value === 'string') return value.trim().length > 0
  if (typeof value === 'number') return Number.isFinite(value)
  if (typeof value === 'boolean') return value
  if (Array.isArray(value)) return value.length > 0
  return value != null
}

type PageSaveButtonProps = Readonly<{
  requiredValues?: readonly RequiredValue[]
  isDirty?: boolean
  onSave?: () => void
  label?: string
  size?: 'small' | 'default' | 'large'
  className?: string
}>

function isPageSaveEnabled(
  requiredValues: readonly RequiredValue[] = [],
  isDirty = false,
) {
  return requiredValues.length > 0
    ? requiredValues.every(isFilled)
    : isDirty
}

export default function PageSaveButton({
  requiredValues = [],
  isDirty = false,
  onSave,
  label = 'Save',
  size = 'default',
  className,
}: PageSaveButtonProps) {
  const isEnabled = isPageSaveEnabled(requiredValues, isDirty)

  return (
    <VegaButton
      className={className}
      label={label}
      variant="primary"
      size={size}
      type="button"
      disabled={!isEnabled}
      onClick={onSave}
    />
  )
}