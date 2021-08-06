import top1 from '../assets/images/top1.jpg';
import top2 from '../assets/images/top2.jpg';
import top3 from '../assets/images/top3.jpg';
import top4 from '../assets/images/top4.jpg';

import roomA from '../assets/images/roomA.jpg';
import roomB from '../assets/images/roomB.jpg';

import Italy from '../assets/images/italy.jpg'
import Bangkok from '../assets/images/Bangkok.jpg'
import NewZealand from '../assets/images/NewZealand.jpg'

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

import profilePic from "../assets/images/profile.jpg";

export const suggestLocs = [
  ['Bangkok', 'Thailand'],
  ['Osaka', 'Japan'],
  ['Roma', 'Italy'],
  ['Paris', 'France'],
  ['Reykjavik', 'Iceland'],
];

export const blogPosts = [
  {
    title: "Fifth Most Visited Country",
    pic: Italy,
    preview: "Italy is the fifth most visited country in the world, with a total of 52.3 million…",
  },
  {
    title: "Visit Thailand for Bangkok",
    pic: Bangkok,
    preview: "Asian tourists primarily visit Thailand for Bangkok and the historical, natural, and…",
  },
  {
    title: "Lord of the Rings Tour",
    pic: NewZealand,
    preview: "The national cuisine has been described as Pacific Rim, incorporating the native Māori…",
  },
];

export const hotelTopChoices = {
  "Bali" :
  [
    {
      name: "Hotel Aqua",
      star: 5,
      reviews: "2k",
      price: "2,480",
      pic: top1,
      url: "/detail",
    },
    {
      name: "Mr. Kawasaki Inn",
      star: 4,
      reviews: "500",
      price: "3,380",
      pic: top2,
      url: "/detail",
    },
    {
      name: "Weekly Paradise",
      star: 4,
      reviews: "470",
      price: "4,780",
      pic: top3,
      url: "/detail",
    },
    {
      name: "Beast Hotel",
      star: 4,
      reviews: "238",
      price: "1,980",
      pic: top4,
      url: "/detail",
    },
    {
      name: "Celebrity Palace",
      star: 4,
      reviews: "586",
      price: "1,980",
      pic: top3,
      url: "/detail",
    },
    {
      name: "Forever Palace",
      star: 4,
      reviews: "320",
      price: "4,780",
      pic: top2,
      url: "/detail",
    },
    {
      name: "RR Space",
      star: 4,
      reviews: "238",
      price: "2,090",
      pic: top1,
      url: "/detail",
    },
  ],
  "Okinawa" :
  [
    {
      name: "Indigo Hotel",
      star: 4,
      reviews: "238",
      price: "2,980",
      pic: top3,
      url: "/detail",
    },
    {
      name: "Celebrity Palace",
      star: 4,
      reviews: "586",
      price: "1,980",
      pic: top2,
      url: "/detail",
    },
    {
      name: "Forever Palace",
      star: 4,
      reviews: "320",
      price: "4,780",
      pic: top4,
      url: "/detail",
    },
    {
      name: "RR Space",
      star: 4,
      reviews: "238",
      price: "2,090",
      pic: top1,
      url: "/detail",
    },
  ],
  "Taipei" :
  [
    {
      name: "Weekly Paradise",
      star: 4,
      reviews: "470",
      price: "4,780",
      pic: top4,
      url: "/detail",
    },
    {
      name: "Hotel Aqua",
      star: 5,
      reviews: "2k",
      price: "2,480",
      pic: top1,
      url: "/detail",
    },
    {
      name: "Mr. Kawasaki Inn",
      star: 4,
      reviews: "500",
      price: "3,380",
      pic: top2,
      url: "/detail",
    },
  ],
}

export const popCities = [
  {
    name: "Osaka",
    country: "Japan",
  },
  {
    name: "Kyoto",
    country: "Japan",
  },
  {
    name: "Reykjavic",
    country: "Iceland",
  },
  {
    name: "Paris",
    country: "France",
  },
  {
    name: "Roma",
    country: "Italy",
  },
  {
    name: "Bangkok",
    country: "Thailand",
  },
];

