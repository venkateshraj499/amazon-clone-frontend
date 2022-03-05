import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "react-multi-carousel/lib/styles.css";
import Header from "./Header";

import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    margin: "20px 50px",
  },
  root: {
    background: "aliceblue",
  },
  cartWrapper: {
    width: "70%",
    background: "white",
    padding: "0 20px",
  },
  image: {
    width: "100px",
    objectFit: "contain",
    marginRight: "50px",
  },
  product: {
    width: "65%",
  },
  cart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100%",
    marginLeft: "50px",
  },
  button: {
    margin: "15px",
    padding: "5px",
    width: "100%",
    textAlign: "center",
    background: "orange",
    borderRadius: "15px",
    cursor: "pointer",
    "&:hover": {
      border: "1px solid orange",
      background: "white",
    },
  },
  buyButton: {
    margin: "15px auto",
    padding: "5px",
    width: "80%",
    textAlign: "center",
    background: "orange",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "450",
    "&:hover": {
      border: "1px solid orange",
      background: "white",
    },
  },
  line: {
    width: "100%",
    background: "lightgray",
    height: "1px",
    marginTop: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
  },
  headingWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  heading: {
    marginTop: "10px",
    fontSize: "20px",
    fontWeight: "500",
    marginRight: "60px",
  },
  totalWrapper: {
    background: "white",
    marginLeft: "30px",
    width: "30%",
    height: "fit-content",
    padding: "30px",
  },
  leftText: {
    margin: "10px",
    fontSize: "24px",
    fontWeight: "450",
  },
  table: {
    margin: "0 auto",
  },
  rightText: {
    padding: "10px 20px",
    fontSize: "24px",
    fontWeight: "500",
  },
  cartImage: {
    margin: "50px 0 0 50%",
    transform: "translateX(-50%)",
  },
}));

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const classes = useStyles();
  {
    console.log(cart);
  }
  const total = () => {
    let sum = 0;
    cart.map((item) => {
      sum += item.originalPrice;
    });
    return sum;
  };

  const removeCart = (cartItem) => {
    const filteredCart = cart.filter((item) => item !== cartItem);
    setCart(filteredCart);
  };
  return (
    <div className={classes.root}>
      <Header cart={cart} setCart={setCart} />
      <div className={classes.container}>
        <div className={classes.cartWrapper}>
          <div className={classes.headingWrapper}>
            <div className={classes.heading}>Shopping Cart</div>
            <div className={classes.heading}>Price</div>
          </div>
          <div className={classes.line} />
          {cart.length === 0 && (
            <img
              src="/emptycart.png"
              alt="no-img"
              className={classes.cartImage}
            />
          )}
          {cart.map((item) => (
            <>
              <div className={classes.cart}>
                <img
                  src={item.images[0]}
                  alt="no-img"
                  className={classes.image}
                />
                <div className={classes.product}>
                  <h2>{item.name}</h2>
                  <h4>{item.variant}</h4>
                  <p>{item.description}</p>
                  <Rating readOnly value={item.rating} precision={0.5} />
                </div>
                <div className={classes.buttons}>
                  <h4>₹: {item.originalPrice} /-</h4>
                  <div
                    className={classes.button}
                    onClick={() => removeCart(item)}
                  >
                    {" "}
                    {"Remove"}
                  </div>
                  <div className={classes.button}>Buy now</div>
                </div>
              </div>
              <div className={classes.line} />
            </>
          ))}
        </div>
        <div className={classes.totalWrapper}>
          <table className={classes.table}>
            <tr>
              <td className={classes.leftText}>Total Items in cart :</td>
              <td className={classes.rightText}>{cart.length}</td>
            </tr>
            <tr>
              <td className={classes.leftText}>Subtotal :</td>
              <td className={classes.rightText}>₹: {total()}</td>
            </tr>
          </table>
          <div className={classes.buyButton}>Proceed to Checkout</div>
          <div className={classes.buyButton} onClick={() => setCart([])}>
            Remove all items
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
