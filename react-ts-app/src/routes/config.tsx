import React from 'react';
import Todo from '../pages/todoList';
import NotFound from '../pages/NotFound';
import Table from '../pages/table';
import Row from '../pages/Row';
import Home from '../pages/Home';
import ProTable from '../pages/ProTable';
import Form from '../pages/Form';
// 路由配置接口
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  title: string;
  showInNav?: boolean;
  icon?: string;
}

// 路由配置数组
export const routes: RouteConfig[] = [
  {
    path: '/',
    element: Home,
    title: '首页',
    showInNav: true,
    icon: '🏠'
  },
  {
    path: '/todo',
    element: Todo,
    title: '待办事项',
    showInNav: true,
    icon: '📝'
  },
  {
    path: '/table',
    element: Table,
    title: '表格',
    showInNav: true,
    icon: '📊'
  },
  {
    path: '/row',
    element: Row,
    title: 'row',
    showInNav: true,
    icon: '�'
  },
  {
    path: '/ProTable',
    element: ProTable,
    title: 'ProTable',
    showInNav: true,
    icon: '🎨'
  },
  {
    path: '/Form',
    element: Form,
    title: 'Form',
    showInNav: true,
    icon: '🔍'
  },
  {
    path: '*',
    element: NotFound,
    title: '页面未找到',
    showInNav: false
  }
];

// 获取导航菜单项
export const getNavItems = () => {
  return routes.filter(route => route.showInNav);
};

// 根据路径获取路由配置
export const getRouteByPath = (path: string) => {
  return routes.find(route => route.path === path);
};

// 获取所有路由路径
export const getAllPaths = () => {
  return routes.map(route => route.path);
}; 