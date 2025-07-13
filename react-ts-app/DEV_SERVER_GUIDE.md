# 开发服务器管理指南

## 🚨 问题描述

每次重启项目都会重新开进程，这通常是由以下原因造成的：

1. **端口冲突** - 5173端口被其他进程占用
2. **进程未正确终止** - 之前的开发服务器进程仍在运行
3. **Vite配置问题** - 开发服务器配置不当

## 🔧 解决方案

### 方案一：使用优化后的脚本（推荐）

我们已经在 `package.json` 中添加了优化的脚本：

```bash
# 正常启动（推荐）
pnpm dev

# 清理后启动（如果遇到端口冲突）
pnpm dev:clean

# 使用不同端口启动
pnpm dev:port

# 停止所有vite进程
pnpm kill

# 清理缓存
pnpm clean
```

### 方案二：手动管理进程

```bash
# 查看占用5173端口的进程
lsof -ti:5173

# 停止指定进程
kill -9 <进程ID>

# 或者停止所有vite进程
pkill -f 'vite'
```

### 方案三：使用开发服务器管理脚本

```bash
# 给脚本添加执行权限
chmod +x dev-server.sh

# 启动服务器
./dev-server.sh start

# 停止服务器
./dev-server.sh stop

# 重启服务器
./dev-server.sh restart

# 查看状态
./dev-server.sh status

# 清理并重启
./dev-server.sh clean
```

## ⚙️ Vite配置优化

我们已经在 `vite.config.ts` 中添加了以下优化配置：

```typescript
export default defineConfig({
  server: {
    port: 5173,
    host: true,
    open: true, // 自动打开浏览器
    strictPort: true, // 端口被占用时直接退出
    hmr: {
      overlay: true, // 错误覆盖层
    },
  },
  // ... 其他配置
})
```

## 🚀 最佳实践

### 1. 启动前检查

```bash
# 检查端口占用
lsof -i:5173

# 如果有占用，先清理
pnpm kill
```

### 2. 使用推荐的启动方式

```bash
# 首次启动或遇到问题时
pnpm dev:clean

# 正常开发
pnpm dev
```

### 3. 开发完成后清理

```bash
# 停止服务器
Ctrl + C

# 或者使用脚本
pnpm kill
```

## 🔍 常见问题排查

### 问题1：端口被占用

```bash
# 查看占用进程
lsof -i:5173

# 停止进程
kill -9 <进程ID>

# 或者使用清理脚本
pnpm dev:clean
```

### 问题2：进程无法停止

```bash
# 强制停止所有vite进程
pkill -f 'vite'

# 或者重启终端
```

### 问题3：缓存问题

```bash
# 清理缓存
pnpm clean

# 重新安装依赖
rm -rf node_modules
pnpm install
```

## 📋 脚本说明

### package.json 脚本

- `dev` - 正常启动开发服务器
- `dev:clean` - 清理进程后启动
- `dev:port` - 使用3000端口启动
- `kill` - 停止所有vite进程
- `clean` - 清理缓存和构建文件

### dev-server.sh 脚本

- `start` - 启动服务器
- `stop` - 停止服务器
- `restart` - 重启服务器
- `status` - 查看状态
- `clean` - 清理并重启

## 🎯 推荐工作流程

1. **首次启动**
   ```bash
   pnpm dev:clean
   ```

2. **日常开发**
   ```bash
   pnpm dev
   ```

3. **遇到问题时**
   ```bash
   pnpm kill
   pnpm dev:clean
   ```

4. **开发完成后**
   ```bash
   Ctrl + C  # 停止服务器
   ```

## 📊 性能优化

### Vite配置优化

- **strictPort**: 端口冲突时直接退出
- **hmr.overlay**: 错误覆盖层
- **optimizeDeps**: 预构建依赖
- **manualChunks**: 代码分割

### 开发体验优化

- **自动打开浏览器**: `open: true`
- **主机访问**: `host: true`
- **错误覆盖层**: `hmr.overlay: true`

## 🔧 故障排除

如果仍然遇到问题，可以尝试：

1. **重启终端**
2. **清理所有缓存**: `pnpm clean`
3. **重新安装依赖**: `rm -rf node_modules && pnpm install`
4. **检查系统进程**: `ps aux | grep vite`
5. **使用不同端口**: `pnpm dev:port`

通过这些优化，开发服务器的启动和管理将更加稳定和高效！ 