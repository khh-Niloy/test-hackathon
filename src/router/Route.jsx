import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../home/Home";
import ReportCrime from "../Pages/ReportCrime";
import CrimeDetailes from "../Pages/CrimeDetailes";
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
      {
        path: "/crime-details/:id",
        element: <CrimeDetailes></CrimeDetailes>,
      },
    ],
  },
]);

export default router;
