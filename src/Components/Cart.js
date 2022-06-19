import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import "react-multi-carousel/lib/styles.css";
import Header from "./Header";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

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
  dialog: {
    "& .MuiDialog-paper": {
      padding: "20px",
      width: "fit-content",
    },
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "600 !important",
  },
  addressLine: {
    width: "70%",
    margin: "0 auto",
    minWidth: "500px",
    height: "38px",
    border: "1px solid gray",
    borderRadius: "4px",
    paddingleft: "15px",
  },
  dialogButton: {
    marginTop: "10px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
  },
  address: {
    marginLeft: "20px",
    marginBottom: "10px",
  },
}));

function Cart({ cart, setCart, user, setUser }) {
  const [dialog, setDialog] = useState(false);
  const [finalCheckout, setFinalCheckout] = useState(false);
  const navigate = useNavigate();
  console.log(user);
  const [location, setLocation] = useState(
    user?.location
      ? user?.location && ""
      : { addressline1: "", addressline2: "", addressline3: "", pincode: "" }
  );
  const classes = useStyles();

  const total = () => {
    let sum = 0;
    cart?.map((item) => {
      sum += item.originalPrice;
    });
    return sum;
  };

  const removeCart = (cartItem) => {
    const filteredCart = cart?.filter((item) => item !== cartItem);
    setCart(filteredCart);
  };

  const checkout = () => {
    var size = Object.keys(user).length;
    if (size === 0) {
      alert("Please Login to checkout");
    } else if (cart?.length === 0) {
      alert("Your Cart is empty");
    } else {
      setDialog(true);
    }
  };
  const handleTextChange = (event, key) => {
    const value = event.target.value;
    setLocation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  useEffect(() => {
    if (user?.email) {
      axios({
        url: "http://localhost:2022/getuser",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { email: user?.email },
      })
        .then((res) => {
          setLocation(res?.data?.response?.[0]?.location);
        })
        .catch((error) => {
          //(error);
        });
    }
  }, [user]);

  // Payment Integration Functions
  const isDate = (val) => {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  };

  const isObj = (val) => {
    return typeof val === "object";
  };

  const stringifyValue = (val) => {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  };

  const buildForm = ({ action, params }) => {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });
    return form;
  };

  const post = (details) => {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  const getData = (data) => {
    return fetch(`http://localhost:2022/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  const payments = () => {
    const subTotal = total();
    const email = user?.email ?? "";
    console.log(subTotal, email);
    const paymentObj = {
      amount: subTotal,
      email,
      orders: cart,
    };

    getData(paymentObj).then((response) => {
      var information = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: response,
      };
      post(information);
    });
  };

  const handleOrders = () => {
    //("Order", cart);
    axios({
      url: "http://localhost:2022/orders",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: { email: user?.email, orders: cart },
    })
      .then((res) => {
        //Updated
        //(res, "Order added");
        setCart([]);
        setDialog(false);
        setFinalCheckout(false);
      })
      .catch((error) => {
        //(error);
      });
  };
  const handleLocation = () => {
    var size = Object.keys(user).length;
    if (size === 0) {
      alert("Please Login to update Location");
    } else {
      axios({
        url: "http://localhost:2022/location",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: { location: location, email: user?.email },
      })
        .then((response) => {
          setFinalCheckout(true);
          setDialog(false);
        })
        .catch((error) => {
          //(error, "location error");
        });
    }
    //setDialog(false);
  };
  const handleNavigate = (data, type) => {
    //(data, type);
    if (type === "product") {
      navigate(`/product?id=${data}`);
    } else if (type === "filter") {
    }
  };
  return (
    <div className={classes.root} data-testid="cart">
      <Header cart={cart} setCart={setCart} user={user} setUser={setUser} />
      <Dialog
        onClose={() => setFinalCheckout(false)}
        className={classes.dialog}
        open={finalCheckout}
      >
        <DialogTitle className={classes.dialogTitle}>Order Summary</DialogTitle>
        <div>
          <table className={classes.table}>
            <tr>
              <td className={classes.leftText}>Total Items in cart :</td>
              <td className={classes.rightText}>{cart?.length}</td>
            </tr>
            <tr>
              <td className={classes.leftText}>Subtotal :</td>
              <td className={classes.rightText}>₹: {total()}</td>
            </tr>
          </table>
          <h3>Address</h3>
          <div className={classes.address}>
            {" "}
            <div>{user?.name}</div>
            <div>{location?.addressline1?.toUpperCase()},</div>
            <div>{location?.addressline2?.toUpperCase()},</div>
            <div>{location?.addressline3?.toUpperCase()},</div>
            <div>{location?.pincode?.toUpperCase()}.</div>
          </div>

          <Button
            variant="contained"
            color="primary"
            className={classes.dialogButton}
            onClick={() => payments()}
          >
            Checkout
          </Button>
        </div>
      </Dialog>
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        className={classes.dialog}
      >
        <DialogTitle className={classes.dialogTitle}>
          Kindly Add Your Delivery Address
        </DialogTitle>
        <form className={classes.addressForm}>
          <p>Enter Your Name *</p>
          <input
            placeholder="Eg: John Durairaj"
            className={classes.addressLine}
            required
            value={user.name ?? ""}
          />{" "}
          <br />
          <p>Address Line 1 *</p>
          <input
            placeholder="Eg: Building/Flat No."
            className={classes.addressLine}
            value={location?.addressline1}
            required
            onChange={(e) => {
              handleTextChange(e, "addressline1");
            }}
          />
          <br />
          <p>Address Line 2 *</p>
          <input
            placeholder="Eg: Locality Name"
            className={classes.addressLine}
            required
            value={location?.addressline2}
            onChange={(e) => {
              handleTextChange(e, "addressline2");
            }}
          />
          <br />
          <p>Address Line 3 *</p>
          <input
            placeholder="Eg: City Name and State Name"
            className={classes.addressLine}
            required
            value={location?.addressline3}
            onChange={(e) => {
              handleTextChange(e, "addressline3");
            }}
          />
          <p>Pincode *</p>
          <input
            placeholder="Eg: 605345"
            className={classes.addressLine}
            required
            value={location?.pincode}
            onChange={(e) => {
              handleTextChange(e, "pincode");
            }}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            className={classes.dialogButton}
            onClick={() => handleLocation()}
          >
            Confirm Address
          </Button>
        </form>
      </Dialog>
      <div className={classes.container}>
        <div className={classes.cartWrapper}>
          <div className={classes.headingWrapper}>
            <div className={classes.heading}>Shopping Cart</div>
            <div className={classes.heading}>Price</div>
          </div>
          <div className={classes.line} />
          {cart?.length === 0 && (
            <img
              src="/emptycart.png"
              alt="no-img"
              className={classes.cartImage}
            />
          )}
          {cart?.map((item) => (
            <>
              <div
                className={classes.cart}
                onClick={() => handleNavigate(item._id, "product")}
              >
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
              <td className={classes.rightText}>{cart?.length}</td>
            </tr>
            <tr>
              <td className={classes.leftText}>Subtotal :</td>
              <td className={classes.rightText}>₹: {total()}</td>
            </tr>
          </table>
          <div className={classes.buyButton} onClick={() => checkout()}>
            Proceed to Checkout
          </div>
          <div className={classes.buyButton} onClick={() => setCart([])}>
            Remove all items
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
