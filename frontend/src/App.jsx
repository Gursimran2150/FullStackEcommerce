import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import LoginSignUp from "./components/User/LoginSignUp";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import Cart from "./components/cart/cart";
import CreateProduct from "./components/Admin/CreateProduct";
import DeleteProduct from "./components/Admin/DeleteProduct";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getMyUserDetails } from "./slices/userSlice";

function App() {

  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   console.log("hiiiii")
  //   dispatch(getMyUserDetails())
  // },[dispatch])

  return (
    <>
      {/* navigation header    */}
      {/* <Header/> */}
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productss/:keyword" element={<Products />} />
          <Route path="/login" element={<LoginSignUp/>}/>
          <Route path="/account" element={<Profile/>}/>
          <Route path="productss/:pro/products/:id" element={<ProductDetails/>}/>
          <Route path="/me/update" element={<UpdateProfile/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/add/product" element={<CreateProduct/>}/>
          <Route path="/delete/product" element={<DeleteProduct/>}/>
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
