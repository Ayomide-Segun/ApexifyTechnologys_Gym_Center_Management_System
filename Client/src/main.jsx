import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { UtilityContextProvider } from './contexts/utilityContext.jsx'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { DataContextProvider } from './contexts/DataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <UtilityContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </UtilityContextProvider>
     
      
    </StrictMode>
  </BrowserRouter>
  ,
)
