import { GetMemberInfo } from '../../api/mockApi';
import fetchSlicer from '../baseFetchSlicer';

const memberSlicer = fetchSlicer('member');

export const fetchMemberInfo = memberSlicer.createFetchApi(GetMemberInfo);

export const memberSlice = memberSlicer.createFetchSlice(
  {
    info: {},
  },
  {
    reset: state => {
      state.info = {};
    },
  },
  (state, payload) => {
    state.info = payload.data;
  },
)

export const { reset } = memberSlice.actions;
export default memberSlice.reducer;