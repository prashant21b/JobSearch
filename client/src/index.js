import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { UserProvider } from './Context/user';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <GoogleOAuthProvider clientId="277285499709-qfs7dpoh18bjhs082vu3nsjn7q4dte1b.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>;

    </UserProvider>

    <Toaster />
  </React.StrictMode>
);

