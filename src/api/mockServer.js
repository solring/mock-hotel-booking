import { createServer } from 'miragejs';
import * as data from '../utils/mockdata';
import * as apis from './mockApi';

const hotels = data.hotelData.map((h) => {
  h.url = './detail';
  return h;
});

export default function() {
  createServer({
    routes() {
      this.post(apis.API_MEMBER_LOGIN, (schema, request) =>{
        let json = JSON.parse(request.requestBody);
        console.log(`LOGIN: ${json.username}/${json.password}`);
        return { success: true, mid: "fakeToken" };
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

      this.get(apis.API_SEARCH_GET_HOTELS, () => ({
        data: hotels,
      }))

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
        return { success: true, order: { order: "fakeOrderNum"} };
      })

      this.post(apis.API_MEMBER_GET_INFO, (schema, request) => {
        let json = JSON.parse(request.requestBody);
        console.log(`MEMBER: get member info: ${json.id}`);
        return { data: data.memberData }
      })

      this.post(apis.API_MEMBER_GET_ORDERS, (schema, request) => {
        let json = JSON.parse(request.requestBody);
        console.log(`MEMBER: get member orders: ${json.id}`);
        return { data: data.bookings }
      })
    }
  });
}