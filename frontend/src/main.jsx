import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '/src/App.jsx'
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Toaster />
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}