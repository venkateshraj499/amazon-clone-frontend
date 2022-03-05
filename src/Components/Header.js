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
      opacity: "0.7",
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
      opacity: "0.9",
    },
  },
  locationWrapper2: {
    marginLeft: "20px",
    borderRadius: "10px",
    cursor: "pointer",
    "& :hover": {
      opacity: "0.9",
    },
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
  },
  cartIcon: {
    color: "white",
    fontSize: "35px",
  },
  subWrapper: {
    marginTop: "20px",
    position: "absolute",
    borderRadius: "0px",
    border: "1px solid black",
    marginLeft: "-100px",
    zIndex: "2",
  },
  subCategory: {
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
}));

function Header({ cart, setCart }) {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [over, setOver] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [activate, setActivate] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      url: "http://amazon--backend.herokuapp.com/categories",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setCategory(res.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    console.log(suggestions);
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
  return (
    <>
      {" "}
      {console.log(cart)}
      <div className={classes.root}>
        <div className={classes.logoWrapper}>
          <img
            src="/logo.png"
            alt="no-img"
            className={classes.logo}
            onClick={() => navigate("/")}
          />
        </div>

        <div className={classes.locationWrapper}>
          <div className={classes.location}>
            <LocationOnIcon className={classes.locationIcon} />
            <div>
              <div className={classes.line1}>Deliver to username</div>
              <div className={classes.line2}>Location PIN</div>
            </div>
          </div>
        </div>

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
        <div className={classes.locationWrapper2}>
          <div className={classes.line1}>Hello, User</div>
          <div className={classes.line2}>Sign in</div>
        </div>
        <div className={classes.locationWrapper2}>
          <div className={classes.line1}>Your Orders</div>
          <div className={classes.line2}>{"& returns"}</div>
        </div>
        <div className={classes.cartWrapper} onClick={() => navigate("/cart")}>
          <div className={classes.line2}>Cart Items : {cart.length}</div>
          <CartIcon className={classes.cartIcon} />
        </div>
      </div>
      <div className={classes.sub}>
        <MenuIcon className={classes.MenuIcon} onClick={() => setOpen(true)} />
        {category.map((item, i) => (
          <div>
            <div
              className={classes.category}
              onMouseOver={() => {
                setOver(i);
              }}
            >
              {item.name}
            </div>
            <div
              className={over === i ? classes.subWrapper : classes.hide}
              onMouseOver={() => {
                setOver(i);
              }}
              onMouseOut={() => {
                setOver(null);
              }}
            >
              {item.sub.map((each, index) => (
                <div
                  key={index}
                  className={classes.subCategory}
                  onClick={() => handleNavigate(each, item.name.toLowerCase())}
                >
                  {each}
                </div>
              ))}
            </div>
          </div>
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
                  onClick={() => handleNavigate(each, item.name)}
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
