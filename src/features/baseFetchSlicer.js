import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/mockApi';
import {
  SLICER_INIT,
  AJAX_STATUES_LOADING,
  AJAX_STATUES_SUCCESS,
  AJAX_STATUES_FAILED
} from './fetchStatus';



export default (feature) => {
  const path = `${feature}/fetch`;

  return ({
    createFetchApi: (req) => createAsyncThunk(path, async (...args) => {
      // mimic delay
      await new Promise((resolve) => setTimeout(resolve(), 30000));
      const json = await api(req(...args));
      return json;
    }),

    createFetchSlice: (initStates, customReducers={}, onSuccess=()=>{}) => createSlice({
      name: feature,
      initialState: {
        ...initStates,
        status: SLICER_INIT,
        error: null,
      },
      reducers: {
        reset: state => {
          state.status = SLICER_INIT;
        },
        ...customReducers,
      },
      extraReducers: {
        [`${path}/pending`]: (state, action) => {
          state.status = AJAX_STATUES_LOADING;
        },
        [`${path}/fulfilled`]: (state, action) => {
          state.status = AJAX_STATUES_SUCCESS;
          onSuccess(state, action.payload);
        },
        [`${path}/rejected`]: (state, action) => {
          state.status = AJAX_STATUES_FAILED;
          state.error = action.error.message;
        }
      }
    }),

  })
};



