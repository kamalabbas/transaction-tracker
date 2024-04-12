import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/LoginPage";

// const router = createBrowserRouter([
//     { path: "/", element: <HomePage /> }
// ]);
const router = createBrowserRouter([
    { path: "/", element: <Home />},
    { path: "/login", element: <LoginPage />}
  ]);
export default router;