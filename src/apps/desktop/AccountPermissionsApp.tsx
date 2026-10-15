import { useEffect, useState } from 'react'
import { VegaCheckbox, VegaInput } from '@globalpayments/vega-react'
import { useNavigate, useParams } from 'react-router-dom'
import PageSaveButton from '../../components/PageSaveButton'
import { DesktopFormLayout } from './DesktopFormLayout'
import { DesktopItemEditorHeader } from './DesktopItemEditorHeader'
import { DesktopPageLayout } from './DesktopPageLayout'
import { DesktopSettingsArea } from './DesktopSettingsArea'
import { DesktopSideNavigation } from './DesktopSideNavigation'
import './AccountPermissionsApp.css'

const ACCOUNT_NAVIGATION = ['Users', 'Permissions', 'MFA Settings']
const ACCOUNT_LOCATIONS = ['All locations', 'Ange - Mobile Save', 'Gioia Loc', 'Gioia Loc RN', 'Rebecca APv2', 'Rebecca Loc', 'Rebecca Loc RN']

type MenuPermissionKey = 'administration' | 'view' | 'pricing' | 'availability' | 'discounts'

type MenuPermissions = Record<MenuPermissionKey, boolean>

type SimplePermissionKey = 'publish' | 'audit' | 'locationSetup' | 'staff' | 'loyalty' | 'reports'

type SimplePermissions = Record<SimplePermissionKey, boolean>

const EMPTY_MENU_PERMISSIONS: MenuPermissions = {
  administration: false,
  view: false,
  pricing: false,
  availability: false,
  discounts: false,
}

const EMPTY_SIMPLE_PERMISSIONS: SimplePermissions = {
  publish: false,
  audit: false,
  locationSetup: false,
  staff: false,
  loyalty: false,
  reports: false,
}

const SIMPLE_PERMISSIONS: ReadonlyArray<{
  key: SimplePermissionKey
  label: string
  description: string
  position: 'before' | 'after'
}> = [
  { key: 'publish', label: 'Publish Changes', description: 'Allow access to publish changes.', position: 'before' },
  { key: 'audit', label: 'Audit Trail', description: 'Allows access to audit trail log on pages where this role has access and can edit.', position: 'before' },
  { key: 'locationSetup', label: 'Location Setup', description: 'Allows access to edit pages under the setup tab.', position: 'before' },
  { key: 'staff', label: 'Staff Members', description: 'Allows access to edit staff related pages.', position: 'before' },
  { key: 'loyalty', label: 'Loyalty', description: 'Allows access to edit loyalty pages.', position: 'after' },
  { key: 'reports', label: 'All Reports', description: 'Allows access to run any current and future reports.', position: 'after' },
]

const MENU_PERMISSION_ROWS: ReadonlyArray<{
  key: Exclude<MenuPermissionKey, 'administration'>
  label: string
  description: string
}> = [
  {
    key: 'view',
    label: 'View Location Menu',
    description: 'Provides read-only access to the location menu.',
  },
  {
    key: 'pricing',
    label: 'Pricing Overrides',
    description: 'Allows editing price fields for menu items and modifiers at the location level.',
  },
  {
    key: 'availability',
    label: 'Availability Overrides',
    description: 'Allows toggling availability overrides for the location: Available Online and In-Store E-Commerce.',
  },
  {
    key: 'discounts',
    label: 'Discounts & Adjustments',
    description: 'Allows local management of promotions, discounts, and adjustments.',
  },
]

function updateMenuPermissions(
  permissions: MenuPermissions,
  key: MenuPermissionKey,
  checked: boolean,
): MenuPermissions {
  if (key === 'administration') {
    if (checked) {
      return {
        administration: true,
        view: true,
        pricing: true,
        availability: true,
        discounts: true,
      }
    }

    return {
      administration: false,
      view: true,
      pricing: false,
      availability: false,
      discounts: false,
    }
  }

  if (key === 'view' && !checked) {
    return { ...EMPTY_MENU_PERMISSIONS }
  }

  if (key !== 'view' && checked) {
    return { ...permissions, [key]: true, view: true }
  }

  return { ...permissions, [key]: checked }
}

