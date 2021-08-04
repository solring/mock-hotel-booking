import fetchSlicer from './baseFetchSlicer';
import { SubmitOrder } from '../api/mockApi';

const cartSlicer= fetchSlicer('cart');

export const submitOrder = cartSlicer.createFetchApi(SubmitOrder);

function delElement( arr, toDel ) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if(toDel.includes(i)) continue;
    newArr.push(arr[i]);
  }
  return newArr;
}

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
      const payload = action.payload;
      if(Array.isArray(payload)) {

        state.orders = delElement(state.orders, payload);

      } else if(Number.isInteger(payload)) {

        if (payload < 0 || payload > state.orders.length-1 ) return; // not allow negative splice
        state.orders.splice(payload, 1);

      } else if(payload === undefined) {
        state.orders.splice(-1, 1); // delete the last one
      }

    },
    add: (state, action) => {
      if (Array.isArray(action.payload)) {

        state.orders = state.orders.concat(action.payload);

      } else if (typeof(action.payload) === "object") {

        state.orders.push(action.payload);

      }
    },
  },
  (state, payload) => {
    state.orders = [];
    state.completed.push(payload.order)
  }
);

export const { clear, del, add } = cartSlice.actions;

export default cartSlice.reducer;