// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isLoggedIn: false,
//   employeeData: null,
// };

// const employeeSlice = createSlice({
//   name: 'employee',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.isLoggedIn = true;
//       state.employeeData = action.payload;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.employeeData = {};
//     },
//   },
// });

// export const { login, logout } = employeeSlice.actions;
// export const employeeReducer = employeeSlice.reducer;

// employeeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    isLoggedIn: false,
    employeeData: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.employeeData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.employeeData = null;
    },
  },
});

export const { login, logout } = employeeSlice.actions;
export default employeeSlice.reducer; // Ensure this is the default export
