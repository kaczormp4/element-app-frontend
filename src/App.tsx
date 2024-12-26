import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SecuredRoute from "./routes/SecuredRoute";
import HomePage from "pages/Home";
import Dashboard from "pages/Dashboard";
import CreateElement from "pages/dashboard/CreateElement";
import EditElement from "pages/dashboard/EditElement";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <SecuredRoute>
              <Dashboard />
            </SecuredRoute>
          }
        />
        <Route
          path="/dashboard/new"
          element={
            <SecuredRoute>
              <CreateElement />
            </SecuredRoute>
          }
        />
        <Route
          path="/dashboard/:id/edit"
          element={
            <SecuredRoute>
              <EditElement />
            </SecuredRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
