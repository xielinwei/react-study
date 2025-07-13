#!/bin/bash

# 开发服务器管理脚本
# 使用方法: ./dev-server.sh [start|stop|restart|status]

PORT=5173
PID_FILE=".vite.pid"

# 获取进程ID
get_pid() {
    if [ -f "$PID_FILE" ]; then
        cat "$PID_FILE"
    else
        lsof -ti:$PORT 2>/dev/null | head -1
    fi
}

# 检查端口是否被占用
check_port() {
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# 启动服务器
start() {
    echo "正在启动开发服务器..."
    
    # 检查端口是否被占用
    if check_port; then
        echo "端口 $PORT 已被占用，正在停止现有进程..."
        stop
        sleep 2
    fi
    
    # 启动服务器
    pnpm dev &
    PID=$!
    echo $PID > "$PID_FILE"
    echo "开发服务器已启动，PID: $PID"
    echo "访问地址: http://localhost:$PORT"
}

# 停止服务器
stop() {
    echo "正在停止开发服务器..."
    
    PID=$(get_pid)
    if [ ! -z "$PID" ]; then
        kill -TERM $PID 2>/dev/null
        sleep 1
        if kill -0 $PID 2>/dev/null; then
            echo "强制停止进程..."
            kill -KILL $PID 2>/dev/null
        fi
        echo "开发服务器已停止"
    else
        echo "没有找到运行中的开发服务器"
    fi
    
    # 清理PID文件
    rm -f "$PID_FILE"
    
    # 确保端口释放
    if check_port; then
        echo "强制释放端口 $PORT..."
        lsof -ti:$PORT | xargs kill -KILL 2>/dev/null
    fi
}

# 重启服务器
restart() {
    echo "正在重启开发服务器..."
    stop
    sleep 2
    start
}

# 查看状态
status() {
    PID=$(get_pid)
    if [ ! -z "$PID" ] && kill -0 $PID 2>/dev/null; then
        echo "开发服务器正在运行，PID: $PID"
        echo "端口: $PORT"
        echo "访问地址: http://localhost:$PORT"
    else
        echo "开发服务器未运行"
        if check_port; then
            echo "警告: 端口 $PORT 被其他进程占用"
            lsof -i:$PORT
        fi
    fi
}

# 清理
clean() {
    echo "正在清理..."
    stop
    rm -rf dist node_modules/.vite
    echo "清理完成"
}

# 主逻辑
case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    status)
        status
        ;;
    clean)
        clean
        ;;
    *)
        echo "使用方法: $0 {start|stop|restart|status|clean}"
        echo ""
        echo "命令说明:"
        echo "  start   - 启动开发服务器"
        echo "  stop    - 停止开发服务器"
        echo "  restart - 重启开发服务器"
        echo "  status  - 查看服务器状态"
        echo "  clean   - 清理缓存并停止服务器"
        exit 1
        ;;
esac 