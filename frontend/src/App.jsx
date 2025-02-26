import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {router} from './routes';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
       <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
