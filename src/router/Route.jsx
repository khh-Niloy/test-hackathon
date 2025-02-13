import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../home/Home";
import ReportCrime from "../Pages/ReportCrime";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/report-crime",
        element: <ReportCrime></ReportCrime>,
      },
    ],
  },
]);

export default router;
