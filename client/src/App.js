import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner";
import AdminPage from "./pages/admin/AdminPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddDoctors from "./pages/admin/AddDoctors";
import ManageDocs from "./pages/admin/ManageDocs";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import BookAppointment from "./pages/BookAppointment";
import ViewDoctors from "./pages/ViewDoctors";
import AdminProtectedRoutes from "./components/AdminProtectedRoutes";
import ManageUsers from "./pages/admin/ManageUsers";
import UserAppointments from "./pages/ViewAppointments";
import ManageAppointments from "./pages/admin/ManageAppointment";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/admin"
              element={
                <AdminProtectedRoutes>
                  <AdminPage />
                </AdminProtectedRoutes>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/admin/doctors"
              element={
                <AdminProtectedRoutes>
                  <ManageDocs />
                </AdminProtectedRoutes>
              }
            ></Route>
            <Route
              path="/admin/view-all-appointments"
              element={
                <AdminProtectedRoutes>
                  <ManageAppointments />
                </AdminProtectedRoutes>
              }
            ></Route>
            <Route
              path="/admin/add-doctors"
              element={
                <AdminProtectedRoutes>
                  <AddDoctors />
                </AdminProtectedRoutes>
              }
            ></Route>

            <Route
              path="/admin/patients"
              element={
                <AdminProtectedRoutes>
                  <ManageUsers />
                </AdminProtectedRoutes>
              }
            ></Route>
            <Route
              path="/book-appointment"
              element={
                <ProtectedRoutes>
                  <BookAppointment />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/view-doctors"
              element={
                <ProtectedRoutes>
                  <ViewDoctors />
                </ProtectedRoutes>
              }
            ></Route>

            <Route
              path="/view-appointments"
              element={
                <ProtectedRoutes>
                <UserAppointments/>
                 </ProtectedRoutes>
              }
            ></Route>

            {/* <Route path="/404" element={<NotFoundPage />}></Route> */}
            {/* Add a catch-all route for any other unknown routes */}
            {/* <Route path="*" element={<navigate to="/404" />} /> */}
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
