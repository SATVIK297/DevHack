import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  employeeData: {},
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.employeeData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.employeeData = {};
    },
  },
});

export const { login, logout } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
