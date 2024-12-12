import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import App from '@/App';
import BookPage from '@/pages/client/book';
import HomePage from '@/pages/client/home';
import AboutPage from '@/pages/client/about';
import LoginPage from '@/pages/client/auth/login';
import RegisterPage from '@/pages/client/auth/register';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<HomePage />} />
          <Route path="books" element={<BookPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)