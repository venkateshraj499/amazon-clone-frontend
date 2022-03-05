import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Rating from "@material-ui/lab/Rating";
import AddTaskIcon from "@material-ui/icons/Repeat";
import DriveIcon from "@material-ui/icons/DriveEta";
import VerifyIcon from "@material-ui/icons/VerifiedUser";
import SafeIcon from "@material-ui/icons/Healing";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    overflowX: "hidden",
    background: "white",
  },
  mainContent: {
    display: "flex",
    marginTop: "30px",
  },
  imageSection: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "50%",
    maxHeight: "500px",
  },

  otherImages: {
    width: "10%",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  otherImage: {
    width: "50px",
    objectFit: "contain",
    border: "1px solid gray",
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      border: "1px solid darksalmon",
    },
  },
  mainImage: {
    width: "80%",
    objectFit: "contain",
    maxWidth: "500px",
  },
  descriptionWrapper: {
    width: "50%",
    paddingRight: "25px",

    overflow: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  productName: {
    fontWeight: "500",
  },
  productDesc: {
    maxWidth: "500px",
    lineHeight: "25px",
  },
  tableRight: {
    color: "#B12704",
    fontSize: "26px",
    fontWeight: "400",
  },
  tableRight2: {
    color: "#B12704",
    fontSize: "20px",
    fontWeight: "350",
  },
  tableRightStrike: {
    color: "gray",
    fontSize: "20px",
    fontWeight: "400",
    textDecoration: "line-through",
  },
  tableLeft: {
    color: "#565959",
    fontSize: "16px",
    marginTop: "10px",
  },
  line: {
    width: "100%",
    background: "lightgray",
    height: "1px",
    marginTop: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
  },
  featuresWrapper: {
    display: "flex",
  },
  feature: {
    marginRight: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  featureIcon: {
    color: "#007185 !important",
    fontSize: "34px",
    margin: "25px",
  },
  featureText: {
    color: "#007185",
    fontSize: "12px",
    maxWidth: "100px",
    textAlign: "center",
  },
  button: {
    width: "250px",
    background: "orange",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "500",
    padding: "10px",
    borderRadius: "50px",
    marginTop: "20px",
    cursor: "pointer",
    "&:hover": {
      border: "1px solid orange",
      background: "white",
    },
  },
  buttonWrapper: {
    display: "flex",
    width: "80%",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  informationWrapper: {
    marginTop: "20px",
  },
  infoHead: {
    fontSize: "18px",
    fontWeight: "600",
    paddingTop: "10px",
  },
  infoAns: {
    paddingLeft: "15px",
    paddingTop: "10px",
  },
  aboutItem: {
    marginTop: "10px",
    marginLeft: "-15px",
  },
  hide: {
    display: "none",
  },
  show: {
    fontSize: "18px",
    fontWeight: "500",
    color: "blue",
    display: "flex",
    alignItems: "center",
    width: "130px",
    justifyContent: "space-evenly",
    cursor: "pointer",
    marginTop: "20px",
  },
  expandIcon: {
    fontSize: "25px",
    marginTop: "3px",
  },
  productImage2: {
    width: "200px",
    objectFit: "contain",
    marginLeft: "3rem",
    marginRight: "3rem",
    height: "200px",
    cursor: "pointer",
  },
  productName2: {
    color: "#007185",
    maxWidth: "180px",
    margin: "0 auto",
    marginTop: "15px",
    cursor: "pointer",
    "&:hover": {
      color: "darksalmon",
    },
  },
  rating2: {
    marginLeft: "25%",
    marginTop: "10px",
  },
  imagesWrapper2: {
    marginTop: "30px",
  },
  similarHeading: {
    marginLeft: "20px",
    marginTop: "10px",
  },
}));

