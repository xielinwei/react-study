# React Router 路由系统

本项目已成功引入 React Router DOM 路由系统，实现了单页面应用（SPA）的路由功能。

## 功能特性

- ✅ 基于 React Router DOM v7.6.3
- ✅ TypeScript 支持
- ✅ 响应式导航栏
- ✅ 404 页面处理
- ✅ 路由懒加载支持
- ✅ 美观的 UI 设计

## 项目结构

```
src/
├── components/
│   └── Navigation.tsx          # 导航组件
├── pages/
│   ├── Home.tsx               # 首页
│   ├── About.tsx              # 关于页面
│   ├── Todo.tsx               # 待办事项页面
│   └── NotFound.tsx           # 404页面
├── routes/
│   └── index.tsx              # 路由配置
├── todoList/                  # 原有待办事项组件
└── App.tsx                    # 主应用组件
```

## 路由配置

### 当前路由
- `/` - 首页
- `/todo` - 待办事项页面
- `/about` - 关于页面
- `*` - 404页面（处理未匹配的路由）

### 添加新路由

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/routes/index.tsx` 中添加新的路由配置
3. 在 `src/components/Navigation.tsx` 中添加导航链接

示例：
```tsx
// 1. 创建新页面组件
// src/pages/Contact.tsx
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">联系我们</h1>
        <p>联系信息...</p>
      </div>
    </div>
  );
};

export default Contact;

// 2. 在路由配置中添加
// src/routes/index.tsx
import Contact from '../pages/Contact';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// 3. 在导航组件中添加链接
// src/components/Navigation.tsx
<Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
  联系我们
</Link>
```

## 使用方法

1. 启动开发服务器：
   ```bash
   pnpm dev
   ```

2. 在浏览器中访问 `http://localhost:5173`

3. 使用导航栏在不同页面间切换

## 技术栈

- React 19
- TypeScript
- React Router DOM 7.6.3
- Vite
- CSS3

## 注意事项

- 所有页面组件都使用 TypeScript 编写
- 使用了 CSS 类而不是内联样式，便于维护
- 导航栏会自动高亮当前活动页面
- 404页面会自动处理未匹配的路由 