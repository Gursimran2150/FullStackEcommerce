import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  product: {},
};

export const fetchProductDetail = createAsyncThunk(
  "products/details",
  async (productId) => {
    const { data } = await axios.get(
      `https://ecommerce-a9ux.onrender.com/api/v1/products/${productId}`
    );
    // console.log(data.product);
    return data;
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      });
  },
});

export default productDetailsSlice.reducer;
