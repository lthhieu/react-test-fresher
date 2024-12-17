import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { RouterProvider } from "react-router";
import { App as AppAntd } from 'antd';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { router } from '@/routers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppAntd>
        <RouterProvider router={router} />
      </AppAntd>
    </Provider>
  </StrictMode>,
)
