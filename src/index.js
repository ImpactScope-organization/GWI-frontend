import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { ConfigProvider } from 'antd'

const activeChainId = ChainId.Sepolia

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <BrowserRouter>
      <ThirdwebProvider activeChain={activeChainId}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4DC601',
              colorPrimaryText: '#4DC601',
              borderRadius: 8,
              controlHeight: 56,
              colorBgContainer: '#f5f4f4'
            }
          }}
        >
          <AuthProvider>
            <App />
          </AuthProvider>
        </ConfigProvider>
      </ThirdwebProvider>
    </BrowserRouter>
  </>
)
