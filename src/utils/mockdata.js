import top1 from '../assets/images/top1.jpg';
import top2 from '../assets/images/top2.jpg';
import top3 from '../assets/images/top3.jpg';
import top4 from '../assets/images/top4.jpg';

import roomA from '../assets/images/roomA.jpg';
import roomB from '../assets/images/roomB.jpg';

import Rachada1 from "../assets/images/Rachada1.jpg";
import Rachada2 from "../assets/images/Rachada2.jpg";
import Rachada3 from "../assets/images/Rachada3.jpg";
import Rachada4 from "../assets/images/Rachada4.jpg";
import Phaya from "../assets/images/Phaya.jpg";
import Bangkapi from "../assets/images/Bangkapi.jpg";
import Chatuchack1 from "../assets/images/Chatuchack1.jpg";
import Chatuchack2 from "../assets/images/Chatuchack2.jpg";
import RangRak from "../assets/images/RangRak.jpg";
import Watana1 from "../assets/images/Watana1.jpg";
import Watana2 from "../assets/images/Watana2.jpg";
import DinDaeng1 from "../assets/images/DinDaeng1.jpg";
import DinDaeng2 from "../assets/images/DinDaeng2.jpg";


// mock data
export let hotelData = [
  {
    imgs: [Rachada1, Rachada2, Rachada3, Rachada4],
    name: "Rachada Hotel",
    star: 4,
    reviews: 283,
    room: "Deluxe Double Room",
    price: "1,980",
    location: "Rachada, Bangkok",
    distance: 2,
    tags: [0, 1],
  },
  {
    imgs: [Phaya],
    name: "Forever Place",
    star: 5,
    reviews: 121,
    room: "Standard Double Room",
    price: "1,680",
    oldPrice: "1,980",
    location: "Phaya Thai, Bangkok",
    distance: 2.9,
    tags: [0],
  },
  {
    imgs: [Bangkapi],
    name: "LUV Hotel",
    star: 4,
    reviews: 325,
    room: "Standard Double Room",
    price: "2,460",
    location: "Bangkapi, Bangkok",
    distance: 14,
    tags: [0],
  },
  {
    imgs: [Chatuchack1, Chatuchack2],
    name: "WOW Life Hotel",
    star: 4,
    reviews: 204,
    room: "Standard Double Room",
    price: "2,240",
    oldPrice: "2,880",
    location: "Chatuchack, Bangkok",
    distance: 12,
    tags: [1],
  },
  {
    imgs: [Chatuchack2],
    name: "Celebrity Palace",
    star: 5,
    reviews: 189,
    room: "Standard Double Room",
    price: "1,890",
    oldPrice: "2,120",
    location: "Chatuchack, Bangkok",
    distance: 8,
    tags: [1],
  },
  {
    imgs: [RangRak],
    name: "RR Space",
    star: 4,
    reviews: 102,
    room: "Deluxe Double Room",
    price: "2,090",
    location: "Rang Rak, Bangkok",
    distance: 4.4,
    tags: [0],
  },
  {
    imgs: [Watana1],
    name: "Bangkok Hostel",
    star: 5,
    reviews: 112,
    room: "Twin Room",
    price: "880",
    location: "Watana, Bangkok",
    distance: 6,
    tags: [0, 1],
  },
  {
    imgs: [Watana2],
    name: "Watana First Hostel",
    star: 3,
    reviews: 608,
    room: "Twin Room",
    price: "790",
    oldPrice: "1,280",
    location: "Watana, Bangkok",
    distance: 6,
    tags: [0],
  },
  {
    imgs: [DinDaeng1],
    name: "DD Space",
    star: 4,
    reviews: 138,
    room: "Standard Double Room",
    price: "1,240",
    oldPrice: "1,700",
    location: "Din Daeng, Bangkok",
    distance: 7,
    tags: [],
  },
  {
    imgs: [DinDaeng2],
    name: "Dininn Hotel",
    star: 3,
    reviews: 446,
    room: "Deluxe Double Room",
    price: "3,450",
    location: "Din Daeng, Bangkok",
    distance: 7,
    tags: [],
  }
];

// Available rooms
export let availableRooms =[
  {
    name: "Deluxe Double Room A",
    price: "1,490",
    oldPrice: "1,600",
    img: roomA,
    tags: [0,1,2,3,4,6],
  },
  {
    name: "Deluxe Double Room B",
    price: "1,600",
    img: roomB,
    tags: [0,1,2,3,4,6],
  },
  {
    name: "Deluxe Suite with Pool",
    price: "1,980",
    img: Rachada1,
    tags: [0,1,2,3,4,5,6,7],
  },
];

// Order detail
export let orderDetail = {
  hotelName: "Rachada Hotel",
  room: "Deluxe Suite with Pool",
  duration: {
    start: "17 June 2020",
    end: "19 June 2020",
    night: 2,
  },
  guests: {
    adult: 2,
    child: 0,
    room: 1,
  },
  priceItems: [
    { name: "Deluxe Suite with Pool" , number: 3960 },
    { name: "VAT (7%)" , number: 277 },
    { name: "Property service charge" , number: 396 },
  ],
};

export let memberData = {
  name: "David Lin",
  email: "david0520@mail.com.tw",
  phone: "+886 9 32 456 789",
};

export let hotelPics = [Rachada1, Rachada2, Rachada3, Rachada4];

export { top1, top2, top3, top4 };
export { Rachada1,Rachada2,Rachada3,Rachada4,Phaya,Bangkapi,Chatuchack1,Chatuchack2,RangRak,Watana1,Watana2,DinDaeng1,DinDaeng2 }