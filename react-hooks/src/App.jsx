import { useState, useCallback, useMemo } from 'react'
import Child from './components/Child'
import ParentComponent from './components/test'

function App() {
  const [inputValue, setInputValue] = useState('')
  // console.log('父组件：', inputValue)

  const onChange = useCallback((e) => {
    setInputValue(e.target.value)
  }, [])
  
  const [count, setCount] = useState(0)
  
  // 使用 useCallback 缓存回调函数，确保引用稳定
  const onBtnClick = useCallback(() => {
    setCount(prevCount => prevCount + 1)
  }, [])

  const data = useMemo(() => ({count}), [count])

  return (
    <>
        <input type="text" value={inputValue} onChange={onChange}/>
        <hr />
        <hr />
        <Child data={data} onBtnClick={onBtnClick}/>
        <hr />
        <ParentComponent />
    </>
  )
}

export default App

