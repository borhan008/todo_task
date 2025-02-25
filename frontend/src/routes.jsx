import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/Verify2FA";
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
                path : "/setup2fa",
                element : <Setup2FA />,
                errorElement: <Error />
            },
            {
                path : "/verify2fa",
                element : <Verify2FA />,
                errorElement: <Error />
            },
            {
                path : "/",
                element : <Home />,
                errorElement: <Error />
            },
        ]   
    }


]);