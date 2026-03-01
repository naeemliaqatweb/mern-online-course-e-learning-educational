import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster, toast } from 'sonner';



createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId="680126932840-b3dch6fnaofqeph6vouoods2v23p3a1q.apps.googleusercontent.com">
  <Provider store={store}>
  <Toaster position="top-right" richColors expand={true} closeButton />
  <App />
</Provider >
    </GoogleOAuthProvider>
  // </StrictMode>
  ,
)
