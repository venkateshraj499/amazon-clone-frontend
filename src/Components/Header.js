import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { GoogleLogin } from "react-google-login";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "60px",
    background: "black",
    padding: "0 25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  sub: {
    height: "35px",
    background: "#1f1e1c",
    padding: "0 25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    color: "white",
    cursor: "pointer",
    padding: "5px",
    "&:hover": {
      border: " 1px solid white",
    },
  },
  MenuIcon: {
    color: "white",
    cursor: "pointer",
    padding: "5px",
    "&:hover": {
      border: "1px solid white",
    },
  },
  logoWrapper: {
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      opacity: "0.5",
    },
  },
  logo: {
    width: "128px",
    objectFit: "contain",
  },
  locationWrapper: {
    borderRadius: "10px",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.6",
    },
  },
  locationWrapper2: {
    marginLeft: "20px",
    borderRadius: "10px",
    cursor: "pointer",
    position: "relative",
    "& :hover": {
      opacity: "0.6",
    },
  },
  orderWrapper: {
    padding: "50px",
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
  location: {
    display: "flex",
    alignItems: "center",
    marginLeft: "30px",
    border: "none",
  },
  locationIcon: {
    color: "white",
    marginRight: "10px",
  },
  line1: {
    color: "white",
    fontSize: "14px",
    fontWeight: "400",
  },
  line2: {
    color: "white",
    fontWeight: "600",
  },
  inputWrapper: {
    display: "flex",
    flexGrow: "1",
    maxWidth: "800px",
  },
  select: {
    background: "white",
    fontSize: "15px",
    color: "black",
    padding: "10px",
    borderRadius: "4px 0 0 4px",
    marginLeft: "25px",
    height: "45px",
  },
  input: {
    background: "white",
    height: "43px",
    border: "none !important",
    marginLeft: "1px",
    width: "100%",
  },
  SearchIcon: {
    background: "orange",
    fontSize: "30px",
    padding: "8px",
    borderRadius: "0 4px 4px 0",
  },
  cartWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column-reverse",
    marginLeft: "30px",
    cursor: "pointer",
    "& :hover": {
      opacity: "0.6",
    },
  },
  cartIcon: {
    color: "white",
    fontSize: "35px",
  },
  subWrapper: {
    marginTop: "20px",
    position: "absolute",
    borderRadius: "0",
    border: "1px solid black",
    marginLeft: "-100px",
    zIndex: "2",
    animation: "$up 0.5s",
    marginTop: "0px",
  },
  "@keyframes up": {
    "0%": {
      transform: "translateY(30px)",
      opacity: "0",
    },
    "100%": {
      transform: "translateY(0)",
      opacity: "1",
    },
  },
  subCategory: {
    fontSize: "14px",
    color: "black",
    padding: "10px",
    background: "white",
    cursor: "pointer",
    minWidth: "150px",
    "&:hover": {
      background: "lightgray",
    },
  },
  hide: {
    display: "none",
    animation: "$close 0.5s",
  },
  "@keyframes close": {
    "0%": {
      transform: "translateX(0)",
    },
    "100%": {
      transform: "translateX(-100%)",
    },
  },
  inputAndSuggestion: {
    position: "relative",
    width: "100%",
  },
  suggestionWrapper: {
    position: "absolute",
    background: "white",
    top: "30px",
    width: "100%",
    listStyle: "none",
    zIndex: "5",
  },
  "@keyframes open": {
    "0%": {
      transform: "translateX(-100%)",
    },

    "100%": {
      transform: "translateX(0%)",
    },
  },
  suggestion: {
    padding: " 10px 15px 10px 0",
    marginLeft: "-15px",
    "&:hover": {
      background: "lightgray",
    },
  },
  sideTrayLine1: {
    fontSize: "20px",
    fontWeight: "700",
    padding: "10px 10px 10px 30px",
    cursor: "default",
  },
  sideTrayLine2: {
    fontSize: "18px",
    padding: "10px 10px 10px 50px",
    cursor: "pointer",
    "&:hover": {
      background: "lightgray",
    },
  },
  sideTrayWrapper: {
    display: "flex",
    position: "relative",
    zIndex: "10",
  },
  sideTray: {
    marginTop: "-100px",
    background: "white",
    width: "30%",
    height: "100vh",
    zIndex: "2",
    overflowY: "auto",
    animation: "$open 1s",
    position: "absolute",
  },
  sideTrayHeading: {
    color: "white",
    fontSize: "24px",
    fontWeight: "700",
    background: "black",
    padding: "15px",
  },
  closeIcon: {
    color: "white",
    fontSize: "34px",
    zIndex: "2",
    background: "black",
    cursor: "pointer",
  },
  hideSideTray: {
    animation: "$close 0.5s",
    transform: "translateX(-100%)",
    background: "white",
    marginTop: "-110px",
    position: "absolute",
    zIndex: "3",
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
  button: {
    margin: "20px 0 10px 50% ",
    transform: "translateX(-50%)",
  },
  loginButton: {
    justifyContent: "center",
    margin: "30px",
  },
  userImage: {
    width: "30px",
    margin: "0 0 0 50% ",
    transform: "translateX(-50%)",
    borderRadius: "50%",
    opacity: "1.5",
    filter: "brightness(1.5)",
  },
  statusWrapper: {
    display: "flex",
    alignItems: "center",
  },
  greenDot: {
    backgroundColor: "green",
    width: "10px",
    marginRight: "10px",
    height: "10px",
    borderRadius: "50%",
  },
}));

