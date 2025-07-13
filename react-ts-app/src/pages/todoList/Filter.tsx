import { useEffect } from "react"
import { Button, Space } from 'antd'

function Filter(props: { filterItem: (type: string) => void }) {
    const handleClick = (type: string): void => {
        props.filterItem(type)
    }
    
    useEffect(() => {
        console.log('渲染')
    }, [])
    
    return (
        <div style={{ marginTop: 16 }}>
            <Space>
                <Button onClick={() => handleClick('all')}>全部</Button>
                <Button onClick={() => handleClick('todo')}>待办</Button>
                <Button onClick={() => handleClick('completed')}>已办</Button>
            </Space>
        </div>
    )
}

export default Filter