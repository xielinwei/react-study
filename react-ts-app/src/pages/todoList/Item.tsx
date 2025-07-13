import { List, Button, Checkbox } from 'antd'
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons'
import type { todoItem } from "./type"

interface itemProps {
    data: todoItem[]
    delItem: (item: todoItem) => void
    toggle: (timeStamp: number) => void
}

function Item({ data, delItem, toggle }: itemProps) { 
    return (
        <div style={{ marginBottom: 16 }}>
            <List
                dataSource={data}
                renderItem={(item: todoItem) => (
                    <List.Item
                        actions={[
                            <Button
                                key="complete"
                                type="text"
                                icon={<CheckOutlined />}
                                onClick={() => toggle(item.timeStamp)}
                                disabled={item.complete}
                            >
                                完成
                            </Button>,
                            <Button
                                key="delete"
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => delItem(item)}
                            >
                                删除
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Checkbox
                                    checked={item.complete}
                                    onChange={() => toggle(item.timeStamp)}
                                />
                            }
                            title={
                                <span style={{ 
                                    textDecoration: item.complete ? 'line-through' : 'none',
                                    color: item.complete ? '#999' : '#333'
                                }}>
                                    {item.value}
                                </span>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Item