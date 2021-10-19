import { SESSION_STORAGE_KEY } from "../utils/constants";

const sessionStorageMidwareInit = feature => storeapi => next => action =>{
  let res = next(action);

  let states = storeapi.getState();

  let toSave = states;
  if (feature) {
    if (typeof(feature) === 'string') {
      toSave = {};
      if(states[feature]) toSave[feature] = states[feature];
    } else if (Array.isArray(feature)) {
      toSave = {};
      // eslint-disable-next-line
      feature.map((path) => {
        if(states[path]) toSave[path] = states[path];
      });
    }
  }
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({...toSave}));

  return res;
}

const loadSessionStorage = () => {
  try {
    let statesJSON = sessionStorage.getItem(SESSION_STORAGE_KEY);

    let states = statesJSON ? JSON.parse(statesJSON) : {};
    return states;

  } catch(err) {
    console.log(err);
    return {};
  }
}

export { sessionStorageMidwareInit, loadSessionStorage };