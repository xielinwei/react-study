import { useRef } from "react"
import { Input, Button, Space } from 'antd'
import type { InputRef } from 'antd/lib/input'
import { PlusOutlined } from '@ant-design/icons'
import type { todoItem } from "./type"

function Add({addToDo}: {addToDo: (item: todoItem) => void}) {
    const iptRef = useRef<InputRef>(null)
    
    const handleClick = () => {
        if(!iptRef.current?.input?.value.trim()) return
        const item:todoItem = {
            value: iptRef.current.input.value.trim(),
            timeStamp: new Date().getTime(),
            complete: false
        }
        addToDo(item)
        iptRef.current.input.value = ''
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }

    return (
        <div style={{ marginBottom: 16 }}>
            <Space>
                <Input
                    ref={iptRef}
                    placeholder="请输入待办事项"
                    style={{ width: 300 }}
                    onKeyPress={handleKeyPress}
                />
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={handleClick}
                >
                    添加事项
                </Button>
            </Space>
        </div>
    )
}

export default Add