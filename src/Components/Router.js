import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Filter from "./Filter";
import Cart from "./Cart";

function Router() {
  const [cart, setCart] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home cart={cart} setCart={setCart} />}
          />
          <Route
            exact
            path="/product"
            element={<Product cart={cart} setCart={setCart} />}
          />
          <Route
            exact
            path="/filter"
            element={<Filter cart={cart} setCart={setCart} />}
          />
          <Route
            exact
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
