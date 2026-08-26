# 🎓 Prototype 编码教学 – 概念讲解

## Vega Action Color Rule

All Vega components in the prototype use `#262aff` for enabled action color.
The single source of truth is `src/vega-theme.css`, loaded after Vega's base CSS.
Do not override Vega action tokens in page or component styles.

This rule covers primary action backgrounds, action borders, links, focus,
hover, active, and secondary action text/borders. Secondary surfaces remain
white or transparent, and disabled actions retain Vega's disabled gray styling.

## Discard Changes Icon Rule

All Discard Changes actions must use `DiscardChangesIcon` from
`src/components/DiscardChangesIcon.tsx`. It uses the approved assets from
`public/icons` and owns the standard `16px` size and disabled opacity. Do not
draw a discard/undo SVG or write a discard asset path directly in a page.

- Use the default `action` tone for desktop action groups.
- Use `tone="neutral"` where the mobile action menu requires the neutral icon.
- Data-driven action definitions may use `DISCARD_CHANGES_ACTION_ICON_SRC`.

## Save Button State Rule

All desktop page and modal Save actions must use `PageSaveButton` from
`src/components/PageSaveButton.tsx`. Do not set a page Save button's `disabled`
state directly.

- When a form has required fields, pass all required values through
  `requiredValues`. Save is enabled when every required value is filled.
- When a form has no required fields, omit `requiredValues` and pass `isDirty`.
  Save is enabled only after the user makes a change.
- After successfully saving a no-required-fields form, reset `isDirty` so Save
  becomes disabled again.
- Mobile `Save All` controls follow the same no-required-fields dirty rule.

```tsx
<PageSaveButton requiredValues={[name, location]} onSave={handleSave} />

<PageSaveButton isDirty={isDirty} onSave={handleSave} />
```

## Desktop Global Header Rule

All desktop pages must use `DesktopGlobalHeader`. Do not copy header markup or
page-specific header CSS. The shared header owns the Figma layout, uploaded icons,
Genius AI, Location, Publish, Resource Center, Avatar, and focus-ring styles.

From `768px` upward, the global header and its route wrapper must always span the
full available viewport width and adapt their internal spacing/content without
centering or shrinking the header container. Below `768px`, the desktop global
header is not displayed because the route switches to the mobile app.

```tsx
<DesktopGlobalHeader
  title="Redwood Grill"
  subtitle="Menu"
  location="All Locations"
/>
```

## Desktop Side Navigation Rule

All desktop pages with side navigation must use `DesktopSideNavigation`. Do not
copy navigation markup or page-specific navigation CSS. Pass the page's item list,
selected item, accessible label, and optional selection callback.

```tsx
<DesktopSideNavigation
  items={items}
  selectedItem={selectedItem}
  ariaLabel="Menu sections"
  onSelect={setSelectedItem}
/>
```

## Desktop Page Layout Rule

Every new desktop page must use `DesktopPageLayout`. It owns the global header,
navigation region, settings region, background, spacing, and scrolling behavior.
Do not rebuild this structure with page-specific wrappers or CSS.

### Mobile App Breakpoint

Every `/d/*` route must use `ResponsiveDesktopRoute` and provide both its desktop
page and corresponding mobile app. Below `768px`, the route displays the mobile
app full-screen. At `768px` and above, it displays the desktop page. Do not use
page-specific JavaScript viewport checks or CSS to simulate the mobile app.

```tsx
<ResponsiveDesktopRoute
  desktop={<DesktopFeatureApp />}
  mobile={<MobileFeatureApp />}
/>
```

This rule takes precedence over compact desktop rules. Left-navigation hiding,
mobile feature titles, and collapsed responsive actions apply to compact desktop
from `768px` through `1023px`. Below `768px`, the desktop layout is not displayed.

From `768px` through `1023px`, `DesktopPageLayout` hides the entire left
navigation region, expands the settings region into the available space, and
shows `currentFeatureName` at the left of the settings header's primary row. Save
and responsive actions remain at the right of that same row. At `1024px` and
above, the standard `220px` left navigation is visible and the feature title is
hidden. Do not add page-specific navigation visibility or feature-title
breakpoints.

On add-item and edit-item pages below `1024px`, hide the Back button and the
record/item title from `DesktopItemEditorHeader`. The primary row contains only
the feature title on the left and responsive actions plus Save on the right.
Tabs or other secondary header controls remain on a separate row below it.

