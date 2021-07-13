import { SESSION_STORAGE_KEY } from "../utils/constants";

const sessionStorageMidwareInit = feature => storeapi => next => action =>{
  let res = next(action);

  let states = storeapi.getState();

  let toSave = states;
  if (feature) {
    if (typeof(feature) === 'string') {
      toSave = states[feature];
    } else if (Array.isArray(feature)) {
      toSave = {};
      feature.map((path) => Object.assign(toSave, states[path]));
    }
  }
  console.log("toSave:");
  console.log(toSave);

  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({...toSave}));

  return res;
}

const loadSessionStorage = () => {
  try {
    let statesJSON = sessionStorage.getItem(SESSION_STORAGE_KEY);
    console.log("load from sessionStorate:");
    console.log(statesJSON);

    let states = statesJSON ? JSON.parse(statesJSON) : {};
    return states;

  } catch(err) {
    console.log(err);
    return {};
  }
}

export { sessionStorageMidwareInit, loadSessionStorage };