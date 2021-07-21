import { Login } from '../api/mockApi';
import fetchSlicer from './baseFetchSlicer';

const loginSlicer = fetchSlicer('login');

export const doLogin = loginSlicer.createFetchApi(Login);

export const loginSlice = loginSlicer.createFetchSlice(
  {
    authorized: false,
    memberId: "",
    token: "",
    name: "",
    profilePic: null,
  },
  {
    logout: state => {
      state.authorized = false
      state.memberId = "";
      state.token = "";
      state.name = "";
      state.profilePic = null;
      state.status = "INIT";
    },
  },
  (state, payload) => {
    state.authorized = payload.success;
    state.memberId = payload.id;
    state.token = payload.token;
    state.name = payload.name;
    state.profilePic = payload.profilePic;
  },
)

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;