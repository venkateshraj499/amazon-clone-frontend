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
        url: "http://localhost:2022/user",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: user,
      })
        .then((response) => {
          console.log(response.data, "Router");
          setCart(response.data.currentUser.cart);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  useEffect(() => {
    axios({
      url: "http://localhost:2022/cart",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: { cartItems: cart, email: user.email },
    })
      .then((response) => {
        console.log(response.data, "Cart");
      })
      .catch((error) => {
        console.log(error, "cart error");
      });
  }, [cart]);
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
