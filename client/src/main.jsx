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
import {Container} from "react-bootstrap";
import {Profile as EmployerProfile} from "./pages/employer/Profile.jsx";
import JobListing from "./pages/JobListing.jsx";
import {Provider} from "react-redux";
import store from "./store";
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
        element: <EmployerProfile />
    },
    {
        path: "/editjob",
        element: <EditJob />
    },
    {
        path: "/newjob",
        element: <EditJob />
    },
    {
        path: "/job",
        element: <JobListing />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <Container>
              <RouterProvider router={router} />
          </Container>
      </Provider>
  </React.StrictMode>,
)
