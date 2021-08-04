
import { createStore } from 'redux';
import cartReducer, {clear, del, add } from '../cartSlicer';

const testOrder = {
  hotel: "some hotel",
  room: "some room",
  number: 1,
  price: 2345,
  startDate: '2021-08-24',
  endDate: '2021-08-25',
  adult: 2,
  child: 1,
  night: 1,
}

const testOrders = [
  {
    hotel: "some other hotel",
    room: "some other room",
    number: 1,
    price: 4567,
    startDate: '2021-08-25',
    endDate: '2021-08-26',
    adult: 2,
    child: 1,
    night: 1,
  },
  {
    hotel: "some other hotel 2",
    room: "some other room 2",
    number: 1,
    price: 4567,
    startDate: '2021-08-25',
    endDate: '2021-08-26',
    adult: 2,
    child: 1,
    night: 1,
  },
  testOrder,
]

let store = null;

beforeEach(() => {
  store = createStore(cartReducer);
})

afterEach(() => {
  store = null;
})

test('cartSlicer: basic operations', () => {

  let state = null;

  // add: single element
  store.dispatch(add(testOrder));

  state = store.getState();
  expect(state.orders.length).toBe(1);
  expect(state.orders[0].hotel).toEqual("some hotel");

  // add: batch
  store.dispatch(add(testOrders));

  state = store.getState();
  expect(state.orders.length).toBe(4);
  expect(state.orders[1].hotel).toEqual("some other hotel");
  expect(state.orders[2].hotel).toEqual("some other hotel 2");
  expect(state.orders[3].hotel).toEqual("some hotel");

  // del: delete last element
  store.dispatch(del());

  state = store.getState();
  expect(state.orders.length).toBe(3);
  expect(state.orders[2].hotel).toEqual("some other hotel 2");

  // del: delete the second element
  store.dispatch(del(1));

  state = store.getState();
  expect(state.orders.length).toBe(2);
  expect(state.orders[1].hotel).toEqual("some other hotel 2");

  // clear
  store.dispatch(clear());
  state = store.getState();
  expect(state.orders.length).toBe(0);

});

test('cartSlicer: multiple deletes', () => {

  let state = null;

  store.dispatch(add(testOrder));
  store.dispatch(add(testOrders));

  state = store.getState();
  expect(state.orders.length).toBe(4);

  // del: given idx array
  const toDel = [0, 2];
  store.dispatch(del(toDel));


  state = store.getState();
  expect(state.orders.length).toBe(2);
  expect(state.orders[0].hotel).toEqual("some other hotel");
  expect(state.orders[1].hotel).toEqual("some hotel");

})

test('cartSlicer: corner cases', () => {

  let state = null;

  // del: empty
  store.dispatch(del());

  state = store.getState();
  expect(state.orders.length).toBe(0);

  // del: idx larger than length
  store.dispatch(add(testOrders));
  store.dispatch(del(5));

  state = store.getState();
  expect(state.orders.length).toBe(3);

  // del: negative idx
  store.dispatch(del(-1));

  state = store.getState();
  expect(state.orders.length).toBe(3);

  // del: idx not an integer
  store.dispatch(del({}));

  state = store.getState();
  expect(state.orders.length).toBe(3);

  // add: not an object or array
  store.dispatch(add(3));

  state = store.getState();
  expect(state.orders.length).toBe(3);

})

