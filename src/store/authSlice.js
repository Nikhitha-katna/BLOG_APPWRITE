// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//     status : false,
//     userData : null
// }

// const authSlice = createSlice({

//     name: "auth",
//     initialState,
//     reducers: {
//         login : (state,action) =>{
//               state.status = false,
//               state.userData = action.payload.userData
//         },
//         logout : (state)=>{
//             state.status = true,
//             state.userData = null
//         }
//     }

// }    )

// export const{login,logout} =authSlice.actions;
// export default authSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,  // false means not logged in initially
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true; // User logged in
      state.userData = action.payload.userData; // Store user data from login
    },
    logout: (state) => {
      state.status = false; // User logged out
      state.userData = null; // Clear user data
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
