import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";

import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import Settings from "./pages/Settings";
import FailureAuth from "./pages/FailureAuth";
import AddTask from "./pages/AddTask";
import PublicRouter from "./components/Authentication/PublicRouter";
export const router = createBrowserRouter([
  {
    element: (
      <PublicRouter>
        <Outlet />
      </PublicRouter>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/settings",
        element: <Settings />,
        errorElement: <Error />,
      },
      {
        path: "/auth/failed",
        element: <FailureAuth />,
        errorElement: <Error />,
      },
      {
        path: "/add-task",
        element: <AddTask />,
        errorElement: <Error />,
      },
    ],
  },
]);
