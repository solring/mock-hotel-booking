import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureAppStore from './store';

const allStore = configureAppStore();

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