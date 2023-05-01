import { useRef, useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import "./header.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../slices/userSlice";

function Header() {
  const navRef = useRef();
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const {user,isAuthenticated} = useSelector((state)=>state.user);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  //   console.log(pathname);

   

  const logout = ()=>{
    console.log('hiii')
    dispatch(logoutUser())
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      const searchPath = `/productss/${searchText}`;

      const newPath = pathname.includes("/products")
        ? searchPath
        : pathname + searchPath;
      navigate(newPath);
    } else {
      navigate("/products");
    }
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <nav ref={navRef}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Product</NavLink>
        <NavLink to="/#">Contact</NavLink>
        <NavLink to="/#">About</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/login">Profile</NavLink>
        {isAuthenticated?<><NavLink to={'/'} onClick={logout}>Logout</NavLink>
          
          
          {user.user.role && user.user.role==="admin"?<>
          {/* <NavLink to={'/dashboard'} >Dashboard</NavLink> */}
          <NavLink to={'/add/product'} >Add Product</NavLink>
          {/* <NavLink to={'/update/product'} >Update Product</NavLink> */}
          <NavLink to={'/delete/product'} >Delete Product</NavLink>
          </>:''}

          </>
        :<></>}


        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      {pathname.includes("/products") ? (
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      ) : (
        <div></div>
      )}

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Header;
