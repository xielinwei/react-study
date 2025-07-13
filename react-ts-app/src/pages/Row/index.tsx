import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'antd';

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };



const App: React.FC = () => {

  const [count, setCount] = useState(0);
  const [countObj, setCountObj] = useState({ count: 0 });
  
  useEffect(() => {
    console.log('countObj', countObj);
  }, [countObj]);

  const handleClick = () => {
    console.log('handleClick');
    setCountObj(prev => ({count: prev.count + 1}));
  };

    return (
      <>
        <Button onClick={() => setCount(count + 1)}>+</Button>
        <Button onClick={handleClick}>+2</Button>
      </>
    )
}

export default App;