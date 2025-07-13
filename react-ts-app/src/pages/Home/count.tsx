import React, { memo, useMemo, useState } from 'react';
// 子组件
const ChildComp = (info:{info:{name: string, age: number}}) => {
  console.log('ChildComp...');
  return (<div>ChildComp...</div>);
};
const MemoChildComp = memo(ChildComp);
// 父组件
const Parent = () => {
  const [count, setCount] = useState(0);
  const [name] = useState('jack');
  const [age] = useState(11);
  // 使用 useMemo 将对象属性包一层
  const info = useMemo(() => ({ name, age }), [name, age]);
  return (
    <div className="App">
      <div>hello world {count}</div>
      <button onClick={() => { setCount(count => count + 1); }}>点击增加</button>
      <MemoChildComp info={info}/>
    </div>
  );
};
export default Parent;
