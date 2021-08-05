import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import { reset as resetSearch } from './features/searchSlicer';
import { clear as resetCart } from './features/cartSlicer';
import { logout as resetLogin } from './features/loginSlicer';
import configureAppStore from './store';

let allStore = configureAppStore();

function resetStore() {
  allStore.dispatch(resetSearch());
  allStore.dispatch(resetCart());
  allStore.dispatch(resetLogin());
}

function render(
  component,
  {
    preloadedState,
    store = allStore,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(component, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
// override render
export { render };
export { resetStore };