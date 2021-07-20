import { Search } from '../api/mockApi';
import fetchSlicer from './baseFetchSlicer';

const hotelSlicer = fetchSlicer('hotels');

export const fetchHotels = hotelSlicer.createFetchApi(Search);

export const hotelSlice = hotelSlicer.createFetchSlice(
  { hotels: [] },
  {
    reset: state => {
      state.hotels = [];
    },
  },
  (state, payload) => {state.hotels = payload.data},
)

export const { reset } = hotelSlice.actions;
export default hotelSlice.reducer;