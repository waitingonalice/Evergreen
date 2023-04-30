import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { OnboardLayout, Login, Register, Dashboard, Root } from "~/routes";
import { Layout } from "~/components";
import "../styles/index.css";
import "../styles/animations.css";

const router = createBrowserRouter([
  {
    element: <OnboardLayout />,
    children: [
      { path: "/", element: <Root /> },
      // Authentication routes
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // Main content starts here
  {
    element: <Layout />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
