import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';
import App from './components/app/App';
import ScrollToTop from './components/utils/ScrollToTop';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
