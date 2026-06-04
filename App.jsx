import React, { useEffect } from "react";
import Box from "@mui/material/Box";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser, clearUser } from "./store/authSlice";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookiePopup from "./components/CookiePopup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import About from "./pages/About";
import AddStudents from "./components/AddStudents";
import MannualAttendance from "./components/MannualAttendance";
import AttendanceByFace from "./components/AttendanceByFace";
import AddFacial from "./components/AddFacial";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import StudentsDetails from "./components/StudentsDetails";
import { useSelector as useReduxSelector } from "react-redux";
import { selectIsAdmin } from "./store/authSlice";

export default function App() {
  const user = useSelector(selectUser);
  const isAdmin = useReduxSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const isFullScreenPage = [
    "/about",
    "/dashboard",
    "/add-student",
    "/attendance-manual",
    "/facial-attendance",
    "/face-management",
  ].includes(location.pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const normalized = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "",
          photoURL: firebaseUser.photoURL || "",
        };
        dispatch(setUser(normalized));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  function ProtectedRoute({ children }) {
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }

  function PublicOnlyRoute({ children }) {
    if (user) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  function AdminRoute({ children }) {
    if (!isAdmin) {
      return <Navigate to="/admin-login" replace />;
    }
    return children;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <Navbar />

      <Box sx={{ flex: 1 }}>
        {/* Special layout for Home page */}
        {isHome ? (
          <Home />
        ) : (
          <Box sx={{ p: isFullScreenPage ? 0 : { xs: 2, md: 3 } }}>
            <Routes>
                <Route
                  path="/login"
                  element={
                    <PublicOnlyRoute>
                      <Login />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicOnlyRoute>
                      <Signup />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/add-student"
                  element={
                    <ProtectedRoute>
                      <AddStudents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/attendance-manual"
                  element={
                    <ProtectedRoute>
                      <MannualAttendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/facial-attendance"
                  element={
                    <ProtectedRoute>
                      <AttendanceByFace />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/face-management"
                  element={
                    <ProtectedRoute>
                      <AddFacial />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/details"
                  element={
                    <ProtectedRoute>
                      <StudentsDetails />
                    </ProtectedRoute>
                  }
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/use/Admin"
                  element={
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        )}
      </Box>

      {/* Footer - show on all pages */}
      <Footer />

      {/* Cookie Popup */}
      <CookiePopup />
    </Box>
  );
}