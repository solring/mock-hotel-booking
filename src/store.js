import { configureStore } from '@reduxjs/toolkit';
import cartSlicer from './features/cart/cartSlicer';
import { sessionStorageMidwareInit, loadSessionStorage } from './middleware/sessionStorageMidware';

const sessionStorageMidware = sessionStorageMidwareInit();

export default function configureAppStore() {

  let preloadedState = loadSessionStorage();

  const store = configureStore({
    reducer: {
      cart: cartSlicer
    },
    middleware: [sessionStorageMidware],
    preloadedState,
  });

  return store;
}
