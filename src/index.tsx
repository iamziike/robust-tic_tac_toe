import React from 'react';
import ReactDOM from 'react-dom/client';

import StoreProvider from './store/StoreProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
