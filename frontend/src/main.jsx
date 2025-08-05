// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom';
// import './index.css'
// import App from '/src/App.jsx'

// const rootElement = document.getElementById('root');
// if (rootElement) {
//   createRoot(rootElement).render(
//     <StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </StrictMode>
//   );
// } else {
//   console.error("Root element not found");
// }

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from '/src/App.jsx'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}