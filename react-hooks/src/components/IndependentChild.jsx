import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Button, Tag } from "antd";

const IndependentChild = forwardRef((props, ref) => {
  const [state, setState] = useState({ count: 1 });
  const { onChange } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promiseInstance, setPromiseInstance] = useState({
    resolve: () => {},
    reject: () => {},
  });

  const validateCount = () => {
    return new Promise((resolve) => {
      if (state.count > 3) {
        resolve({ ...state, msg: "校验成功", success: true });
      } else {
        resolve({ ...state, msg: "校验失败", success: false });
      }
    });
  };



  const validate = async () => {
    const result = await validateCount();
    console.log('子组件校验结果:', result);
    
    if (!result.success) {
      return new Promise((resolve, reject) => {
        setIsModalOpen(true);
        // Modal.confirm({
        //   title: "校验失败",
        //   content: "请检查输入内容是否符合要求",
        //   okText: "我知道了",
        //   cancelText: "取消",
        //   onOk: () => {
        //     resolve(false);
        //   },
        //   onCancel: () => {
        //     reject(false);
        //   },
        // });
        // 保存 resolve 函数，供 Modal 的 onOk 使用
        setPromiseInstance({ resolve, reject });
      });
    }
    return result;
  };

  const onClick = () => {
    setState((prev) => {
      const newState = { ...prev, count: prev.count + 1 };
      onChange?.(newState);
      return newState;
    });
  };

  useImperativeHandle(ref, () => ({
    initData: setState,
    validate,
  }));

  return (
    <div>
      <Tag color="magenta">{state.count}</Tag>
      <Button type="primary" onClick={onClick}>
        +1
      </Button>
      
      <Modal
        title="校验失败"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
          if (promiseInstance.resolve) {
            promiseInstance.resolve(true);
            setPromiseInstance({ resolve: null, reject: null });
          }
        }}
        onCancel={() => {
          setIsModalOpen(false);
          if (promiseInstance.reject) {
            promiseInstance.reject(false);
            setPromiseInstance({ resolve: null, reject: null });
          }
        }}
        okText="我知道了"
      >
        <p>请检查输入内容是否符合要求</p>
      </Modal>
    </div>
  );
});

export default IndependentChild;
