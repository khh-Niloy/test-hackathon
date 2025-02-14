import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Route.jsx";
import AuthContextProvider from "./provider/AuthContextProvider.jsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
