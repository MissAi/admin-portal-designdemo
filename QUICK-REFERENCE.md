# 🎯 快速参考卡 — 代码改动指南

## 🚀 快速启动
```bash
cd /Users/aai/Downloads/my-first-prototype
npm run dev
# 访问 http://localhost:5174
```

---

## 📝 常见改动

### 1️⃣ 改菜单项（Customer Receipt List）
**文件**: `src/screens/CustomerReceiptList.tsx`  
**位置**: 第 8-11 行

```tsx
const ITEMS = [
  { label: 'Display', tappable: true },
  { label: 'Body', tappable: false },
  { label: 'Header & Footer Lines', tappable: true },
  { label: 'E-Mail Receipts', tappable: false },
]
```

**改法**: 修改 `label` 字符串或改 `tappable` 布尔值

---

### 2️⃣ 改颜色
**主颜色**: `#262AFF` (蓝色)  
**灰色**: `#6B747D`  
**文本**: `#04041C`

**在任何文件中搜索**:
```
color: '#262AFF'
background: '#262AFF'
```

改成你的 hex 色码。

---

### 3️⃣ 改 Header/Footer 默认文字
**文件**: `src/screens/HeaderFooterLines.tsx`  
**位置**: 第 8-18 行

```tsx
const DEFAULT_HEADER: Line = {
  text: 'Welcome to Our Restaurant!',  // ← 改这里
  font: 'Helvetica-Bold',
  size: 18,
  alignment: 'Center',
}

const DEFAULT_FOOTER: Line = {
  text: 'Thank you for visiting us!',  // ← 改这里
  font: 'Helvetica-Bold',
  size: 18,
  alignment: 'Center',
}
```

---

### 4️⃣ 改导航栏内容（Left Nav）
**文件**: `src/screens/LeftNav.tsx`  
**位置**: 第 6-19 行

```tsx
const NAV_ITEMS = [
  'Settings',
  'Online Ordering',
  // ← 在这里加入或删除项
]
```

---

### 5️⃣ 改按钮文字
直接搜索你想改的文字（如 "Save All"、"Add"、"Back"）并改。

---

## 🔧 添加新功能

### 添加新的菜单项 & 功能
假设你想添加 "Advanced Settings" 屏幕：

**Step 1**: 创建新屏幕文件  
```bash
touch src/screens/AdvancedSettings.tsx
```

**Step 2**: 复制现有屏幕的代码，修改内容

**Step 3**: 在 `App.tsx` 中：
```tsx
// 第 9 行，加入新的 screen 类型
type Screen = 'left-nav' | 'receipt-list' | 'display' | 'header-footer' | 'advanced'

// 第 35 行，加入新的条件渲染
{screen === 'advanced' && (
  <AdvancedSettings onBack={() => setScreen('receipt-list')} />
)}
```

**Step 4**: 在 `CustomerReceiptList.tsx` 中，加入新菜单项：
```tsx
const ITEMS = [
  // ...existing items...
  { label: 'Advanced Settings', tappable: true },
]

// 找到 handleItemClick 函数，加入：
if (label === 'Advanced Settings') onAdvancedSettingsClick()
```

---

## 🎨 改界面样式

### 改整体背景色
**文件**: `src/App.css`

```css
#root {
  background: #e8e8ed;  /* ← 改这里 */
}
```

### 改手机壳大小
```css
.phone-shell {
  width: 375px;   /* ← 改这里 */
  height: 812px;  /* ← 改这里 */
}
```

### 改卡片圆角
搜索 `borderRadius` 并改数值（数字越大越圆）。

---

## 🐛 调试技巧

### 看浏览器控制台错误
1. 打开浏览器 DevTools (F12)
2. 点 Console 标签
3. 看红色错误信息

### 常见错误

| 错误 | 原因 | 修复 |
|------|------|------|
| `Cannot read property 'map' of undefined` | 数组是 undefined | 检查 state 初始化 |
| `Expected jsx` | 忘记导入组件 | 加 import 语句 |
| `onClick is not a function` | 回调函数没传对 | 检查 Props |

---

## 📚 文件导航速查

| 功能 | 文件 |
|------|------|
| 屏幕路由 | `src/App.tsx` |
| 导航栏 | `src/screens/LeftNav.tsx` |
| 菜单列表 | `src/screens/CustomerReceiptList.tsx` |
| 表单页 | `src/screens/DisplaySettings.tsx` |
| 编辑器 | `src/screens/HeaderFooterLines.tsx` |
| 状态栏 | `src/components/StatusBar.tsx` |
| 全局样式 | `src/App.css` |
| 主入口 | `src/main.tsx` |

---

## ⚡ 性能优化（将来）

- 用 React.memo 避免不必要的重新渲染
- 用 useCallback 优化回调函数
- 用 useMemo 缓存复杂计算

---

## 📦 部署

```bash
# 生成生产版本
npm run build

# 查看生产版本预览
npm run preview
```

输出文件在 `dist/` 文件夹中，可部署到任何静态托管服务。

---

## 🆘 需要帮助？

1. **阅读** `CODING-GUIDE.md` — 概念讲解
2. **阅读** `LEARNING-SUMMARY.md` — 完整教程
3. **看代码注释** — 每个文件都有 JSX 结构
4. **试实验** — 改一个数字，看浏览器更新

---

**祝你编码愉快！🎉**
