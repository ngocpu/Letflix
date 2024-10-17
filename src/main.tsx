import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import './index.css'
import { persistor, store } from './state/store.ts'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
          <App />
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
)
