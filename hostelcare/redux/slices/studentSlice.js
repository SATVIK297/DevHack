// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isLoggedIn: false,
//   studentData: {},
// };

// const studentSlice = createSlice({
//   name: 'student',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.isLoggedIn = true;
//       state.studentData = action.payload;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.studentData = {};
//     },
//   },
// });

// export const { login, logout } = studentSlice.actions;
// export const studentReducer = studentSlice.reducer;
// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    isLoggedIn: false,
    studentData: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.studentData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.studentData = null;
    },
  },
});

export const { login, logout } = studentSlice.actions;
export default studentSlice.reducer; // Ensure this is the default export
