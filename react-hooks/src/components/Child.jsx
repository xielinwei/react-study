import React, { memo } from "react"
function Child({ data, onBtnClick }) {
  // console.log('Child 组件渲染，count:', data)
  return <div>{data.count} <button onClick={onBtnClick}>+1</button></div>
}

export default memo(Child)