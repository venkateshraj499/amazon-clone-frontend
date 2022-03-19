import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Product from "./Product";
import Filter from "./Filter";
import Cart from "./Cart";

function Router() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    var size = Object.keys(user).length;
    console.log(size);
    if (size > 0) {
      axios({
        url: "https://amazon--backend.herokuapp.com/user",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: user,
      })
        .then((response) => {
          console.log("user Updated");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);
  return (
    <div>
      {console.log(user)}
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                cart={cart}
                setCart={setCart}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            exact
            path="/product"
            element={
              <Product
                cart={cart}
                setCart={setCart}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            exact
            path="/filter"
            element={
              <Filter
                cart={cart}
                setCart={setCart}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                user={user}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
