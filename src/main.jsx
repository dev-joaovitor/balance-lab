import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import Home from './pages/Home.jsx';
import Table from './pages/Table.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Home />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/table",
        element: <Table />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
