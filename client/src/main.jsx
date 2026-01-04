import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import { HomePage } from './pages/HomePage.jsx'
import Favorites from './pages/favorites.jsx'
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Navigate to="/games" replace />,
          },
          {
            path: '/games',
            element: <HomePage />,
          },
          {
            path: '/favorites',
            element: <Favorites />,
          },
        ]
      }
      // {
      //   path: '*',
      //   element: <HomePage />,
      // },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
