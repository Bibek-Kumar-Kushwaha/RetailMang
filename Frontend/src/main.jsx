import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Route/Router.jsx';
import AuthProvider from './Utils/IsAdmin';

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
);
