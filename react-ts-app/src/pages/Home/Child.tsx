import { forwardRef,useImperativeHandle, useState } from "react";
const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      getInputValue: () => {
        return inputValue;
      }
    }
  })
  const [inputValue, setInputValue] = useState({iptValue: ''});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({iptValue: e.target.value});
  }
  return (
    <div>
      <input type="text" onChange={handleChange} />
    </div>
  )
});
export default Child;