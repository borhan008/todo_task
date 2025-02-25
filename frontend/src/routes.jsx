import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";

import ProtectedRoute from "./components/Authentication/ProtectedRoute";
export const router = createBrowserRouter([

    {
        path : "/login",
        element : <Login />,
        errorElement: <Error />
    },
   
    {
        element : <ProtectedRoute />,
        children :[ 
            {
                path : "/",
                element : <Home />,
                errorElement: <Error />
            },
        ]   
    }


]);