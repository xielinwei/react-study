import { useContext } from 'react';
import { myContext } from './index';
function Child2() {
  const { name, age, update } = useContext(myContext);
  return (
    <div>Child2
      <p>name: {name}</p>
      <p>age: {age}</p>
      <button onClick={() => update(age + 1)}>update</button>
    </div>
  );
}
export default Child2;