function Header({ cart, setCart, user, setUser }) {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [over, setOver] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [activate, setActivate] = useState(true);
  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [orderView, setOrderView] = useState(false);
  const [location, setLocation] = useState(
    user?.location
      ? user?.location
      : {
          addressline1: "No 24",
          addressline2: "Chetty st",
          addressline3: "chennai",
          pincode: "123",
        }
  );

  const navigate = useNavigate();
  useEffect(() => {
    axios({
      url: "http://localhost:2022/categories",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setCategory(res.data.categories);
      })
      .catch((error) => {
        //(error);
      });
  }, []);

  useEffect(() => {
    var size = Object.keys(user).length;
    if (size > 0) {
      const temp = user;
      temp[location] = location;
      console.log(temp);
      localStorage.setItem("user", JSON.stringify(user));
    }
    if (user?.email) {
      axios({
        url: "http://localhost:2022/getuser",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { email: user?.email },
      })
        .then((res) => {
          setLocation(res?.data?.response?.[0]?.location);
          setUserDetails(res?.data?.response[0]);
        })
        .catch((error) => {
          //(error);
        });
    }
  }, [user, cart]);

  const handleInputChange = (event) => {
    const search = event.target.value;
    let searchSub = [];
    category.map((each, i) => {
      if (each.name === selectedCategory) {
        searchSub = each.sub.filter((item) =>
          item.toLowerCase().includes(search)
        );
      }
      return null;
    });
    if (searchSub.length === 0 || event.target.value === " ") {
      setActivate(false);
    } else {
      setActivate(true);
    }
    setSuggestions(searchSub);
  };
  const handleNavigate = (sub, cat) => {
    let subCat = "";
    if (sub === "TV") {
      subCat = sub;
    } else {
      subCat = sub.toLowerCase();
    }
    navigate(`/filter?category=${cat.toLowerCase()}&sub=${subCat}`);

    setSelectedSubCategory(sub);
    setSelectedCategory(null);
    setSuggestions([]);
  };
  const handleLocation = (event) => {
    event.preventDefault();
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
          setUser((prev) => ({
            ...prev,
            location: location,
          }));
        })
        .catch((error) => {
          //(error, "location error");
        });
    }
    setDialog(false);
  };
  const handleTextChange = (event, key) => {
    const value = event.target.value;
    setLocation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const responseGoogle = (response) => {
    setUser(response.profileObj);

    setSignIn(false);
  };
  const responseGoogleFail = (response) => {};

  const emptyLocal = () => {
    console.log("clicked");
    localStorage.clear();
    setUser({});
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.logoWrapper}>
          <img
            src="/logo.png"
            alt="no-img"
            className={classes.logo}
            onClick={() => navigate("/")}
          />
        </div>
        <div
          className={classes.locationWrapper}
          onClick={() => setDialog(true)}
        >
          <div className={classes.location}>
            <LocationOnIcon className={classes.locationIcon} />
            <div>
              <div className={classes.line1}>
                {user.location ? user.name : "Deliver to username"}
              </div>
              <div className={classes.line2}>
                {" "}
                {user.location
                  ? user.location.addressline3.toUpperCase()
                  : "Location PIN"}
              </div>
            </div>
          </div>
        </div>

        <Dialog
          open={dialog}
          onClose={() => setDialog(false)}
          className={classes.dialog}
        >
          <DialogTitle className={classes.dialogTitle}>
            Kindly Add Your Delivery Address
          </DialogTitle>
          <form className={classes.addressForm} onSubmit={handleLocation}>
            <p>Enter Your Name *</p>

            <input
              placeholder="Eg: John Durairaj"
              className={classes.addressLine}
              required
              value={user.name ?? ""}
            />
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
              className={classes.button}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Dialog>
        <div className={classes.inputWrapper}>
          <Select
            defaultValue={"all"}
            className={classes.select}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <MenuItem value={"all"}>Select</MenuItem>
            {category.map((item, i) => (
              <MenuItem key={i} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <div className={classes.inputAndSuggestion}>
            <input
              id="outlined-basic"
              className={classes.input}
              variant="outlined"
              onChange={handleInputChange}
              value={selectedSubCategory}
            />
            <ul className={classes.suggestionWrapper}>
              {activate ? (
                suggestions.map((item, i) => (
                  <li
                    onClick={() => {
                      handleNavigate(item, selectedCategory);
                    }}
                    className={classes.suggestion}
                  >
                    {item}
                  </li>
                ))
              ) : selectedCategory === null ? (
                <li className={classes.suggestion}>Select a category</li>
              ) : (
                <li className={classes.suggestion}>No items found</li>
              )}
            </ul>
          </div>

          <SearchIcon className={classes.SearchIcon} />
        </div>
        {user?.name ? (
          <Tooltip
            interactive
            title={
              <Button
                color="primary"
                variant="contained"
                onClick={() => emptyLocal()}
              >
                LOGOUT
              </Button>
            }
          >
            <div className={classes.locationWrapper2}>
              <img src={user?.imageUrl} className={classes.userImage} />
              <div className={classes.line1}>Hello, {user?.name}</div>
            </div>
          </Tooltip>
        ) : (
          <div
            className={classes.locationWrapper2}
            onClick={() => {
              setSignIn(true);
            }}
          >
            <div className={classes.line1}>Hello, User</div>
            <div className={classes.line2}>Sign in</div>
          </div>
        )}

        <Dialog
          open={signIn}
          onClose={() => setSignIn(false)}
          className={classes.dialog}
        >
          <DialogTitle className={classes.dialogTitle}>
            Login with your Google account
          </DialogTitle>
          <GoogleLogin
            clientId="406381790404-82an2nl2u3ic6onsfprtedv7ldtd3t3r.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogleFail}
            cookiePolicy={"single_host_origin"}
            className={classes.loginButton}
          />
        </Dialog>
        <div
          className={classes.locationWrapper2}
          onClick={() => setOrderView(true)}
        >
          <div className={classes.line1}>Your Orders</div>
          <div className={classes.line2}>{"& returns"}</div>
          {orderView && (
            <Dialog
              open={orderView}
              className={classes.dialog}
              onClose={() => setOrderView(false)}
            >
              {userDetails?.shopped?.map((item) => (
                <>
                  {item && (
                    <div className={classes.cart}>
                      <img
                        src={item?.images?.[0]}
                        alt="no-img"
                        className={classes.image}
                      />
                      <div className={classes.product}>
                        <h4>{item.name}</h4>
                        <p>{item.variant}</p>
                        <div className={classes.statusWrapper}>
                          <div className={classes.greenDot} />
                          <p>Active</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <hr />
                </>
              ))}
            </Dialog>
          )}
        </div>

        <div className={classes.cartWrapper} onClick={() => navigate("/cart")}>
          <div className={classes.line2}>Cart Items : {cart?.length}</div>
          <CartIcon className={classes.cartIcon} />
        </div>
      </div>
      <div className={classes.sub}>
        <MenuIcon className={classes.MenuIcon} onClick={() => setOpen(true)} />
        {category.map((item, i) => (
          <Tooltip
            interactive
            arrow
            title={
              <div className={classes.subWrapper}>
                {item.sub.map((each, index) => (
                  <div
                    key={index}
                    className={classes.subCategory}
                    onClick={() =>
                      handleNavigate(each, item.name.toLowerCase())
                    }
                  >
                    {each}
                  </div>
                ))}
              </div>
            }
          >
            <div>
              <div
                className={classes.category}
                onMouseOver={() => {
                  setOver(i);
                }}
              >
                {item.name}
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
      <div className={classes.sideTrayWrapper}>
        <div className={open ? classes.sideTray : classes.hide}>
          <div
            style={{
              display: "flex",
              background: "black",
              justifyContent: "space-between",
              alignItems: "center",
              position: "sticky",
              top: "0",
            }}
          >
            <div className={classes.sideTrayHeading}>Hello, User</div>
            <CloseIcon
              className={classes.closeIcon}
              onClick={() => setOpen(false)}
            />
          </div>

          {category.map((item, i) => (
            <>
              <div key={i} className={classes.sideTrayLine1}>
                {item.name}
              </div>
              {item.sub.map((each, index) => (
                <div
                  key={index}
                  className={classes.sideTrayLine2}
                  onClick={() => {
                    handleNavigate(each, item.name);
                    setOpen(false);
                  }}
                >
                  {each}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
