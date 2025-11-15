import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import Forgot from "./routes/Forgot";
import Register from "./routes/Register";
import Cart from "./routes/Cart";
import NotFound from "./routes/NotFound";
import Layout from "./components/Layout";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="contact" element={<Contact />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="register" element={<Register />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
