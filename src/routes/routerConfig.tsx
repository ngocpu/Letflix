import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedLayout from "@/Layout/ProtectedLayout";
import PublicLayout from "@/Layout/PublicLayout";
import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import NotFound from "@/views/NotFound";
import Browse from "@/views/Browse";
import Mylibrary from "@/views/Mylibrary";
import MyProflie from "@/views/Profile";
import ResultsPage from '@/views/ResultsPage'
import Movie from "@/views/Movie";
import ProtectedRoute from "@/components/ProtectedRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/browse" />,
    },
    {
        path: "/browse",
        element: <ProtectedLayout />,
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            ),
          },
          {
            path: "my-library", 
            element: (
              <ProtectedRoute>
                <Mylibrary />
              </ProtectedRoute>
            ),
          },
        ],
        errorElement: <NotFound />,
      },
    {
        path: 'profile',
        element: <ProtectedRoute>
                    <MyProflie />
                </ProtectedRoute>,
        errorElement: <NotFound />
    },
    {
        path: "/results",
        element: (
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        ),
        errorElement: <NotFound />
    },
    {
      path: "movies/:id",
      element: (
        <ProtectedRoute>
          <Movie />
        </ProtectedRoute>
      ),
    },
    {
        path: '/auth',
        element: <PublicLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ],

    },
    {
        path: "*",
        element: <NotFound />
    }
])