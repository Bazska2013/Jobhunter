import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NavBar from "./components/NavBar.jsx";
import {Profile as EmployeeProfile} from "./pages/employee/Profile.jsx";
import EditJob from "./pages/employer/EditJob.jsx";
// import {Profile as EmployerProfile} from "./pages/employee/Profile.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/profile",
        element: <EmployeeProfile />
    },
    {
        path: "/editjob",
        element: <EditJob />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <NavBar />
      <RouterProvider router={router} />
  </React.StrictMode>,
)
