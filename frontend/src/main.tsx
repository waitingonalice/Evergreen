import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "~/components";
import { Dashboard, Login, OnboardLayout, Register, Root } from "~/routes";
import "../styles/animations.css";
import "../styles/index.css";

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
