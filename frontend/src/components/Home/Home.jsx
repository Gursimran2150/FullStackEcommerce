import { CgMouse } from "react-icons/all";
import "./home.css";
import MetaData from "../layout/MetaData";

import Product from "./Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../slices/productSlice";
import Loader from "../layout/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({keyword:"",page:1}));
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <MetaData title={"Ecommerce"} />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Products Below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products.products &&
          products.products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Home;
