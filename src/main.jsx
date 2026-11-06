
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import SearchContextProvider from './context/SearchContext.jsx'
import RouterGuardContext from './context/RouterGuardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="37444952326-34bb6545kqlub0psqo2263id6bcmefm3.apps.googleusercontent.com">
        <SearchContextProvider>
        <RouterGuardContext>
            <App />
        </RouterGuardContext>
        </SearchContextProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
