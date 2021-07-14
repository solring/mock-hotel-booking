import { createSlice } from '@reduxjs/toolkit';
import * as constants from '../../utils/constants';
import { parseDate, serializeDate } from '../../utils/dates';

const keys = [
  "city",
  "country",
  "adult",
  "child",
  "room",
  "startDate",
  "endDate",
]

const initState = {
  city: constants.DEFAULT_CITY_STR,
  country: constants.DEFAULT_COUNTRY_STR,
  adult: 2,
  child: 0,
  room: 1,
  startDate: serializeDate(parseDate()), // default is today
  endDate: serializeDate(parseDate()),
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
      keys.map((key) => {
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