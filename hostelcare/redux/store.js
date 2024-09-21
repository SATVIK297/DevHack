// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import studentReducer from './slices/studentSlice';
import employeeReducer from './slices/employeeSlice';

// Persist configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['student', 'employee'], // Specify which slices should be persisted
};

// Combine the reducers
const rootReducer = combineReducers({
  student: studentReducer,
  employee: employeeReducer,
});

// Apply persistReducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Configure the persistor
export const persistor = persistStore(store);
