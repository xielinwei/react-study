import React, { useState, useRef, createContext} from 'react';
import Child from './Child';
import Child1 from './Child1';
// 创建 Context 并导出
export const myContext = createContext()
const Home: React.FC = () => {
  const [count, setCount] = useState(1);
  const handleClick = async () => {
    setCount(prev => {
      return prev + 1;
    });
    console.log(childRef.current, 'childRef');
  };
  const childRef = useRef<{getInputValue: () => string | undefined}>(null);
  const [age, setAge] = useState(25);
  return (
    <div> 
      <div> 
        <button onClick={handleClick}>Click me</button>
        <p>Count: {count}</p>
      </div>
      fowwardRef
      <Child ref={childRef} />
      <br />
      跨多层级传参
      <myContext.Provider value={{name: 'das', age, update: (val: number) => setAge(val)}}>
        <Child1 />
      </myContext.Provider>
    </div>
  );
};
export default Home;