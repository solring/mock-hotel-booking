import qs from 'query-string';

/**
 * Endpoints
 */
export const API_NEWS_SUBSCRIBE = "/api/subscribe";
export const API_ORDER_SUBMIT= "/api/order/submit";
export const API_ORDER_GET= "/api/order/get";

export const API_GET_RECOMMEND = "/api/index/recommend";
export const API_SEARCH_GET_HOTELS = "/api/search/hotels";
export const API_SEARCH_GET_RECOMMEND= "/api/search/recommendLocs";

export const API_HOTEL_GET_ROOMS = "/api/hotel/rooms";
export const API_HOTEL_GET_INFO = "/api/hotel/info";

export const API_MEMBER_LOGIN = "/api/login";
export const API_MEMBER_GET_INFO = "/api/member/info";
export const API_MEMBER_GET_ORDERS = "/api/member/orders";

/**
 * Endpoint params
 */
export const Subscribe = (email) => ({
  endpoint: API_NEWS_SUBSCRIBE,
  method: 'post',
  json: { email }
});

export const SubmitOrder = (orders) => ({
  endpoint: API_ORDER_SUBMIT,
  method: 'post',
  json: {
    orders
  }
});

export const GetOrder = (orderId) => ({
  endpoint: API_ORDER_GET,
  method: 'post',
  json: {
    id: orderId,
  }
})

export const LoadRecommendation = () => ({
  endpoint: API_GET_RECOMMEND,
  method: 'get',
})

export const Search = ({
  city,
  country,
  adult,
  child,
  room,
  startDate,
  endDate,
}) => ({
  endpoint: API_SEARCH_GET_HOTELS,
  method: 'get',
  query: {
    city,
    country,
    adult,
    child,
    room,
    startDate,
    endDate,
  }
});

export const LoadRecommendLocs = () => ({
  endpoint: API_SEARCH_GET_RECOMMEND,
  method: 'get',
});

export const LoadRooms = (hotelId) => ({
  endpoint: API_HOTEL_GET_ROOMS,
  method: 'get',
  query: {
    hotel: hotelId,
  }
});

export const GetHotelInfo = (hotelId) => ({
  endpoint: API_HOTEL_GET_INFO,
  method: 'get',
  query: {
    hotel: hotelId,
  }
});

// TODO: add auth
export const Login = ({user: username, pwd: password}) => ({
  endpoint: API_MEMBER_LOGIN,
  method: 'post',
  json: {
    username,
    password,
  },
});

export const GetMemberInfo = (memberId) => ({
  endpoint: API_MEMBER_GET_INFO,
  method: 'post',
  json: {
    id: memberId,
  }
})

export const GetMemberOrders = (memberId) => ({
  endpoint: API_MEMBER_GET_ORDERS,
  method: 'post',
  json: {
    id: memberId,
  }
})

function makeQuery(endpoint, queryObj) {
  if(typeof(endpoint)!=='string') return "";
  if (!queryObj || Object.keys(queryObj).length === 0) return endpoint;
  return `${endpoint}?${qs.stringify(queryObj)}`
}

/**
 * callApi:
 * Do the actual fetch operation
 */
async function callApi(endpoint, method, json, {...customConfigs}) {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: method ? method : 'GET',
    ...customConfigs,
    headers: {
      ...headers,
      ...customConfigs.headers,
    },
  };

  if (json) {
    config.body = JSON.stringify(json);
  }

  let data;
  try {
    // mimic delay
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

export default function api({endpoint, method, query, json}){
  endpoint = query ? makeQuery(endpoint, query) : endpoint;

  return callApi(endpoint, method, json, {});
}