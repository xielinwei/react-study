import { useRef, useEffect } from "react";
import IndependentChild from "./IndependentChild";
// 使用ref回调
function ParentComponent() {
  const childRef = useRef();

  useEffect(() => {
    childRef.current.initData({ count: 0 });
  });

  const onChange = (newState) => {
    console.log("子组件变化了", newState);
  };

  const validate = async () => {
    try {
      const res = await childRef.current.validate();
      console.log('父组件校验结果:', res)
    } catch (error) {
      console.error('父组件校验失败', error);
    }
  };

  return (
    <div>
      <button onClick={validate}>点击校验</button>
      <IndependentChild ref={childRef} onChange={onChange} />
    </div>
  );
}

export default ParentComponent;
