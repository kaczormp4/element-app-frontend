import { FC, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SecuredRoute from "./routes/SecuredRoute";
import HomePage from "pages/Home";
import Dashboard from "pages/Dashboard";
import CreateElement from "pages/dashboard/CreateElement";
import EditElement from "pages/dashboard/EditElement";
import { Paths } from "constants/paths";
import ConfirmEmail from "pages/ConfirmEmail";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

const securedRoutes: RouteConfig[] = [
  {
    path: Paths.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: Paths.CREATE_ELEMENT,
    element: <CreateElement />,
  },
  {
    path: Paths.EDIT_ELEMENT,
    element: <EditElement />,
  },
  {
    path: Paths.CONFIRM_EMAIL,
    element: <ConfirmEmail />,
  },
];

const publicRoutes: RouteConfig[] = [
  {
    path: Paths.HOME,
    element: <HomePage />,
  },
  {
    path: Paths.LOGIN,
    element: <Login />,
  },
  {
    path: Paths.REGISTER,
    element: <Register />,
  },
];

const App: FC = () => {
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
