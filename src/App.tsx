import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SecuredRoute from "./routes/SecuredRoute";
import HomePage from "pages/Home";
import Dashboard from "pages/Dashboard";
import CreateElement from "pages/dashboard/CreateElement";
import EditElement from "pages/dashboard/EditElement";

const App: FC = () => {
  const securedRoutes = [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/dashboard/new",
      element: <CreateElement />,
    },
    {
      path: "/dashboard/:id/edit",
      element: <EditElement />,
    },
  ];

  const publicRoutes = [
    {
      path: "/*",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  return (
    <Router>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {securedRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<SecuredRoute>{element}</SecuredRoute>}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
