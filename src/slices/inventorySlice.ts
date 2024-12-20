import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
import {v6 as uuid} from 'uuid';
import { Product } from '../types/types';



export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
    const response = await api.get('/inventory');
    return response.data as Array<Product>;
})

const inventorySlice = createSlice({
  name: 'inventory', // Name of the slice
  initialState: {
    value: [] as Product[], // Initial state
    status: 'idle',
    error: null
  },
  reducers: {
    updateInventory: (state, action) => {

      state.value = state.value.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
    deleteProduct: (state, action) => {
      state.value = state.value.filter((item) =>item.id !== action.payload.id)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.value = action.payload.map(p => {
          return {
            ...p,
            price : parseInt(p.price[0] === '$' ? p.price.substring(1) : p.price),
            value: parseInt( p.value[0] === '$' ? p.value.substring(1) : p.value),
            id: uuid()
          }
        });
        state.status = 'succeeded';
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Export actions to use in components
export const { updateInventory, deleteProduct } = inventorySlice.actions;

// Export the reducer to configure the store
export default inventorySlice.reducer;
