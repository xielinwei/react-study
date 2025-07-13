import { useMemo, useState, useCallback } from 'react'
import { Card, Divider, Empty } from 'antd'
import Add from './Add'
import Filter from './Filter'
import Item from './Item'
import type { todoItem } from './type'

function ToDoList() {
    const [data, setData] = useState<todoItem[]>([])
    const [filter, setFilter] = useState<string>()
    
    const addToDo = (item: todoItem):void => {
        setData([
            item,
            ...data
        ])
    }
    
    const filterToDoList = useMemo(() => {
         switch(filter) {
            case 'todo':
                return data.filter(item => !item.complete)
            case 'completed':
                return data.filter(item => item.complete)
            default: 
                return data
        }
    }, [data, filter])

    const delItem = (delItem: todoItem) => {
        setData(data.filter(item => item.timeStamp !== delItem.timeStamp))
    }
    
    const handleToggle = (timeStamp: number) => {
        setData(data.map(item => item.timeStamp === timeStamp ? {...item, complete: true } : item))
    }

    const handleFilterChange = useCallback((type: string) => {
        setFilter(type)
    }, [])
    
    const memoizedFilter = useMemo(() => (
        <Filter filterItem={handleFilterChange} />
    ), [handleFilterChange])

    return (
        <Card title="待办事项管理" style={{ maxWidth: 800, margin: '0 auto' }}>
            <Add addToDo={addToDo} />
            <Divider />
            {filterToDoList.length > 0 ? (
                <Item data={filterToDoList} delItem={delItem} toggle={handleToggle} />
            ) : (
                <Empty description="暂无待办事项" />
            )}
            {memoizedFilter}
        </Card>
    )
}

export default ToDoList