// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../slices/inventorySlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer, // Add the inventory reducer
  },
});
