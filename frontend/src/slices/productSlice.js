import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ keyword = "", page = 1, price = [0, 25000],category = "" }) => {
    // console.log(keyword);
    let res = null;
    try {
      // console.log("i am running");

      const url = category===""?`https://ecommerce-a9ux.onrender.com/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`
      :`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`

      console.log()

      const { data } = await axios.get(
        url
      );
     
      console.log(data);
      res = data;
    } catch (e) {
      console.log(e);
      res = e;
    }
    return res;
  }
);



const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch profucts";
      })

     

  },
});

export default productSlice.reducer;
