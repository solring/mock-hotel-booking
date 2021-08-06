
export const sections = {
  "deals" : {
    title: "Deals",
    options: [
      {
        title: "freeCancel",
        text: "Free cancel",
      },
      {
        title: "noPrepay",
        text: "No prepayment",
      },
      {
        title: "specialOffer",
        text: "Special offer",
      },
    ],
  },
  "popular": {
    title: "Popular Filters",
    options: [
      {
        title: "breakfast",
        text: "Breakfast included",
      },
      {
        title: "freeWifi",
        text: "Free Wifi",
      },
      {
        title: "swimmingPool",
        text: "Swimming pool",
      },
    ],
  },
  "stayType": {
    title: "Stay Type",
    options: [
      {
        title: "hotel",
        text: "Hotel",
      },
      {
        title: "apartment",
        text: "Apartment",
      },
      {
        title: "unique",
        text: "Unique",
      },
      {
        title: "hostel",
        text: "Hostel",
      },
    ],
  },
};

function makeOptions(data) {
  let options = {};
  options['deals'] = sections['deals'].options.map(x => x.title).filter(x => x !== 'specialOffer' && data[x] === true);
  options['specialOffer'] = data['specialOffer'];
  options['stars'] = Object.keys(Array(6).fill(0)).map(x => data[`rate${x}`]);
  options['priceRange'] = data['priceRange'];
  return options;
}

function filter(hotelData, options) {
  if(!hotelData || !options) return hotelData;

  let res = hotelData;
  const { priceRange, deals, stars, specialOffer } = options;

  if (priceRange) {
    const [min, max] = priceRange;
    if(min < max)
      res = res.filter( h => h.price >= min && h.price <= max );
  }

  if (deals && deals.length > 0) {
    let tags = options.deals;
    res = res.filter(h =>
      tags.map( t => h.tags.includes(t))
          .reduce((a, b) => a || b, false)
    )
  }

  if (specialOffer) {
    res = res.filter( h => h.oldPrice !== undefined);
  }

  if (stars && stars.reduce((a, b) => a || b, false) > 0) {
    res = res.filter( h => { return options.stars[h.star] });
  }

  return res;
};

export default filter;
export { makeOptions };





