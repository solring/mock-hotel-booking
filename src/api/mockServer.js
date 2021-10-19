import { createServer } from 'miragejs';
import * as data from '../utils/mockdata';
import * as apis from './mockApi';
import { genHotel } from '../utils/genHotel';

function mockServer() {
  return createServer({
    seeds(server) {
      server.db.loadData({
        users:[
          {account: "test@email.cc", password: "123456", id: "userId"}
        ],
      })
    },

    routes() {
      this.post(apis.API_MEMBER_LOGIN, (schema, request) => {
        const json = JSON.parse(request.requestBody);
        const {username, password} = json;
        console.log(`LOGIN: ${username}/${password}`);

        let db = schema.db;
        let res = db.users.filter(e => e.account === username);

        if ( res.length > 0 && res[0].password === password) {
          return {
            success: true,
            id: res.id,
            token: "fakeToken",
            name: "David Lin",
            profilePic: data.profilePic,
          };
        } else {
          return {
            success: false,
          };
        }
      })

      this.post(apis.API_NEWS_SUBSCRIBE, (schema, request) =>{
        let json = JSON.parse(request.requestBody);
        console.log(`SUBSCRIBE: ${json.email}`);
        return { success: true };
      })

      this.get(apis.API_GET_RECOMMEND, () => ({
        hotels: data.hotelTopChoices,
        blogs: data.blogPosts,
        locations: data.popCities,
      }))

      this.get(apis.API_SEARCH_GET_RECOMMEND, () => ({
        data: data.suggestLocs,
      }))

      this.get(apis.API_SEARCH_GET_HOTELS, () => {
        const hotels = genHotel(100);
        return { data: hotels };
      })

      this.get(apis.API_HOTEL_GET_INFO, () => ({
        info: data.hotelInfo,
        imgs: data.hotelPics,
      }))

      this.get(apis.API_HOTEL_GET_ROOMS, () => ({
        data: data.availableRooms,
      }))

      this.post(apis.API_ORDER_SUBMIT, (schema, request)=> {
        let json = JSON.parse(request.requestBody);
        console.log(json);
        return { success: true, order: "fakeOrderNum" };
      })

      this.post(apis.API_ORDER_GET, (schema, request) => {
        let json = JSON.parse(request.requestBody);
        console.log(`ORDER: order id=${json.id}`);
        return {
          user: data.memberData,
          orders: [data.orderDetail],
        };
      })

      this.post(apis.API_MEMBER_GET_INFO, (schema, request) => {
        let json = JSON.parse(request.requestBody);
        console.log(`MEMBER: get member info: ${json.id}`);
        return { data: data.memberData };
      })

      this.post(apis.API_MEMBER_GET_ORDERS, (schema, request) => {
        let json = JSON.parse(request.requestBody);
        console.log(`MEMBER: get member orders: ${json.id}`);
        return { data: data.bookings };
      })
    }
  });
}

export default mockServer;