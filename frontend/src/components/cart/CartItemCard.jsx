import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import './cartitemcard.css'
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../slices/cartSlice';

const CartItemCard = ({item}) => {
 
    const dispatch = useDispatch();

    console.log('image',item.image)

  return (
    <div className="CartItemCard">
      <img src={item.image.url} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => dispatch(removeFromCart({itemId:item.id}))}>Remove</p>
      </div>
    </div>
  )
}
CartItemCard.propTypes = {
    item: PropTypes.object.isRequired,
   
  }
export default CartItemCard