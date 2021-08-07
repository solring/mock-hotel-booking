import { Rachada1,Rachada2,Rachada3,Rachada4,Phaya,Bangkapi,Chatuchack1,Chatuchack2,RangRak,Watana1,Watana2,DinDaeng1,DinDaeng2 } from './mockdata';

// mock data
const fields = {
  imgs: {
    type: "randMulti",
    range: [1, 5],
    options: [
      Rachada1, Rachada2, Rachada3, Rachada4,
      Phaya,
      Bangkapi,
      Chatuchack1, Chatuchack2,
      RangRak,
      Watana1, Watana2,
      DinDaeng1, DinDaeng2,
    ]
  },
  name: {
    type: "randOne",
    options: [
      "Rachada Hotel",
      "Forever Place",
      "LUV Hotel",
      "Celebrity Palace",
      "RR Space",
      "Bangkok Hostel",
      "Watana First Hostel",
      "DD Space",
      "Dininn Hotel",
      "Rachada Premier",
      "Phaya Villa",
      "President Hotel",
    ]
  },
  room: {
    type: "randOne",
    options: [
      "Deluxe Double Room",
      "Standard Double Room",
      "Family Room",
      "Twin Room",
      "Delux Villa",
    ]
  },
  price: {
    type: "range",
    range: [700, 7000],
    unit: 10,
  },
  oldPrice: {
    type: "oldPrice",
    range: [1.2, 2],
  },
  star: {
    type: "randOne",
    options: [0, 1, 2, 3, 4, 5],
  },
  reviews: {
    type: "range",
    range: [0, 2001],
    unit: 1,
  },
  location: {
    type: "randOne",
    options: [
      "Rachada, Bangkok",
      "Phaya Thai, Bangkok",
      "Bangkapi, Bangkok",
      "Chatuchack, Bangkok",
      "Watana, Bangkok",
      "Rang Rak, Bangkok",
      "Din Daeng, Bangkok",
    ]
  },
  distance: {
    type: "range",
    range: [0.1, 10],
    unit: 0.1,
  },
  tags: {
    type: "randMulti",
    range: [0,3],
    options: [
      "freeCancel",
      "noPrepay"
    ],
  },
  services: {
    type: "randMulti",
    range: [0,4],
    options: [
      "breakfast",
      "swimmingPool",
      "freeWifi"
    ],
  },
  stayType: {
    type: "randOne",
    options: [
      "hotel",
      "apartment",
      "unique",
      "hostel"
    ],
  },

}

function random(min, max) {
  let r = Math.random();
  //console.log(`rand: ${r}`);
  return min + r * (max-min);
}

function randomInt(min, max) {
  return Math.floor(random(min, max));
}

function randomIntMulti(min, max, len) {
  let res = [];
  while (res.length < len) {
    let i = randomInt(min, max);
    if (res.includes(i)) continue;
    res.push(i);
  }
  return res;
}

export function genHotel(len) {
  let arr = [];
  for(let i=0; i < len; i++) {
    let h = {};
    let keys = Object.keys(fields);
    for (const key of keys) {
      const f = fields[key];
      let val = null;
      switch(f.type) {
        case "randOne":
          val = f.options[randomInt(0, f.options.length)];
          break;
        case "randMulti":
          let len = randomInt(...f.range);
          val = randomIntMulti(0, f.options.length, len).map(idx => f.options[idx]);
          break;
        case "range":
          let [min, max] = f.range.map(e => e/f.unit);
          val = randomInt(min, max) * f.unit;
          if(f.unit < 1) val = val.toFixed(1);
          break;
        case "oldPrice":
          let skip = randomInt(0,2) < 1;
          if(!skip) {
            val = Math.floor(h['price'] * random(...f.range));
          }
          break;
        default:
          break;
      }
      if(val !== null) h[key] = val;
    }
    arr.push(h);
  }
  return arr;
}