Settings content must use `DesktopSettingsArea`, which owns the settings header
and white settings surface. Add-item and edit-item screens must render
`DesktopItemEditorHeader` as that header. It owns Back, title, responsive actions,
and Save.

```tsx
<DesktopPageLayout
  headerProps={{ title: 'Redwood Grill', subtitle: 'Menu', location }}
  currentFeatureName={selectedItem}
  navigation={
    <DesktopSideNavigation
      items={items}
      selectedItem={selectedItem}
      ariaLabel="Menu sections"
      onSelect={setSelectedItem}
    />
  }
>
  <DesktopSettingsArea
    ariaLabel="Item settings"
    header={
      <DesktopItemEditorHeader
        title={itemName}
        collapsedActions={<ActionsMenu />}
        iconActions={<IconActions />}
        labeledActions={<LabeledActions />}
        onBack={handleBack}
        onSave={handleSave}
      />
    }
  >
    <ItemSettingsForm />
  </DesktopSettingsArea>
</DesktopPageLayout>
```

## Desktop Form Layout Rule

Every standard non-table desktop form must use `DesktopFormLayout`. The settings
background stretches to the available screen width. The form stays left-aligned
inside that background with `24px` outer padding.

The form container is at most `1008px` wide, has `24px` internal padding on all
sides, and is transparent by default. Do not add page-specific width, alignment,
outer padding, inner padding, or background rules to the form container. Tables,
receipt previews, editors, and other non-form workspaces are exempt.

```tsx
<DesktopSettingsArea header={header} ariaLabel="Item settings">
  <DesktopFormLayout ariaLabel="Item form">
    <ItemSettingsFields />
  </DesktopFormLayout>
</DesktopSettingsArea>
```

## Desktop Responsive Action Rule

Every existing and future desktop page action group must render its three
representations through `ResponsiveActionGroup`; fixed page-action buttons are
not allowed. `DesktopItemEditorHeader` already applies it for add-item and
edit-item pages. Other settings headers must compose `ResponsiveActionGroup`
beside their persistent Save button. Do not create page-specific media queries
for these states.

- Up to `1024px`: show the collapsed actions menu.
- From `1025px` through `1799px`: show icon-only actions with tooltips.
- At `1800px` and above: show labeled actions.

```tsx
import ResponsiveActionGroup from './components/ResponsiveActionGroup'

<ResponsiveActionGroup
  collapsed={<ActionsMenu />}
  icons={<IconActions />}
  labels={<LabeledActions />}
/>
```

## 概念 1：什么是 React 组件？

你的代码用的是 **React**，一个 JavaScript 库。React 的核心是"组件"。

### 比喻：
- 你的 App 就像一个**app 的"框架"**
- 每个 Screen（如 LeftNav、CustomerReceiptList）是一个**"页面"**
- 每个按钮、输入框是一个**"小件"**

```jsx
// 最简单的组件 = 一个返回 HTML 的函数
function HelloButton() {
  return <button>Click me</button>
}
```

---

## 概念 2：状态（State）

你的 prototype 需要"记住"用户的动作。这就用 `useState` 来做。

### 例子：

```jsx
import { useState } from 'react'

function App() {
  const [screen, setScreen] = useState('left-nav')
  //    ↑ 当前的屏幕   ↑ 改变屏幕的函数
  
  return (
    <div>
      {screen === 'left-nav' && <LeftNav />}
      {screen === 'receipt-list' && <CustomerReceiptList />}
    </div>
  )
}
```

当你点 "Customer Receipt" 按钮时，会调用 `setScreen('receipt-list')`，屏幕就会切换。

---

## 概念 3：Props（属性）– 父组件给子组件传参

你的屏幕需要知道"点击哪个按钮后做什么"。这通过 **props** 传递。

### 例子（从 App.tsx）：

```jsx
{screen === 'receipt-list' && (
  <CustomerReceiptList
    saveAllEnabled={saveAllEnabled}          // ← 这是 prop
    onDisplayClick={() => setScreen('display')}  // ← 这也是 prop（一个函数）
    onHeaderFooterClick={() => setScreen('header-footer')}
    onHamburgerClick={() => setScreen('left-nav')}
  />
)}
```

CustomerReceiptList 组件的定义：

