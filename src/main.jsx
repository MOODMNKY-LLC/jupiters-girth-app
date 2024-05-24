import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './custom.css'; // Import the custom CSS file
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from './supabaseClient';
import Chat from './Chat.jsx'; // Import the Chat component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Auth.UserContextProvider>
  </React.StrictMode>,
);
