import { fetchProducts } from "../../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/Product";
import { useEffect, useState } from "react";
import "./products.css";
import { useParams } from "react-router-dom";
import {Typography,Slider} from '@mui/material'
import Pagination from 'react-js-pagination'

const categories =[
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones"
]



const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0,25000]);
  const [category, setCategory] = useState("");
  // const [rating,setRating] = useState(0);

  const { products, loading } = useSelector((state) => state.product);
  const { resultPerPage, productCount } = products;

  const { keyword } = useParams();

  useEffect(() => {
    //console.log(currentPage)
    dispatch(fetchProducts({ keyword, page: currentPage,price,category }));

  }, [dispatch, keyword, currentPage,price,category]);

  const handlePageChange = (pageNumber) => {
    if (typeof pageNumber === "number") {
      setCurrentPage(pageNumber);
    }
  };

  const priceHandler =(event,newPrice)=>{
    setPrice(newPrice)
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h2 className="productsHeading">Products</h2>
      <div className="products">
        {products.products &&
          products.products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>

      <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
            
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-label="range-slider"
            min={0}
            max={25000}
            
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {
                categories.map((category)=>(
                  <li
                    className="category-link"
                    key={category}
                    onClick={()=> setCategory(category)}
                  >
                    {category}
                  </li>
                ))
              }

            </ul>

            {/* <fieldset>
              <Typography component={"legend"}>Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e,newRating)=>{setRating(newRating)}}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
           
              />
            </fieldset> */}

      </div>

      <div className="paginationBox">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productCount}
          onChange={handlePageChange}
          nextPageText={"Next"}
          prevPageText={"Previous"}
          firstPageText={"1"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
    </>
  );
};

export default Products;

