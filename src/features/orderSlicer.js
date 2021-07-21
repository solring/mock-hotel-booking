import { GetOrder } from '../api/mockApi';
import fetchSlicer from './baseFetchSlicer';

const orderSlicer = fetchSlicer('order');

export const fetchOrders = orderSlicer.createFetchApi(GetOrder);

export const orderSlice = orderSlicer.createFetchSlice(
  {
    user: {},
    orders: []
  },
  {},
  (state, payload) => {
    state.orders = payload.orders;
    state.user = payload.user;
  },
)

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;