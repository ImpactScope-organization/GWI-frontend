import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { BrowserRouter } from 'react-router-dom'
import { StepsProvider } from './Context/StateContext'
import { CompanyContextProvider } from './Context/CompanyContext'

const activeChainId = ChainId.Sepolia

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <BrowserRouter>
      <ThirdwebProvider activeChain={activeChainId}>
        <StepsProvider>
          <CompanyContextProvider>
            <App />
          </CompanyContextProvider>
        </StepsProvider>
      </ThirdwebProvider>
    </BrowserRouter>
  </>
)
