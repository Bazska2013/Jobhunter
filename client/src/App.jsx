import {Layout} from "./Layout.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {RequireAuth} from "./features/auth/RequireAuth.jsx";
import EditJob from "./pages/employer/EditJob.jsx";
import JobListing from "./pages/JobListing.jsx";
import NoMatch from "./pages/NoMatch.jsx";
import {RequireCompany} from "./features/auth/RequireCompany.jsx";
import {UserTypeProfile} from "./features/auth/UserTypeProfile.jsx";

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
                      <UserTypeProfile />
                  </RequireAuth>
                }
            />
            <Route
                path="/newjob"
                element={
                  <RequireAuth>
                      <RequireCompany>
                        <EditJob />
                      </RequireCompany>
                  </RequireAuth>
                }
            />
            <Route
                path="/editjob/:id"
                element={
                  <RequireAuth>
                      <RequireCompany>
                          <EditJob />
                      </RequireCompany>
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
              <Route
                path="*"
                element={<NoMatch />}
              />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
