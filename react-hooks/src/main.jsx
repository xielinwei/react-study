import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './index.css'
import App from './App.jsx'
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  // </StrictMode>,
);
