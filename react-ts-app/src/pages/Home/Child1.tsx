import Child2 from './Child2';
import { useContext } from 'react';
import { myContext } from './index';
function Child1() {
  const { name, age, update } = useContext(myContext);
  return <div>
    <div>--Child1--</div>
    <button onClick={() => update(age+1)}>update</button>
    <p>name: {name}</p>
    <p>age: {age}</p>
    --Child1---
    <Child2 />
  </div>;
} 
export default Child1;