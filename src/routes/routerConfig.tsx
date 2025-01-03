import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedLayout from "@/shared/Layout/ProtectedLayout";
import PublicLayout from "@/shared/Layout/PublicLayout";
import Register from "@/modules/auth/RegisterForm";
import Browse from "@/modules/Home/Browse";
import Mylibrary from "@/modules/mylibrary/Mylibrary";
import MyProflie from "@/modules/profile/Profile";
import ResultsPage from '@/modules/search/ResultsPage'
import Movie from "@/modules/movies/Movie";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import Login from "@/modules/auth/LoginForm";
import NotFound from "@/shared/views/NotFound";


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