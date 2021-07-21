import { GetHotelInfo } from '../../api/mockApi';
import fetchSlicer from '../baseFetchSlicer';

const detailSlicer = fetchSlicer('hotels');

export const fetchHotelDetail = detailSlicer.createFetchApi(GetHotelInfo);

export const detailSlice = detailSlicer.createFetchSlice(
  {
    detail: null,
    images: []
  },
  {},
  (state, payload) => {
    state.detail = payload.info;
    state.images= payload.imgs;
  },
)

export const { reset } = detailSlice.actions;
export default detailSlice.reducer;