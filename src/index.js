import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserContextProvider } from './context/UserContext';
import './index.scss';
import App from './App';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
