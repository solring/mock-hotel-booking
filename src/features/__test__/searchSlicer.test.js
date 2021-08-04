import { createStore } from 'redux';
import searchReducer, {update, reset, initState } from '../searchSlicer';

const testObj = {
  city: "testCity",
  country: "testCountry",
  adult: 99,
  child: 98,
  room: 77,
  startDate: "1990-01-01",
  endDate: "1990-01-20",
}
const wrongObj = {
  price: 1000,
  tag: 'tag',
}

const strValueObj = {
  adult: '45',
  child: '33',
  room: '3',
};

let store = null;

beforeEach(() => {
  store = createStore(searchReducer);

});

afterEach(() => {
  store = null;
})

test('searchSlicer: basic operations', () => {

  let state = null;

  // normal update
  store.dispatch(update(testObj));
  state = store.getState();
  expect(state).toEqual(testObj);

  // update unknown keys
  store.dispatch(update(wrongObj));
  state = store.getState();
  expect(state).toEqual(testObj);

  // test parse int
  store.dispatch(update(strValueObj));
  state = store.getState();
  expect(state.adult).toStrictEqual(45);
  expect(state.child).toStrictEqual(33);
  expect(state.room).toStrictEqual(3);

  // clear
  store.dispatch(reset());
  state = store.getState();
  expect(state).toEqual(initState);
})