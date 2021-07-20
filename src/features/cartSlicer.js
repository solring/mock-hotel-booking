import { createSlice } from '@reduxjs/toolkit';

import fetchSlicer from './baseFetchSlicer';
import { SubmitOrder } from '../api/mockApi';

const cartSlicer= fetchSlicer('cart');

export const submitOrder = cartSlicer.createFetchApi(SubmitOrder);

// Can use mutating code inside createSlice
export const cartSlice = cartSlicer.createFetchSlice(
  {
    orders: [],
    completed: [],
  },
  {
    clear: state => {
      state.orders = [];
      state.completed = [];
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
  },
  (state, payload) => {
    state.orders = [];
    state.completed.push(payload.order)
  }
);

export const { clear, del, add, addBatch } = cartSlice.actions;

export default cartSlice.reducer;