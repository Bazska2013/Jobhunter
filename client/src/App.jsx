import {Layout} from "./Layout.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {RequireAuth} from "./features/auth/RequireAuth.jsx";
import {Profile} from "./pages/employee/Profile.jsx";
import EditJob from "./pages/employer/EditJob.jsx";
import JobListing from "./pages/JobListing.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
            />
            <Route
                path="/newjob"
                element={
                  <RequireAuth>
                    <EditJob />
                  </RequireAuth>
                }
            />
            <Route
                path="/editjob"
                element={
                  <RequireAuth>
                    <EditJob />
                  </RequireAuth>
                }
            />
            <Route
                path="/job"
                element={
                  <RequireAuth>
                    <JobListing />
                  </RequireAuth>
                }
            />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
