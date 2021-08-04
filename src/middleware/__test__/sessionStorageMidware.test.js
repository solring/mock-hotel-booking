import { createStore, applyMiddleware } from 'redux';
import { sessionStorageMidwareInit, loadSessionStorage } from "../sessionStorageMidware";
import { SESSION_STORAGE_KEY } from '../../utils/constants';

const module = 'sessionStorage';
const testTitle = (subtitle) => `${module}: ${subtitle}`;

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  sessionStorage.clear();
});

test(testTitle('basic save/load'), () => {
  const midware = sessionStorageMidwareInit();

  const defaultStates = { data: 'test' };
  const testReducer = (state = defaultStates, action) => {
    switch(action.type) {
      default:
        return state;
    }
  };
  const store = createStore(testReducer, applyMiddleware(midware));

  // Save
  store.dispatch({ type: 'default' });
  let value = sessionStorage.getItem(SESSION_STORAGE_KEY);
  expect(JSON.parse(value)).toEqual(defaultStates);

  // Load
  let value2 = loadSessionStorage();
  expect(value2).toEqual(defaultStates);
});

test(testTitle('filter: single path'), () => {
  const midware = sessionStorageMidwareInit("path1");

  const ans = {path1: 'toEqualSaved'};
  const defaultStates = { ...ans , path2: 'toEqualNotSaved'};
  const testReducer = (state = defaultStates, action) => {
    switch(action.type) {
      default:
        return state;
    }
  };
  const store = createStore(testReducer, applyMiddleware(midware));

  // Save
  store.dispatch({ type: 'default' });
  let value = sessionStorage.getItem(SESSION_STORAGE_KEY);
  expect(JSON.parse(value)).toEqual(ans);

  // Load
  let value2 = loadSessionStorage();
  expect(value2).toEqual(ans);
});


test(testTitle('filter: multiple paths'), () => {
  const midware = sessionStorageMidwareInit(["path1", "path2"]);

  const ans = {path1: 'toEqualSaved', path2: 'saved'};
  const defaultStates = { ...ans , path3: 'not this one!'};
  const testReducer = (state = defaultStates, action) => {
    switch(action.type) {
      default:
        return state;
    }
  };
  const store = createStore(testReducer, applyMiddleware(midware));

  // Save
  store.dispatch({ type: 'default' });
  let value = sessionStorage.getItem(SESSION_STORAGE_KEY);
  expect(JSON.parse(value)).toEqual(ans);

  // Load
  let value2 = loadSessionStorage();
  expect(value2).toEqual(ans);
});

test(testTitle('filter: non-existing path'), () => {
  const midware = sessionStorageMidwareInit(["path3"]);

  const defaultStates = { path1: 'toEqualSaved', path2: 'saved' };
  const testReducer = (state = defaultStates, action) => {
    switch(action.type) {
      default:
        return state;
    }
  };
  const store = createStore(testReducer, applyMiddleware(midware));

  // Save
  store.dispatch({ type: 'default' });
  let value = sessionStorage.getItem(SESSION_STORAGE_KEY);
  expect(value).toBe("{}");

  // Load
  let value2 = loadSessionStorage();
  expect(value2).toEqual({});
});