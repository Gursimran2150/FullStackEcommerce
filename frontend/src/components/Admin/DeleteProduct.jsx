import { useState } from 'react';
import './delteproduct.css'
import { useDispatch } from 'react-redux';
import { deletProduct } from '../../slices/createProductSlice';
import { useNavigate } from 'react-router-dom';

const DeleteProduct = () => {
    const dispatch = useDispatch();
    const[id,setId] = useState("");
    const navigate = useNavigate();

    const changeHandler = (e)=>{
        setId(e.target.value)
    }

    const deleteProductHandle = ()=>{
       dispatch(deletProduct({id}))
       navigate('/')
    }

  return (
    <div style={{marginTop:'100px',textAlign:'center'}}> 
        <div className="delete-product">
        <h2>Delete Product</h2>
        <input type="text" value={id} onChange={changeHandler} className="delete-product__input" placeholder='Enter Product Id'/>
        <button onClick={deleteProductHandle} className="delete-product__button">Delete Product</button>
    </div>
    </div>
  )
}

export default DeleteProduct;
