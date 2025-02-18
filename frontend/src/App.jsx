import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { user } = useContext(AppContext);

  return (
    <Router>
      <Routes>
        {/* Protected Route - Home Page */}
        <Route path="/" element={user ? <Home /> : <Login />} />

        {/* Public Routes - Redirect to Home if already logged in */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
      </Routes>
    </Router>
  );
};

export default App;
