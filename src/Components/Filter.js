import React, { useState, useEffect } from "react";
import { makeStyles, Button } from "@material-ui/core";
import axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Rating from "@material-ui/lab/Rating";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  filterWrapper: {
    width: "30%",
    padding: "30px 0 0 30px",
    overflow: "hidden",
  },
  subWrapper: {
    marginBottom: "25px",
  },
  each: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "400",
    marginLeft: "10px",
    cursor: "pointer",
    "&:hover": {
      color: "darksalmon",
    },
  },
  filterHeading: {
    fontSize: "18px",
    fontWeight: "500",
    paddingBottom: "10px",
  },
  ratingWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "80%",
    marginBottom: "20px",
    marginLeft: "0px",
    cursor: "pointer",
    "&:hover": {
      color: "darksalmon",
    },
  },
  price: {
    marginBottom: "10px",
    cursor: "pointer",
    "&:hover": {
      color: "darksalmon",
    },
  },
  inputWrapper: {
    display: "flex",
    width: "40%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  clearBtn: {
    marginTop: "15px",
    fontSize: "12px",
  },
  input: {
    width: "50px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid gray",
    margin: "5px",
  },
  goButton: {
    borderRadius: "6px",
    border: "1px solid gray",
    padding: "0 5px 5px 5px",
    boxShadow: "0 2px 5px 0 rgb(213 217 217 / 50%)",
    cursor: "pointer",
    "&:hover": {
      background: "lightgray",
    },
  },
  resultsWrapper: {
    height: "90vh",
    overflowY: "auto",
    "&::-webkit-scrollbar ": {
      display: "none",
    },
  },
  productWrapper: {
    display: "flex",
    alignItems: "center",
    cursor: "default",
  },
  image: {
    width: "100px",
    objectFit: "contain",
    marginRight: "50px",
  },
  product: {
    width: "65%",
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
  line: {
    width: "100%",
    background: "lightgray",
    height: "1px",
    marginTop: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
  },
  noImage: {
    margin: "50px 0 0 50%",
    transform: "translateX(-50%)",
  },
}));

