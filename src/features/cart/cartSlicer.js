import { createSlice } from '@reduxjs/toolkit';

// Can use mutating code inside createSlice
export const cartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    orders: []
  },
  reducers: {
    clear: state => {
      state.orders = [];
    },
    del: (state, action) => {
      let idx = action.payload || state.orders.length-1;
      state.orders.splice(idx, 1);
    },
    add: (state, action) => {
      state.orders.push(action.payload);
    },
    addBatch: (state, action) => {
      state.orders = state.orders.concat(action.payload);
    }
  }
});

export const { clear, del, add, addBatch } = cartSlice.actions;

export default cartSlice.reducer;