```jsx
interface Props {
  saveAllEnabled: boolean
  onDisplayClick: () => void  // ← "当 Display 被点击时调用这个函数"
  onHeaderFooterClick: () => void
  onHamburgerClick: () => void
}

function CustomerReceiptList({ 
  saveAllEnabled, 
  onDisplayClick, 
  onHeaderFooterClick, 
  onHamburgerClick 
}: Props) {
  // 现在这些 props 可以在这个组件里用了
  
  return (
    <div onClick={onDisplayClick}>  {/* 点击时，调用 onDisplayClick 函数 */}
      Display
    </div>
  )
}
```

---

## 概念 4：条件渲染 — 根据状态显示不同的内容

```jsx
{isAddingHeader && <EditCard />}  
// 如果 isAddingHeader 是 true，就显示 EditCard
// 如果是 false，就不显示（隐藏）
```

---

## 概念 5：事件处理 — 点击、输入时响应

```jsx
<button onClick={() => setScreen('display')}>
  Display
</button>

<input 
  value={newText}
  onChange={(e) => setNewText(e.target.value)}
  placeholder="Enter text"
/>
```

- `onClick` — 按钮被点击
- `onChange` — 输入框的文字改变

---

## 概念 6：列表渲染 — 用 `.map()` 显示多个相同的组件

```jsx
const headerLines = [
  { text: 'Welcome', font: 'Arial', size: 18 },
  { text: 'Thank you', font: 'Arial', size: 16 }
]

{headerLines.map((line, i) => (
  <LineViewCard key={i} line={line} />
))}
// 结果：生成 2 个 LineViewCard 组件，每个传不同的 line
```

---

## 概念 7：TypeScript — 类型标注（让代码更安全）

```tsx
// Props 的类型定义 = 说明这个组件需要哪些输入，类型是什么
interface Props {
  saveAllEnabled: boolean  // ← 一个 boolean（true 或 false）
  onDisplayClick: () => void  // ← 一个函数，调用时不返回任何值
}

// 使用这些类型
const CustomerReceiptList: FC<Props> = ({ saveAllEnabled, onDisplayClick }) => {
  // ...
}
```

这样如果你传错了类型（比如传了一个字符串而不是 boolean），编辑器会立即报错。

---

## 概念 8：内联样式 — React 中的 CSS

```jsx
<div style={{ 
  color: 'blue',           // CSS 属性用驼峰命名 (background-color → backgroundColor)
  fontSize: 16,            // 数字自动加 px
  padding: '12px 14px'     // 或用字符串
}}>
  Hello
</div>
```

---

## 概念 9：你的项目的数据流

```
App.tsx (顶层路由器)
├─ LeftNav (显示导航)
│  └─ 点 "Customer Receipt" → 调用 onSelectCustomerReceipt()
│     → 触发 setScreen('receipt-list')
├─ CustomerReceiptList (显示菜单)
│  ├─ 点 "Display" → 调用 onDisplayClick() → setScreen('display')
│  └─ 点 "Header & Footer" → 调用 onHeaderFooterClick() → setScreen('header-footer')
├─ DisplaySettings (显示设置表单)
│  └─ 点 Back → 调用 onBack() → setScreen('receipt-list') + setSaveAllEnabled(true)
└─ HeaderFooterLines (显示行编辑器)
   ├─ 点 Add → setIsAddingHeader(true) → 显示编辑卡片
   ├─ 输入文字 → setNewText(text) → "Done" 按钮激活
   └─ 点 Done → 添加新行 + 关闭编辑卡片
```

---

## 快速参考表

| 概念 | 例子 | 用途 |
|------|------|------|
| **useState** | `const [count, setCount] = useState(0)` | 记住数据 |
| **Props** | `<Button onClick={handleClick} />` | 父→子通信 |
| **Conditional** | `{isVisible && <Component />}` | 显示/隐藏 |
| **Event** | `<input onChange={(e) => setText(e.target.value)} />` | 响应用户操作 |
| **map()** | `items.map(item => <Item key={item.id} data={item} />)` | 列表循环 |
| **TypeScript** | `interface Props { name: string }` | 类型检查 |

---

## 你现在可以修改什么？

✅ **文字标签** — 改 "Customer Receipt" 为其他文字  
✅ **颜色** — 改 `color: '#262AFF'` 为其他色码  
✅ **宽度/高度/边距** — 改 padding/margin 值  
✅ **逻辑** — 改按钮的功能（加新的状态变化）  
✅ **列表内容** — 加更多菜单项或表单字段  

❌ **文件导入** — 不改 `import` 那行（除非你真的需要）  
❌ **TypeScript 类型** — 不改 `interface Props` 除非你懂  

---

希望这个讲解帮助你理解代码！有问题就问我。
