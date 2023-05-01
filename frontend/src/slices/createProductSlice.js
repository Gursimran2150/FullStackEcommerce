import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    success:false,
}

export const createProduct = createAsyncThunk('admin/product',async({myForm})=>{

    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

    const {data} = await axios.post(`http://localhost:4000/api/v1/products/admin/new`, 
   myForm,  config)
    return data;

})

export const deletProduct = createAsyncThunk('admin/delete', async({id})=>{
    const {data} = await axios.delete(`http://localhost:4000/api/v1/products/admin/${id}`)
    return data;
  })

const createProductSlice = createSlice({
    name:"createProduct",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(createProduct.fulfilled, (state,action)=>{
            state.loading= false;
            state.success = action.payload.success;
        } )
        .addCase(createProduct.pending,(state)=>{
          state.success= false;
          state.loading=true;
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.loading= false,
            state.success = action.payload.success;
        })
         //delete product
      .addCase(deletProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        alert("Deleted Successfully")
      })
      .addCase(deletProduct.rejected, (state) => {
        state.loading = false;
        
        alert("Failed to Delete ");
      });
    }
})

export default createProductSlice.reducer