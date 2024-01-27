import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import './index.css'


import { disableReactDevTools } from  '@fvilers/disable-react-devtools'


if (process.env.NODE_ENV === 'production'){
    disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <I18nextProvider i18n={i18n}>
          <App />
      </I18nextProvider>
  </React.StrictMode>,
)
