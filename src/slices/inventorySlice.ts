import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
import {v6 as uuid} from 'uuid';
import { Product } from '../types/types';


// Define the initial state type
interface InventoryState {
  value: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
    const response = await api.get('/inventory');
    return response.data as Array<Product>;
})

// Initial state
const initialState: InventoryState = {
  value: [],
  status: 'idle',
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory', // Name of the slice
  initialState,
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
        state.value = action.payload.map((p: any) => {
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
        state.error = action.error.message || 'Failed to fetch inventory';
      });
  }
});

// Export actions to use in components
export const { updateInventory, deleteProduct } = inventorySlice.actions;

// Export the reducer to configure the store
export default inventorySlice.reducer;
