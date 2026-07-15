# POS Prototype – Customer Receipt Setup Flow  

🎉 **完整的交互式 Clickable Prototype，用 React + TypeScript 构建**

## 📱 项目概览

这是一个 **Restaurant POS Admin** 系统的 Mobile Prototype，展示了 Location Setup 中 Customer Receipt 的完整设置流程。

### ✨ 核心功能
- ✅ 4 个交互屏幕（导航栏、菜单列表、表单、编辑器）
- ✅ 完整的状态管理（Save All 按钮启用逻辑）
- ✅ 动态编辑卡片（输入文字后按钮变化）
- ✅ 列表操作（添加新行、查看、编辑）
- ✅ iOS 风格界面（手机框、状态栏、圆角卡片）

---

## 🚀 快速开始

### 1. 启动开发服务器
```bash
cd /Users/aai/Downloads/my-first-prototype
npm run dev
```

访问 `http://localhost:5174` 在浏览器中查看。

### 2. 构建生产版本
```bash
npm run build
```

---

## 📚 文档指南（按推荐顺序阅读）

| 文档 | 适合对象 | 内容 | 读法 |
|------|--------|------|------|
| **CODING-GUIDE.md** ← 从这里开始！ | 完全新手 | 9 个 React 核心概念 | 逐个理解配合例子 |
| **LEARNING-SUMMARY.md** | 想了解架构的人 | 项目总结、数据流图 | 深化理解 |
| **QUICK-REFERENCE.md** | 想改代码的人 | 常见改动速查表 | 需要时查阅 |
| **LEARNING-ROADMAP.md** | 想成为开发者的人 | 3 个月学习计划 | 规划自己的路径 |

---

## 🎯 使用场景

### 我是完全新手
1. 阅读 CODING-GUIDE.md（30 分钟）
2. 打开 prototype 在浏览器中看效果（5 分钟）
3. 试着改一个文字或颜色（10 分钟）
4. 观察浏览器自动更新（5 分钟）

### 我想改某个功能
1. 在 QUICK-REFERENCE.md 中查找对应功能
2. 打开指定文件，按步骤修改
3. 保存文件，浏览器自动刷新

### 我想长期学习 React
阅读 LEARNING-ROADMAP.md，按 3 个月计划学习。

---

## 📁 项目结构

```
src/
├── App.tsx                      # 主路由器（4 个屏幕的中心）
├── App.css                      # 全局样式（手机壳样式）
├── screens/
│   ├── LeftNav.tsx              # 左边栏导航
│   ├── CustomerReceiptList.tsx  # 菜单列表
│   ├── DisplaySettings.tsx      # 表单设置
│   └── HeaderFooterLines.tsx    # 行编辑器
└── components/
    └── StatusBar.tsx            # iOS 风格状态栏
```

---

## 🎮 完整流程演示

```
左边栏 (Left Nav)
  ↓ 点击 "Customer Receipt"

菜单列表 (Customer Receipt List)
  ↓ 点击 "Display"

表单页 (Display Settings)
  ✓ 可以"上传" logo 和勾选复选框
  ↓ 点击 "Back"

回到菜单列表
  ✨ 注意：Save All 按钮现在变成蓝色了！

Header & Footer Lines
  ↓ 点击 "Add"

编辑卡片
  ✓ 输入文字前：按钮是灰色的 "Cancel"
  ✓ 输入文字后：按钮变蓝色的 "Done"
  ↓ 点击 "Done"

新行被添加！
  ✓ 预览块更新了
  ✓ 新行出现在列表中
```

---

## 🎓 你会学到什么

- ✅ React 组件和 JSX
- ✅ 状态管理 (useState)
- ✅ Props 和事件处理
- ✅ 条件渲染和列表循环
- ✅ 内联样式和响应式设计
- ✅ 如何构建真实应用

---

## 📞 常见问题

**Q: 怎么改菜单项？**  
A: 打开 `src/screens/CustomerReceiptList.tsx`，改第 8 行的 `ITEMS` 数组。

**Q: 怎么改颜色？**  
A: 搜索 `#262AFF` (蓝色) 或 `#04041C` (黑色)，改成你要的 hex 码。

**Q: 怎么添加新屏幕？**  
A: 查看 `QUICK-REFERENCE.md` 的"添加新功能"部分。

**Q: 可以在手机上测试吗？**  
A: 可以！访问 `http://<你的电脑IP>:5174`

---

## 🎉 下一步

1. **短期** (1-2 周): 理解现有代码，做一些小改动
2. **中期** (1-2 月): 构建自己的 React 应用
3. **长期** (3-6 月): 学习全栈开发，部署真实项目

详细计划见 **LEARNING-ROADMAP.md**。

---

**Happy Coding! 🚀**