function PermissionCheckbox({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: Readonly<{
  label: string
  description?: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}>) {
  return (
    <div className={`account-permission-checkbox${description ? ' account-permission-checkbox--described' : ''}`}>
      <VegaCheckbox
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onVegaUserChange={(event: CustomEvent<string | boolean>) => onChange(Boolean(event.detail))}
      >
        {label}
      </VegaCheckbox>
      {description && <p>{description}</p>}
    </div>
  )
}

function MenuPermissionsEditor({
  name,
  permissions,
  simplePermissions,
  onNameChange,
  onPermissionChange,
  onSimplePermissionChange,
}: Readonly<{
  name: string
  permissions: MenuPermissions
  simplePermissions: SimplePermissions
  onNameChange: (value: string) => void
  onPermissionChange: (key: MenuPermissionKey, checked: boolean) => void
  onSimplePermissionChange: (key: SimplePermissionKey, checked: boolean) => void
}>) {
  const simpleFields = (position: 'before' | 'after') => SIMPLE_PERMISSIONS
    .filter((permission) => permission.position === position)
    .map((permission) => (
      <section className="account-simple-permission" key={permission.key}>
        <h2>{permission.label}</h2>
        <div className="account-simple-permission__control">
          <PermissionCheckbox
            label={permission.description}
            checked={simplePermissions[permission.key]}
            onChange={(checked) => onSimplePermissionChange(permission.key, checked)}
          />
        </div>
      </section>
    ))

  return (
    <div className="account-permissions-form">
      <VegaInput
        label="Name"
        required
        value={name}
        onVegaChange={(event: Event) => onNameChange(String((event.currentTarget as HTMLInputElement).value ?? ''))}
      />

      <div className="account-permissions-fields">
        {simpleFields('before')}

        <section className="account-permissions-section" aria-labelledby="menu-permissions-title">
          <h2 id="menu-permissions-title">Menu</h2>
          <div className="account-permissions-panel">
            <PermissionCheckbox
              label="Location Menu Administration"
              description="Includes all other sub-permissions plus the ability to add, remove, and duplicate items/modifiers for the location. Note: Location-level removal does not delete items from the master Account Menu."
              checked={permissions.administration}
              onChange={(checked) => onPermissionChange('administration', checked)}
            />
            <div className="account-permissions-panel__children">
              {MENU_PERMISSION_ROWS.map((permission) => (
                <PermissionCheckbox
                  key={permission.key}
                  label={permission.label}
                  description={permission.description}
                  checked={permissions[permission.key]}
                  disabled={permissions.administration && permission.key !== 'view'}
                  onChange={(checked) => onPermissionChange(permission.key, checked)}
                />
              ))}
            </div>
          </div>
        </section>

        {simpleFields('after')}
      </div>
    </div>
  )
}

function usePermissionDraft(initialName = '') {
  const [name, setName] = useState(initialName)
  const [permissions, setPermissions] = useState<MenuPermissions>({ ...EMPTY_MENU_PERMISSIONS })
  const [simplePermissions, setSimplePermissions] = useState<SimplePermissions>({ ...EMPTY_SIMPLE_PERMISSIONS })
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    setName(initialName)
    setPermissions({ ...EMPTY_MENU_PERMISSIONS })
    setSimplePermissions({ ...EMPTY_SIMPLE_PERMISSIONS })
    setIsDirty(false)
  }, [initialName])

  const changeName = (value: string) => {
    setName(value)
    setIsDirty(true)
  }
  const changePermission = (key: MenuPermissionKey, checked: boolean) => {
    setPermissions((current) => updateMenuPermissions(current, key, checked))
    setIsDirty(true)
  }
  const changeSimplePermission = (key: SimplePermissionKey, checked: boolean) => {
    setSimplePermissions((current) => ({ ...current, [key]: checked }))
    setIsDirty(true)
  }

  return { name, permissions, simplePermissions, isDirty, setIsDirty, changeName, changePermission, changeSimplePermission }
}

export default function AccountPermissionsApp() {
  const { permissionId } = useParams<{ permissionId: string }>()
  const navigate = useNavigate()
  const title = permissionId ? 'Edit Permission' : 'New Permission'
  const draft = usePermissionDraft(permissionId ? 'Menu Manager' : '')
  const selectLocation = (location: string) => {
    if (location.toLowerCase() === 'all locations') return
    void navigate(`/d/customer-receipt?location=${encodeURIComponent(location)}`)
  }

  return (
    <DesktopPageLayout
      headerProps={{
        title: 'Redwood Grill',
        subtitle: 'Account Setup',
        location: 'All locations',
        locations: ACCOUNT_LOCATIONS,
        onLocationSelect: selectLocation,
      }}
      currentFeatureName="Permissions"
      primaryNavigation={{ scope: 'account', activeItem: 'Users' }}
      navigation={(
        <DesktopSideNavigation
          items={ACCOUNT_NAVIGATION}
          selectedItem="Permissions"
          ariaLabel="Account setup sections"
        />
      )}
    >
      <DesktopSettingsArea
        className="account-permissions-settings"
        ariaLabel="New permission"
        header={(
          <DesktopItemEditorHeader
            title={title}
            collapsedActions={null}
            iconActions={null}
            labeledActions={null}
            onBack={() => window.history.back()}
            onSave={() => draft.setIsDirty(false)}
            requiredValues={[draft.name]}
            isDirty={draft.isDirty}
          />
        )}
      >
        <DesktopFormLayout ariaLabel="Permission details">
          <MenuPermissionsEditor
            name={draft.name}
            permissions={draft.permissions}
            simplePermissions={draft.simplePermissions}
            onNameChange={draft.changeName}
            onPermissionChange={draft.changePermission}
            onSimplePermissionChange={draft.changeSimplePermission}
          />
        </DesktopFormLayout>
      </DesktopSettingsArea>
    </DesktopPageLayout>
  )
}

export function AccountPermissionsMobileApp() {
  const { permissionId } = useParams<{ permissionId: string }>()
  const title = permissionId ? 'Edit Permission' : 'New Permission'
  const draft = usePermissionDraft(permissionId ? 'Menu Manager' : '')

  return (
    <main className="account-permissions-mobile">
      <header className="account-permissions-mobile__header">
        <button type="button" aria-label="Back" onClick={() => window.history.back()}>
          <span aria-hidden="true">‹</span>
        </button>
        <h1>{title}</h1>
        <PageSaveButton
          label="Save"
          requiredValues={[draft.name]}
          isDirty={draft.isDirty}
          onSave={() => draft.setIsDirty(false)}
          size="small"
        />
      </header>
      <div className="account-permissions-mobile__content">
        <MenuPermissionsEditor
          name={draft.name}
          permissions={draft.permissions}
          simplePermissions={draft.simplePermissions}
          onNameChange={draft.changeName}
          onPermissionChange={draft.changePermission}
          onSimplePermissionChange={draft.changeSimplePermission}
        />
      </div>
    </main>
  )
}