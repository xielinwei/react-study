# Axios 封装使用指南

这是一个基于 TypeScript 的 axios 封装，提供了完整的 HTTP 请求功能，包括请求拦截器、响应拦截器、错误处理和类型安全。

## 功能特性

- ✅ **TypeScript 支持** - 完整的类型定义和类型安全
- ✅ **请求拦截器** - 自动添加 token、loading 状态管理
- ✅ **响应拦截器** - 统一错误处理、业务错误处理
- ✅ **错误处理** - 网络错误、HTTP 状态码错误、业务错误
- ✅ **文件上传下载** - 支持文件上传和下载功能
- ✅ **请求配置** - 支持自定义 loading 和错误提示控制

## 文件结构

```
src/server/
├── index.tsx      # axios 封装核心文件
├── api.ts         # API 接口定义
├── example.tsx    # 使用示例
└── README.md      # 使用说明
```

## 快速开始

### 1. 基本使用

```typescript
import httpClient from './server/index';

// GET 请求
const response = await httpClient.get<User>('/user/info');
console.log(response.data); // User 类型

// POST 请求
const result = await httpClient.post<LoginResult>('/auth/login', {
  username: 'admin',
  password: '123456'
});

// PUT 请求
await httpClient.put<User>('/user/profile', { name: '新名字' });

// DELETE 请求
await httpClient.delete('/articles/123');
```

### 2. 使用预定义的 API

```typescript
import { userApi, articleApi } from './server/api';

// 用户相关操作
const user = await userApi.getUserInfo();
await userApi.updateUser({ name: '新名字' });
await userApi.uploadAvatar(file);

// 文章相关操作
const articles = await articleApi.getList({ page: 1, pageSize: 10 });
const article = await articleApi.getDetail(123);
await articleApi.create({ title: '新文章', content: '内容' });
```

### 3. 文件操作

```typescript
import { fileApi } from './server/api';

// 上传文件
const result = await fileApi.upload(file);
console.log(result.data.url);

// 下载文件
await fileApi.download('/api/files/example.pdf', 'example.pdf');
```

## 配置说明

### 环境变量配置

在 `.env` 文件中配置 API 基础地址：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 请求配置

```typescript
// 自定义配置
const response = await httpClient.get('/user/info', {
  showLoading: false,    // 不显示 loading
  showError: false,      // 不显示错误提示
  timeout: 5000,         // 自定义超时时间
  headers: {             // 自定义请求头
    'Custom-Header': 'value'
  }
});
```

## 错误处理

### 1. 网络错误

```typescript
try {
  const response = await httpClient.get('/user/info');
} catch (error) {
  // error 类型为 ErrorInfo
  console.error('错误代码:', error.code);
  console.error('错误信息:', error.message);
  console.error('详细信息:', error.details);
}
```

### 2. 业务错误

当服务器返回的业务状态码不是 200 或 0 时，会自动抛出业务错误：

```typescript
// 服务器返回: { code: 400, message: "参数错误", data: null, success: false }
try {
  await httpClient.post('/auth/login', { username: '', password: '' });
} catch (error) {
  console.error('业务错误:', error.message); // "参数错误"
}
```

### 3. HTTP 状态码错误

自动处理常见的 HTTP 状态码：

- `401` - 未授权，自动清除 token
- `403` - 拒绝访问
- `404` - 资源不存在
- `500` - 服务器内部错误

## 类型定义

### ApiResponse

```typescript
interface ApiResponse<T = unknown> {
  code: number;      // 业务状态码
  message: string;   // 响应消息
  data: T;          // 响应数据
  success: boolean;  // 是否成功
}
```

### RequestConfig

```typescript
interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;  // 是否显示 loading
  showError?: boolean;    // 是否显示错误提示
}
```

### ErrorInfo

```typescript
interface ErrorInfo {
  code: number;      // 错误代码
  message: string;   // 错误信息
  details?: unknown; // 详细信息
}
```

## 拦截器功能

### 请求拦截器

- 自动添加 Authorization token
- 支持 loading 状态管理
- 可扩展其他请求前处理

### 响应拦截器

- 统一处理响应数据格式
- 自动处理业务错误
- 网络错误处理
- HTTP 状态码错误处理

## 扩展功能

### 1. 添加全局 loading 管理

```typescript
// 在请求拦截器中
if ((config as RequestConfig).showLoading !== false) {
  // 显示全局 loading
  store.dispatch(setLoading(true));
}

// 在响应拦截器中
if ((config as RequestConfig).showLoading !== false) {
  // 隐藏全局 loading
  store.dispatch(setLoading(false));
}
```

### 2. 添加错误提示

```typescript
// 在响应拦截器中
if ((config as RequestConfig).showError !== false) {
  // 使用 antd message 显示错误
  message.error(errorInfo.message);
}
```

### 3. 添加请求重试

```typescript
// 在响应拦截器中
if (error.response?.status === 500) {
  // 重试逻辑
  return retryRequest(error.config);
}
```

## 最佳实践

1. **使用预定义的 API 接口** - 保持代码的一致性和可维护性
2. **合理使用错误处理** - 根据业务需求决定是否显示错误提示
3. **类型安全** - 充分利用 TypeScript 的类型检查
4. **环境配置** - 使用环境变量管理不同环境的 API 地址
5. **错误日志** - 在生产环境中记录详细的错误信息

## 注意事项

1. 确保服务器返回的数据格式符合 `ApiResponse` 接口
2. Token 存储在 localStorage 中，注意安全性
3. 文件上传时注意文件大小限制
4. 在生产环境中配置适当的超时时间
5. 根据实际需求调整错误处理逻辑 