function Home(cart, setCart) {
  const [product, setProduct] = useState(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [similar, setSimilar] = useState([]);
  const navigate = useNavigate();
  const urlParams = useLocation().search;
  const qs = queryString.parse(urlParams);
  const productId = qs.id;
  const items = cart.cart;

  useEffect(() => {
    axios({
      url: `https://amazon--backend.herokuapp.com/product/${productId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);
  useEffect(() => {
    if (product !== null) {
      axios({
        url: `https://amazon--backend.herokuapp.com/products/${product.category}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          setSimilar(res.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [product]);

  const getPrice = (price, type) => {
    const originalPrice = parseInt(price);
    const final = originalPrice * 1.1;
    if (type === "mrp") {
      return final;
    } else {
      return final - originalPrice;
    }
  };
  const handleNavigate = (data, type) => {
    console.log(data, type);
    if (type === "product") {
      console.log("yes");
      navigate(`/product?id=${data}`);
    }
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const addToCart = (cartItem) => {
    const index = items.indexOf(cartItem);
    console.log(index);
    if (items.includes(cartItem)) {
      const filteredCart = items.filter((item) => item !== cartItem);
      cart.setCart(filteredCart);
    } else {
      cart.setCart((prev) => [...prev, cartItem]);
    }
    console.log(cart.cart);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header cart={cart.cart} setCart={cart.setCart} />
      {product && (
        <div className={classes.mainContent}>
          <div className={classes.imageSection}>
            <div className={classes.otherImages}>
              {product?.images?.map(
                (item, i) =>
                  i > 0 && (
                    <img
                      src={item}
                      className={classes.otherImage}
                      alt="No-Img"
                      onClick={() => {
                        setActive(i);
                      }}
                    />
                  )
              )}
            </div>
            <div className={classes.mainImage}>
              <img
                src={product?.images[active]}
                className={classes.mainImage}
                alt="No-Img"
              />
            </div>
          </div>
          <div className={classes.descriptionWrapper}>
            <h1 className={classes.productName}>
              {product?.name} ( {product?.variant} )
            </h1>
            <p className={classes.productDesc}>{product?.description}</p>

            <Rating
              readOnly
              value={product.rating}
              precision={0.5}
              className={classes.rating}
            />
            <div className={classes.line} />
            <table>
              <tr>
                <td className={classes.tableLeft} align="right">
                  MRP :
                </td>
                <td className={classes.tableRightStrike}>
                  {" "}
                  ₹{getPrice(product.originalPrice, "mrp")}
                </td>
              </tr>
              <tr>
                <td className={classes.tableLeft} align="right">
                  Deal For You :
                </td>
                <td className={classes.tableRight}>
                  {" "}
                  ₹{product.originalPrice}
                </td>
              </tr>
              <tr>
                <td className={classes.tableLeft} align="right">
                  You saved :
                </td>
                <td className={classes.tableRight2}>
                  {" "}
                  ₹{getPrice(product.originalPrice, "save")} (12% discount)
                </td>
              </tr>
            </table>
            <div className={classes.featuresWrapper}>
              <div className={classes.feature}>
                <AddTaskIcon className={classes.featureIcon} />
                <div className={classes.featureText}>7 Days Replacement</div>
              </div>
              <div className={classes.feature}>
                <DriveIcon className={classes.featureIcon} />
                <div className={classes.featureText}>7 Days Replacement</div>
              </div>
              <div className={classes.feature}>
                <VerifyIcon className={classes.featureIcon} />
                <div className={classes.featureText}>7 Days Replacement</div>
              </div>
              <div className={classes.feature}>
                <SafeIcon className={classes.featureIcon} />
                <div className={classes.featureText}>7 Days Replacement</div>
              </div>
            </div>
            <div className={classes.buttonWrapper}>
              <div
                className={classes.button}
                onClick={() => addToCart(product)}
              >
                {items.includes(product) ? "Remove from Cart" : "Add to Cart"}
              </div>
              <div className={classes.button}>Buy Now</div>
            </div>

            <div className={open ? classes.informationWrapper : classes.hide}>
              <table>
                <tr>
                  <td className={classes.infoHead}>Product Name :</td>
                  <td className={classes.infoAns}>{product.name}</td>
                </tr>
                <tr>
                  <td className={classes.infoHead}>Variant :</td>
                  <td className={classes.infoAns}>{product.variant}</td>
                </tr>
                <tr>
                  <td className={classes.infoHead}>Category :</td>
                  <td className={classes.infoAns}>{product.category}</td>
                </tr>
              </table>
            </div>
            <div className={open ? classes.line : classes.hide} />
            <div className={open ? classes.aboutWrapper : classes.hide}>
              <h3>About this item</h3>
              <ul>
                {product.about.map((item, i) => (
                  <li className={classes.aboutItem}>{item}</li>
                ))}
              </ul>
            </div>
            {!open ? (
              <div className={classes.show} onClick={() => setOpen(true)}>
                Show More <ExpandMoreIcon className={classes.expandIcon} />
              </div>
            ) : (
              <div className={classes.show} onClick={() => setOpen(false)}>
                Show Less <ExpandLessIcon className={classes.expandIcon} />
              </div>
            )}
          </div>
        </div>
      )}
      {similar && (
        <>
          <h2 className={classes.similarHeading}>Similar Products for you</h2>
          <MultiCarousel
            responsive={responsive}
            className={classes.imagesWrapper2}
            infinite={true}
          >
            {similar.map((item, i) => (
              <div onClick={() => handleNavigate(item._id, "product")}>
                <img
                  src={item.images[0]}
                  className={classes.productImage2}
                  alt="No-data"
                />
                <h4 className={classes.productName2}>
                  {item.name} <br /> {item.variant}
                </h4>
                <Rating
                  readOnly
                  value={item.rating}
                  precision={0.5}
                  className={classes.rating2}
                />
              </div>
            ))}
          </MultiCarousel>
        </>
      )}
    </div>
  );
}

export default Home;
