// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './state/authSlice';
import userReducer from './state/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
});

export default store;
