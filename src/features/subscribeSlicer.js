import { Subscribe } from '../api/mockApi';
import fetchSlicer from './baseFetchSlicer';

const subscribeSlicer = fetchSlicer('subscribe');

export const doSubscribe = subscribeSlicer.createFetchApi(Subscribe);

export const subscribeSlice = subscribeSlicer.createFetchSlice(
  {
    success: false,
  },
  {},
  (state, payload) => {
    if (payload)
      state.success = payload.success;
  },
)

export const { reset } = subscribeSlice.actions;
export default subscribeSlice.reducer