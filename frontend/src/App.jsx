import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {router} from './routes';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <AuthProvider>
       <RouterProvider router={router} />

        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App
