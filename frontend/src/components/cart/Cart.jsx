
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import {  useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import CartItemCard from './CartItemCard'

import './cart.css'
import {Typography} from '@mui/material'
import { clearCart } from '../../slices/cartSlice';




const Cart = () => {

   const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=>state.cart)

    
    const handleCheckOut = ()=>{
        alert("Thanks for shopping with us(:");
        dispatch(clearCart())    
    }
   


  return (
    <>
    {cartItems.length === 0 ? (
      <div className="emptyCart">
        <RemoveShoppingCartIcon />

        <Typography>No Product in Your Cart</Typography>
        <Link to="/products">View Products</Link>
      </div>
    ) : (
      <>
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
           
            <p>Subtotal</p>
          </div>

          {cartItems &&
            cartItems.map((item) => (
              <div className="cartContainer" key={item.product}>
                <CartItemCard item={item}  key={item._id}/>
               
                <p className="cartSubtotal">{`₹${
                  item.price * item.quantity
                }`}</p>
              </div>
            ))}

          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={handleCheckOut}>Check Out</button>
            </div>
          </div>
        </div>
      </>
    )}
  </>
  )
}

export default Cart