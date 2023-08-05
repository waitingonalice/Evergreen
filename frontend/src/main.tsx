import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, OnboardLayout } from "~/components";
import { clientRoutes } from "~/constants";
import { Dashboard, Login, Register, Root, Verify } from "~/routes";
import "../styles/animations.css";
import "../styles/index.css";

const router = createBrowserRouter([
  {
    element: <OnboardLayout />,
    children: [
      { path: clientRoutes.root, element: <Root /> },
      // Authentication routes
      { path: clientRoutes.login, element: <Login /> },
      { path: clientRoutes.register, element: <Register /> },
      { path: clientRoutes.verify, element: <Verify /> },
    ],
  },

  // Main content starts here
  {
    element: <Layout />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