function Filter(cart, setCart, user, setUser) {
  const classes = useStyles();
  const [allCategory, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const urlParams = useLocation().search;
  const qs = queryString.parse(urlParams);
  const navigate = useNavigate();
  const { category, sub } = qs;
  const [filter, setFilter] = useState({ category: category });
  let minCost, maxCost;
  let items = cart?.cart;

  useEffect(() => {
    // Getting all categories available to show filter options
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

    // To fetch results for filter
    sub
      ? axios({
          url: `http://localhost:2022/products/${category}/${sub}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => {
            setProducts(res.data.products);
          })
          .catch((error) => {
            //(error);
          })
      : axios({
          url: `http://localhost:2022/products/${category}`,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => {
            setProducts(res.data.products);
          })
          .catch((error) => {
            //(error);
          });
  }, [category, sub]);

  useEffect(() => {
    if (
      Object.keys(filter).length === 1 &&
      Object.keys(filter)[0] === "category"
    ) {
    } else {
      axios({
        url: "http://localhost:2022/filter",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: filter,
      })
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((error) => {
          //(error);
        });
    }
  }, [filter]);

  const rating = [4, 3, 2, 1];

  const handleNavigate = (id) => {
    navigate(`/product?id=${id}`);
  };

  const updateFilter = (key, value, ...rest) => {
    console.log(key, value, rest);
    if (value === "Dictionary ") {
      value = value.trim();
    }
    if (key === "lcost") {
      setFilter((prev) => ({ ...prev, [key]: value, [rest[0]]: rest[1] }));
    } else if (value === "TV" || key === "rating") {
      setFilter((prev) => ({ ...prev, [key]: value }));
    } else {
      setFilter((prev) => ({ ...prev, [key]: value.toLowerCase() }));
    }
  };

  const updateInput = (event, type) => {
    if (type === "lcost") {
      minCost = parseInt(event.target.value);
    } else {
      maxCost = parseInt(event.target.value);
    }
    //(minCost, maxCost);
  };

  const addToCart = (cartItem) => {
    const index = items.indexOf(cartItem);
    //(index);
    if (items.includes(cartItem)) {
      const filteredCart = items.filter((item) => item !== cartItem);
      cart?.setCart(filteredCart);
    } else {
      cart?.setCart((prev) => [...prev, cartItem]);
    }
    //(cart?.cart);
  };
  return (
    <>
      <Header
        cart={cart?.cart}
        setCart={cart?.setCart}
        user={cart?.user}
        setUser={cart?.setUser}
      />
      <div className={classes.root} data-testid="filter">
        <div className={classes.filterWrapper}>
          <div className={classes.subWrapper}>
            {allCategory.map((item, i) => {
              if (item.name.toLowerCase() === category) {
                return (
                  <div>
                    <div className={classes.filterHeading}>Sub categories</div>
                    {item.sub.map((each, index) => (
                      <div
                        className={classes.each}
                        onClick={() => updateFilter("sub", each)}
                      >
                        {each}
                      </div>
                    ))}
                  </div>
                );
              }
            })}
          </div>
          <div className={classes.rating}>
            <div className={classes.filterHeading}>Customer Rating</div>
            {rating.map((item, i) => (
              <div
                className={classes.ratingWrapper}
                onClick={() => updateFilter("rating", item)}
              >
                <Rating readOnly value={item} precision={0.5} />

                <span>and Up</span>
                <br />
              </div>
            ))}
          </div>
          <div className={classes.priceWrapper}>
            <div className={classes.filterHeading}>Price</div>
            <div
              className={classes.price}
              onClick={() => updateFilter("lcost", 0, "hcost", 1000)}
            >
              Under ₹1,000
            </div>
            <div
              className={classes.price}
              onClick={() => updateFilter("lcost", 1000, "hcost", 5000)}
            >
              ₹1,000 - ₹5,000
            </div>
            <div
              className={classes.price}
              onClick={() => updateFilter("lcost", 5000, "hcost", 10000)}
            >
              ₹5,000 - ₹10,000
            </div>
            <div className={classes.inputWrapper}>
              <input
                className={classes.input}
                placeholder="₹ Min"
                value={minCost}
                onChange={(e) => updateInput(e, "lcost")}
              />
              <input
                className={classes.input}
                placeholder="₹ Max"
                onChange={(e) => updateInput(e, "hcost")}
                value={maxCost}
              />
              <div
                className={classes.goButton}
                onClick={() => updateFilter("lcost", minCost, "hcost", maxCost)}
              >
                Go
              </div>
            </div>
            <div className={classes.inputWrapper} onClick={() => setFilter({})}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.clearBtn}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>
        <div className={classes.resultsWrapper}>
          {products.length === 0 && (
            <img src="/nodata.png" className={classes.noImage} alt="no-img" />
          )}
          {products.map((item, i) => (
            <>
              <div className={classes.productWrapper}>
                <img
                  src={item.images[0]}
                  alt="no-img"
                  className={classes.image}
                  onClick={() => handleNavigate(item._id)}
                />
                <div
                  className={classes.product}
                  onClick={() => handleNavigate(item._id)}
                >
                  <h2>{item.name}</h2>
                  <h4>{item.variant}</h4>
                  <p>{item.description}</p>
                  <Rating readOnly value={item.rating} precision={0.5} />
                  <h4>₹: {item.originalPrice} /-</h4>
                </div>
                <div className={classes.buttons}>
                  <div
                    className={classes.button}
                    onClick={() => addToCart(item)}
                  >
                    {" "}
                    {items.includes(item) ? "Remove" : "Add to Cart"}
                  </div>
                </div>
              </div>
              <div className={classes.line} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Filter;
