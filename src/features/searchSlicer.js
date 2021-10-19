import { createSlice } from '@reduxjs/toolkit';
import * as constants from '../utils/constants';
import dayjs from 'dayjs';
import { serializeDate } from '../utils/dates';

const initState = {
  city: constants.DEFAULT_CITY_STR,
  country: constants.DEFAULT_COUNTRY_STR,
  adult: 2,
  child: 0,
  room: 1,
  startDate: serializeDate(dayjs()), // default is today
  endDate: serializeDate(dayjs().add(1, 'day')),
}

// Can use mutating code inside createSlice
export const searchSlice = createSlice({
  name: 'searchOptions',
  initialState: {
    ...initState
  },
  reducers: {
    reset: state => {
      Object.assign(state, initState);
    },
    update: (state, action) => {
      let temp = {...action.payload};
      if(typeof(temp.adult)==='string') temp.adult = parseInt(temp.adult);
      if(typeof(temp.child)==='string') temp.child = parseInt(temp.child);
      if(typeof(temp.room)==='string') temp.room = parseInt(temp.room);
      // eslint-disable-next-line
      Object.keys(initState).map((key) => {
        if (temp[key]!==undefined){
          state[key] = temp[key];
        }
      });
    },
  }
});

export const { update, reset } = searchSlice.actions;
export { initState } // for testing
export default searchSlice.reducer;