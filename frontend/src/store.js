import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import productDeatailsSlice from "./slices/productDeatailsSlice";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
import createProductSlice from "./slices/createProductSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    product: productSlice,
    productDetails: productDeatailsSlice,
    user:userSlice,
    cart:cartSlice,
    newProduct:createProductSlice
  },
});

export default store;
