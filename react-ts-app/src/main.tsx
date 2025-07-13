import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import App from './App.tsx'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  // </StrictMode>,
)
