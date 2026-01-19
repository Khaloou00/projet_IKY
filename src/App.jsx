import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import LayoutUI from "./components/Layout/LayoutUI";
import Home from "./routes/Home";
import DashboardAdmin from "./routes/admin/DashboardAdmin";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import AllProducts from "./routes/admin/AllProducts";
import AddProduct from "./routes/admin/AddProduct";
import EditProduct from "./routes/admin/EditProduct";
import Users from "./routes/admin/Users";
import Orders from "./routes/admin/Orders";

const router = createBrowserRouter([
  {
    element: <LayoutUI />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <DashboardAdmin /> },
      { path: "all-products", element: <AllProducts /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "edit-product/:id", element: <EditProduct /> },
      { path: "orders", element: <Orders /> },
      { path: "users", element: <Users /> },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