// mock data
export const hotelData = [
  {
    imgs: [Rachada1, Rachada2, Rachada3, Rachada4],
    name: "Rachada Hotel",
    star: 4,
    reviews: 283,
    room: "Deluxe Double Room",
    price: 1980,
    location: "Rachada, Bangkok",
    distance: 2,
    tags: ["freeCancel", "noPrepay"],
  },
  {
    imgs: [Phaya],
    name: "Forever Place",
    star: 5,
    reviews: 121,
    room: "Standard Double Room",
    price: 1680,
    oldPrice: 1980,
    location: "Phaya Thai, Bangkok",
    distance: 2.9,
    tags: ["freeCancel"],
  },
  {
    imgs: [Bangkapi],
    name: "LUV Hotel",
    star: 4,
    reviews: 325,
    room: "Standard Double Room",
    price: 2460,
    location: "Bangkapi, Bangkok",
    distance: 14,
    tags: ["freeCancel"],
  },
  {
    imgs: [Chatuchack1, Chatuchack2],
    name: "WOW Life Hotel",
    star: 4,
    reviews: 204,
    room: "Standard Double Room",
    price: 2240,
    oldPrice: 2880,
    location: "Chatuchack, Bangkok",
    distance: 12,
    tags: ["freeCancel", "noPrepay"],
  },
  {
    imgs: [Chatuchack2],
    name: "Celebrity Palace",
    star: 5,
    reviews: 189,
    room: "Standard Double Room",
    price: 1890,
    oldPrice: 2120,
    location: "Chatuchack, Bangkok",
    distance: 8,
    tags: ["noPrepay"],
  },
  {
    imgs: [RangRak],
    name: "RR Space",
    star: 4,
    reviews: 102,
    room: "Deluxe Double Room",
    price: 2090,
    location: "Rang Rak, Bangkok",
    distance: 4.4,
    tags: ["freeCancel"],
  },
  {
    imgs: [Watana1],
    name: "Bangkok Hostel",
    star: 5,
    reviews: 112,
    room: "Twin Room",
    price: 880,
    location: "Watana, Bangkok",
    distance: 6,
    tags: ["freeCancel", "noPrepay"],
  },
  {
    imgs: [Watana2],
    name: "Watana First Hostel",
    star: 3,
    reviews: 608,
    room: "Twin Room",
    price: 790,
    oldPrice: 1280,
    location: "Watana, Bangkok",
    distance: 6,
    tags: ["freeCancel"],
  },
  {
    imgs: [DinDaeng1],
    name: "DD Space",
    star: 4,
    reviews: 138,
    room: "Standard Double Room",
    price: 1240,
    oldPrice: 1700,
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
    price: 3450,
    location: "Din Daeng, Bangkok",
    distance: 7,
    tags: ["noPrepay"],
  },
  {
    imgs: [Rachada3, Rachada4],
    name: "Rachada Premier",
    star: 4,
    reviews: 28,
    room: "Deluxe Double Room",
    price: 2980,
    location: "Rachada, Bangkok",
    distance: 1.7,
    tags: ["freeCancel", "noPrepay"],
  },
  {
    imgs: [Phaya],
    name: "Phaya Villa",
    star: 5,
    reviews: 121,
    room: "Delux Villa",
    price: 3680,
    oldPrice: 3980,
    location: "Phaya Thai, Bangkok",
    distance: 4,
    tags: ["freeCancel"],
  },
  {
    imgs: [Chatuchack2],
    name: "President Hotel",
    star: 3,
    reviews: 569,
    room: "Double Room",
    price: 1490,
    oldPrice: 1820,
    location: "Chatuchack, Bangkok",
    distance: 1.5,
    tags: ["noPrepay"],
  },
];

// Available rooms
export const availableRooms =[
  {
    name: "Deluxe Double Room A",
    price: 1490,
    oldPrice: 1600,
    img: roomA,
    tags: [0,1,2,3,4,6],
  },
  {
    name: "Deluxe Double Room B",
    price: 1600,
    img: roomB,
    tags: [0,1,2,3,4,6],
  },
  {
    name: "Deluxe Suite with Pool",
    price: 1980,
    img: Rachada1,
    tags: [0,1,2,3,4,5,6,7],
  },
];

// Hotel description
export const hotelInfo = {
  name: "Rachada Hotel",
  star: 4,
  review: 283,
  addr: "318 Phaya Thai Road, Ratchathewi, Phaya Thai, 10400 Bangkok, Thailand",
  desc: "The Rachada Hotel is an establishment that provides paid lodging on a short-term basis. Facilities provided may range from a modest-quality mattress in a small room to large suites with bigger, higher-quality beds, a dresser, a refrigerator and other kitchen facilities, upholstered chairs, a flat screen television, and en-suite bathrooms.",
}

// Order detail
export const orderDetail = {
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

export const memberData = {
  name: "David Lin",
  email: "david0520@mail.com.tw",
  phone: "+886 9 32 456 789",
  pic: profilePic,
  verified: true,
  payments: [
    {
      cardOwner: "DAVID LIN",
      cardNum: "xxxx-xxxx-7890",
      expire: "08/2029",
      type: "visa",
    }
  ],
};

export const bookings = [
    {
      name: "Rachada Hotel",
      room: "Deluxe Suite with Pool",
      startDate: "17 June 2020",
      endDate: "19 June 2020",
      nights: 2,
      adults: 2,
      price: "4,633",
      img: Rachada1,
      status: "Completed",
    },
    {
      name: "WOW Life Hotel",
      startDate: "8 Sep 2020",
      endDate: "15 Sep 2020",
      numOfNights: 7,
      adults: 2,
      price: "13,084",
      img: Chatuchack1,
      status: "Completed",
    },
    {
      name: "DD Space",
      room: "Standard Double",
      startDate: "2 June 2018",
      endDate: "4 June 2018",
      nights: 2,
      adults: 2,
      price: "3,450",
      img: DinDaeng1,
      status: "Upcoming",
    },
];
export const hotelPics = [Rachada1, Rachada2, Rachada3, Rachada4];

export { top1, top2, top3, top4 };
export { profilePic };
export { Rachada1,Rachada2,Rachada3,Rachada4,Phaya,Bangkapi,Chatuchack1,Chatuchack2,RangRak,Watana1,Watana2,DinDaeng1,DinDaeng2 }