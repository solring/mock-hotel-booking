import { LoadRooms } from '../../api/mockApi';
import fetchSlicer from '../baseFetchSlicer';

const roomSlicer = fetchSlicer('room');

export const fetchHotelRooms = roomSlicer.createFetchApi(LoadRooms);

export const roomSlice = roomSlicer.createFetchSlice(
  {
    rooms: []
  },
  {},
  (state, payload) => {
    state.rooms = payload.data;
  },
)

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;