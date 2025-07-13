# 配置式路由系统

本项目已升级为配置式路由系统，提供了更灵活、更易维护的路由管理方案。

## 🚀 功能特性

- ✅ **配置式路由管理** - 所有路由配置集中管理
- ✅ **双重配置系统** - 基础配置 + 高级配置
- ✅ **自动导航生成** - 根据配置自动生成导航菜单
- ✅ **面包屑导航** - 自动生成面包屑导航
- ✅ **路由权限控制** - 支持基于角色的权限控制
- ✅ **路由守卫** - 支持路由访问控制
- ✅ **类型安全** - 完整的TypeScript类型支持
- ✅ **路由统计** - 提供路由统计信息

## 📁 项目结构

```
src/routes/
├── config.tsx              # 基础路由配置
├── advanced-config.tsx     # 高级路由配置（包含元数据）
├── routeManager.tsx        # 路由管理工具类
└── index.tsx               # 路由组件（使用配置生成）

src/components/
├── Navigation.tsx          # 导航组件（使用配置生成）
└── Breadcrumb.tsx          # 面包屑组件

src/pages/
├── Home.tsx               # 首页
├── About.tsx              # 关于页面
├── Todo.tsx               # 待办事项页面
├── Contact.tsx            # 联系页面
└── NotFound.tsx           # 404页面
```

## 🔧 配置说明

### 基础路由配置 (`config.tsx`)

```typescript
export interface RouteConfig {
  path: string;                    // 路由路径
  element: React.ComponentType;    // 页面组件
  title: string;                   // 页面标题
  showInNav?: boolean;             // 是否显示在导航中
  icon?: string;                   // 导航图标
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: Home,
    title: '首页',
    showInNav: true,
    icon: '🏠'
  },
  // ... 更多路由
];
```

### 高级路由配置 (`advanced-config.tsx`)

```typescript
export interface AdvancedRouteConfig {
  path: string;
  element: React.ComponentType;
  title: string;
  showInNav?: boolean;
  icon?: string;
  children?: AdvancedRouteConfig[];  // 支持嵌套路由
  meta?: {
    requiresAuth?: boolean;          // 是否需要认证
    roles?: string[];               // 所需角色
    breadcrumb?: string;            // 面包屑文本
    keepAlive?: boolean;            // 是否保持组件状态
  };
}
```

## 📝 添加新路由

### 方法一：修改配置文件

1. **创建页面组件**
   ```typescript
   // src/pages/NewPage.tsx
   import React from 'react';
   
   const NewPage: React.FC = () => {
     return (
       <div className="page-container">
         <div className="page-content">
           <h1 className="page-title">新页面</h1>
           <p>这是新页面的内容</p>
         </div>
       </div>
     );
   };
   
   export default NewPage;
   ```

2. **更新基础配置**
   ```typescript
   // src/routes/config.tsx
   import NewPage from '../pages/NewPage';
   
   export const routes: RouteConfig[] = [
     // ... 现有路由
     {
       path: '/new-page',
       element: NewPage,
       title: '新页面',
       showInNav: true,
       icon: '🆕'
     }
   ];
   ```

3. **更新高级配置**
   ```typescript
   // src/routes/advanced-config.tsx
   import NewPage from '../pages/NewPage';
   
   export const advancedRoutes: AdvancedRouteConfig[] = [
     // ... 现有路由
     {
       path: '/new-page',
       element: NewPage,
       title: '新页面',
       showInNav: true,
       icon: '🆕',
       meta: {
         breadcrumb: '新页面',
         requiresAuth: false,
         keepAlive: true
       }
     }
   ];
   ```

### 方法二：使用路由管理器

```typescript
import { RouteManager, ROUTE_CONSTANTS } from '../routes/routeManager';

// 获取路由信息
const routeInfo = RouteManager.getRouteInfo('/todo');

// 检查权限
const hasPermission = RouteManager.checkPermission('/admin', ['admin']);

// 获取统计信息
const stats = RouteManager.getRouteStats();
```

## 🛡️ 权限控制

### 基于角色的权限控制

```typescript
// 在高级配置中设置角色要求
{
  path: '/admin',
  element: AdminPage,
  title: '管理页面',
  showInNav: true,
  icon: '⚙️',
  meta: {
    requiresAuth: true,
    roles: ['admin', 'super-admin'],
    breadcrumb: '管理页面'
  }
}

// 检查权限
const userRoles = ['user', 'admin'];
const canAccess = RouteManager.checkPermission('/admin', userRoles);
```

### 路由守卫

```typescript
import { RouteGuard } from '../routes/routeManager';

const authGuard: RouteGuard = {
  canActivate: (path: string, userRoles: string[] = []) => {
    if (RouteManager.requiresAuthentication(path)) {
      return userRoles.length > 0;
    }
    return true;
  },
  redirectTo: '/login'
};
```

## 📊 路由统计

```typescript
import { RouteManager } from '../routes/routeManager';

const stats = RouteManager.getRouteStats();
console.log(stats);
// 输出：
// {
//   totalRoutes: 5,
//   navRoutes: 4,
//   hiddenRoutes: 1,
//   routesWithIcons: 4
// }
```

## 🎨 自定义样式

### 导航样式

```css
/* 自定义导航样式 */
nav a {
  /* 基础样式 */
}

nav a.active {
  /* 激活状态样式 */
}

nav a:hover {
  /* 悬停状态样式 */
}
```

### 面包屑样式

```css
/* 自定义面包屑样式 */
.breadcrumb {
  /* 面包屑容器样式 */
}

.breadcrumb-item {
  /* 面包屑项样式 */
}

.breadcrumb-separator {
  /* 分隔符样式 */
}
```

## 🔄 路由工具函数

### 基础工具函数

```typescript
import { getNavItems, getRouteByPath, getAllPaths } from '../routes/config';

// 获取导航菜单
const navItems = getNavItems();

// 根据路径获取路由
const route = getRouteByPath('/todo');

// 获取所有路径
const paths = getAllPaths();
```

### 高级工具函数

```typescript
import { routeUtils } from '../routes/advanced-config';

// 获取面包屑
const breadcrumbs = routeUtils.getBreadcrumbs('/todo');

// 检查认证要求
const needsAuth = routeUtils.requiresAuth('/admin');

// 检查权限
const hasPermission = routeUtils.hasPermission('/admin', ['admin']);
```

## 🚀 最佳实践

1. **保持配置一致性** - 确保基础配置和高级配置保持一致
2. **使用常量** - 使用 `ROUTE_CONSTANTS` 避免硬编码路径
3. **类型安全** - 充分利用TypeScript类型检查
4. **权限控制** - 合理设置路由权限和认证要求
5. **性能优化** - 使用 `keepAlive` 优化页面性能

## 📚 相关文件

- `src/routes/config.tsx` - 基础路由配置
- `src/routes/advanced-config.tsx` - 高级路由配置
- `src/routes/routeManager.tsx` - 路由管理工具
- `src/routes/index.tsx` - 路由组件
- `src/components/Navigation.tsx` - 导航组件
- `src/components/Breadcrumb.tsx` - 面包屑组件

## 🎯 总结

配置式路由系统提供了：

- **集中管理** - 所有路由配置在一个地方
- **类型安全** - 完整的TypeScript支持
- **易于扩展** - 添加新路由只需修改配置
- **权限控制** - 内置权限和认证支持
- **自动生成** - 导航和面包屑自动生成
- **工具支持** - 丰富的路由管理工具

这种配置式的方法使得路由管理更加灵活、可维护，并且为未来的功能扩展提供了良好的基础。 