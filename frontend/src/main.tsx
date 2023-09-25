import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, OnboardLayout } from "~/components";
import { clientRoutes } from "~/constants";
import {
  Balance,
  Billing,
  CreateTransaction,
  Dashboard,
  ForgotPassword,
  Kanban,
  Login,
  Register,
  ResetPassword,
  Root,
  Transaction,
  UnknownRoute,
  Verify,
} from "~/routes";
import "../styles/animations.css";
import "../styles/index.css";
import { App } from "./components/app-context";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <OnboardLayout />,
        children: [
          { path: clientRoutes.root, element: <Root /> },
          // Authentication routes
          { path: clientRoutes.auth.login, element: <Login /> },
          { path: clientRoutes.auth.register, element: <Register /> },
          { path: clientRoutes.auth.verify, element: <Verify /> },
          {
            path: clientRoutes.auth.forgotPassword,
            element: <ForgotPassword />,
          },
          { path: clientRoutes.auth.resetPassword, element: <ResetPassword /> },
        ],
      },
      // Main app starts here
      {
        element: <Layout />,
        children: [
          { path: clientRoutes.dashboard.index, element: <Dashboard /> },
          { path: clientRoutes.balance.index, element: <Balance /> },
          { path: clientRoutes.transactions.index, element: <Transaction /> },
          {
            path: clientRoutes.transactions.create,
            element: <CreateTransaction />,
          },
          { path: clientRoutes.billing.index, element: <Billing /> },
          { path: clientRoutes.kanban.index, element: <Kanban /> },
        ],
      },
      // 404
      { element: <UnknownRoute />, path: "*" },
    ],
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
