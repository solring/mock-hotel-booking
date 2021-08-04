import { genGuestStr } from '../utils'

test('utils: test genGuestsString - basics', () => {
  let testcases = [
    [0,0,0],
    [1,0,0],
    [0,1,0],
    [0,0,1],
  ];
  let ans = [
    "",
    "1 adult",
    "1 child",
    "1 room",
  ];
  testcases.map((tc, idx) => {
    let res = genGuestStr(...tc);
    expect(res).toBe(ans[idx]);
  });
});

test('utils: test genGuestsString - combined numbers', () => {
  let testcases = [
    [2,0,1],
    [0,3,1],
    [1,3,0],
    [3,4,2],
    [10,20,5],
  ];
  let ans = [
    "2 adults・1 room",
    "3 children・1 room",
    "1 adult・3 children",
    "3 adults・4 children・2 rooms",
    "10 adults・20 children・5 rooms",
  ];
  testcases.map((tc, idx) => {
    let res = genGuestStr(...tc);
    expect(res).toBe(ans[idx]);
  });
});
