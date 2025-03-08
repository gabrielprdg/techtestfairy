import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AuthContextProvider } from './contexts/authContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthContextProvider> {/* Envolvendo o App com o contexto de autenticação */}
      <App />
    </AuthContextProvider>
  </BrowserRouter>,
)
