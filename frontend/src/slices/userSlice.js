import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: {},
};

//login user
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ loginEmail = "", loginPassword = "" }) => {
  
    let res = null;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "https://ecommerce-a9ux.onrender.com/api/v1/login",
        { email:loginEmail, password:loginPassword },
        config
      );
      res = data;
    } catch (e) {
      
      res=null
    }

    return res;
  }
);

//register user
export const registerUser = createAsyncThunk('user/register',async(fromData)=>{
    let res = null;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
        const { data } = await axios.post(
          "https://ecommerce-a9ux.onrender.com/api/v1/register",
          fromData,
          config
        );
        res = data;
      } catch (e) {
        
        res=null
      }
  
      return res;
    }


    
) 

//get user and store in state
export const getMyUserDetails = createAsyncThunk('user/me', async()=>{
  let res = null
  try{
    const {data} = await axios.get('https://ecommerce-a9ux.onrender.com/api/v1/me');
  console.log(data)
  return data;
  }catch(e){

    res=null
  }
  return res;
})

//logout user
export const logoutUser = createAsyncThunk('user/logout', async()=>{
  const {data} = await axios.get('https://ecommerce-a9ux.onrender.com/api/v1/logout');
  return data;
}) 

//update user 
// export const updateUserProfile = createAsyncThunk('user/update',async({name,email})=>{
  
//  try{
//   const config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   };

//     const {data} = await axios.put('http://localhost:4000/api/v1/me/update',{name,email},config);
//     return data;

//  }catch(e){
//   console.log(e)
//   return e;
//  }
// })


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        
        state.isAuthenticated = state.user!=null?true:false;
        state.error = null;
      })


      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        
        state.isAuthenticated = state.user!=null?true:false;
        state.error = null;
      })

      //get user details

      .addCase(getMyUserDetails.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(getMyUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(getMyUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        
        state.isAuthenticated = state.user!=null?true:false;
        state.error = null;
      })

      //logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        
        state.isAuthenticated = false;
        state.error = null;
      })

      //update the profile 
     

  },
});

export default userSlice.reducer;
