import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import cartSlicer from './features/cartSlicer';
import searchSlicer from './features/searchSlicer';

import hotelSlicer from './features/hotelSlicer';
import detailSlicer from './features/detail/detailSlicer';
import roomSlicer from './features/detail/roomSlicer';
import orderSlicer from './features/orderSlicer';
import memberSlicer from './features/member/memberSlicer'
import memberOrderSlicer from './features/member/memberOrderSlicer'
import loginSlicer from './features/loginSlicer';

import { sessionStorageMidwareInit, loadSessionStorage } from './middleware/sessionStorageMidware';

const toSave = [
  "cart",
  "search",
  "login",
];

const sessionStorageMidware = sessionStorageMidwareInit(toSave);

export default function configureAppStore() {

  let preloadedState = loadSessionStorage();

  const store = configureStore({
    reducer: {
      cart: cartSlicer,
      search: searchSlicer,
      hotel: hotelSlicer,
      detail: detailSlicer,
      room: roomSlicer,
      order: orderSlicer,
      member: memberSlicer,
      morder: memberOrderSlicer,
      login: loginSlicer,
    },
    middleware: [thunkMiddleware, sessionStorageMidware],
    preloadedState,
  });

  return store;
}
