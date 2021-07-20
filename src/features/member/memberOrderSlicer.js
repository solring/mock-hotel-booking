import { GetMemberOrders } from '../../api/mockApi';
import fetchSlicer from '../baseFetchSlicer';

const memberOrderSlicer = fetchSlicer('memberOrder');

export const fetchMemberOrder = memberOrderSlicer.createFetchApi(GetMemberOrders);

export const memberOrderSlice = memberOrderSlicer.createFetchSlice(
  {
    orders: []
  },
  {
    reset: state => {
      state.orders = [];
    },
  },
  (state, payload) => {
    state.orders = payload.data;
  },
)

export const { reset } = memberOrderSlice.actions;
export default memberOrderSlice.reducer;