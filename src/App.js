import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { UserProvider } from "./userContext";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Error from "./pages/ErrorPage";

import CSS from './App.css'

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
    setUser({ id: null, isAdmin: null });
  };

  useEffect(() => {
    // console.log(user);
    fetch(`${process.env.REACT_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      if (typeof data !== "undefined") {
          setUser({
              id: data._id,
              isAdmin: data.isAdmin
          });
      } else {
          setUser({
              id: null,
              isAdmin: null
          });
      }
    });

    // console.log(localStorage);
  }, [user]);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
