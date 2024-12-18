import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { App as AppAntd } from 'antd';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import App from '@/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppAntd>
        <App />
      </AppAntd>
    </Provider>
  </StrictMode>,
)
