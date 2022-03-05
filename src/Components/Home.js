import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    overflowX: "hidden",
    background: "aliceblue",
  },
  carouselWrapper: {
    height: "fit-content",
    minHeight: "450px",
    width: "100%",
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
    overflowY: "hidden",
  },
  carouselItem: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  content: {
    height: "fit-content",
  },
  line1: {
    color: "white",
    fontSize: "35px",
    fontWeight: "600",
    textAlign: "left",
    margin: "15px",
    marginTop: "50px",
  },
  line2: {
    color: "white",
    fontSize: "25px",
    fontWeight: "400",
    textAlign: "left",
    margin: "15px",
  },
  originalPrice: {
    color: "white",
    fontSize: "25px",
    fontWeight: "400",
    textAlign: "left",
    margin: "15px",
    textDecoration: "line-through",
  },
  line3: {
    color: "white",
    fontSize: "20px",
    fontWeight: "400",
    textAlign: "left",
    margin: "15px",
  },
  imageWrapper: {
    width: "280px",
    objectFit: "contain",
    marginTop: "10px",
    marginLeft: "50px",
  },
  gridContainer: {
    marginTop: "-150px",
    display: "flex",
    zIndex: "3",
  },
  gridItemWrapper: {
    margin: "0 auto",
    marginTop: "50px",
    width: "90%",
    height: "fit-content",
    paddingBottom: "0",
  },
  boxHeading: {
    fontSize: "25px",
    fontWeight: "700",
  },
  boxImageWrapper: {
    textAlign: "center",
    marginTop: "50px",
  },
  boxImage: {
    width: "50%",
    margin: "0 auto",
  },
  contentWrapper: {
    width: "90%",
    margin: "0 auto",
    background: "white",
    padding: "10px",
    minHeight: "400px",
  },
  rectangle: {
    height: "fit-content",
    background: "white",
    marginTop: "25px",
    padding: "25px",
    width: "95%",
    margin: "0 auto",
  },
  imagesWrapper: {
    display: "flex",
    overflowX: "scroll",
  },
  productImage: {
    width: "200px",
    objectFit: "contain",
    marginLeft: "3rem",
    marginRight: "3rem",
    height: "200px",
    cursor: "pointer",
  },
  productName: {
    color: "#007185",
    maxWidth: "180px",
    margin: "0 auto",
    marginTop: "15px",
    cursor: "pointer",
    "&:hover": {
      color: "darksalmon",
    },
  },
  rating: {
    marginLeft: "25%",
    marginTop: "10px",
  },
}));

function Home({ cart, setCart }) {
  const [carousel, setCarousel] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      url: "https://amazon--backend.herokuapp.com/carousel",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setCarousel(res.data.offers);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: "https://amazon--backend.herokuapp.com/boxes",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setBoxes(res.data.offers);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: "https://amazon--backend.herokuapp.com/categories",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setCategory(res.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: "https://amazon--backend.herokuapp.com/products",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const classes = useStyles();
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

  const handleNavigate = (data, type) => {
    console.log(data, type);
    if (type === "product") {
      navigate(`/product?id=${data}`);
    } else if (type === "filter") {
      navigate(`/filter?category=${array[data]}`);
    }
  };
  const array = ["electronics", "furnitures", "outdoors", "education"];
  return (
    <div className={classes.root}>
      <Header cart={cart} setCart={setCart} />
      <Carousel
        infiniteLoop
        swipeable
        showIndicators={false}
        className={classes.carouselWrapper}
        showStatus={false}
      >
        {carousel.map((item, i) => (
          <div className={classes.carouselItem}>
            <div className={classes.content}>
              <div className={classes.line1}>{item.name}</div>
              <div className={classes.line2}>{item.content}</div>
              <div style={{ textAlign: "left" }}>
                <span className={classes.originalPrice}>
                  {" "}
                  Rs: {item.originalPrice}
                </span>
                <span className={classes.line2}>Rs: {item.offerPrice}</span>
              </div>
              <div className={classes.line3}>Only from {item.duration}</div>
            </div>
            <div className={classes.imageWrapper}>
              <img src={item.image} className={classes.image} alt="no-img" />
            </div>
          </div>
        ))}
      </Carousel>
      <Grid className={classes.gridContainer} container>
        {boxes.map((item, i) => (
          <Grid
            key={i}
            className={classes.gridItemWrapper}
            item
            md={3}
            onClick={() => handleNavigate(i, "filter")}
          >
            <div className={classes.contentWrapper}>
              <div className={classes.boxHeading}>{item.title}</div>
              <div className={classes.boxImageWrapper}>
                <img
                  src={item.image}
                  alt="no-img"
                  className={classes.boxImage}
                />
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      {category.map((item, i) => (
        <div key={i} className={classes.rectangle}>
          <h3>{item.name}</h3>
          <MultiCarousel
            responsive={responsive}
            className={classes.imagesWrapper2}
            infinite={true}
          >
            {products.map((product, index) => {
              if (product.category === item.name.toLowerCase()) {
                console.log(product._id);
                return (
                  <div onClick={() => handleNavigate(product._id, "product")}>
                    <img
                      src={product.images[0]}
                      className={classes.productImage}
                      alt="No-data"
                    />
                    <h4 className={classes.productName}>
                      {product.name} <br /> {product.variant}
                    </h4>
                    <Rating
                      readOnly
                      value={product.rating}
                      precision={0.5}
                      className={classes.rating}
                    />
                  </div>
                );
              } else {
                return (
                  <>
                    <img
                      src="/dummy.png"
                      className={classes.productImage}
                      alt="No-data"
                    />
                    <h4 className={classes.productName}>
                      Item yet to be added <br /> in database
                    </h4>
                    <Rating
                      readOnly
                      value={3.5}
                      precision={0.5}
                      className={classes.rating}
                    />
                  </>
                );
              }
            })}
          </MultiCarousel>
        </div>
      ))}
    </div>
  );
}

export default Home;
