const rates = Array(6).fill(0).map((v, i)=>`rate${i}`);

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
  "rates" : {
    titles: rates
  }
};

function initFilterForm() {
  let state = {};
  // eslint-disable-next-line
  Object.values(sections).map((sec) =>{
    if(Object.hasOwnProperty("options")){
      // eslint-disable-next-line
      sec["options"].map((opt) => {
        state[opt.title] = false;
      })
    }
  });
  // eslint-disable-next-line
  [0,1,2,3,4,5].map((i) => {
    state[`rate${i}`] = false;
  });
  state['priceRange'] = [1000, 5000];
  return state;
}

/**
 * Helper functions for @filter
 */
function makeOptions(data) {
  let options = {};
  options['deals'] = sections['deals'].options.map(x => x.title).filter(x => x !== 'specialOffer' && data[x] === true);
  options['stayType'] = sections['stayType'].options.map(x => x.title).filter(x => data[x] === true);
  options['services'] = sections['popular'].options.map(x => x.title).filter(x => data[x] === true);
  options['specialOffer'] = data['specialOffer'];
  options['stars'] = Object.keys(Array(6).fill(0)).map(x => data[`rate${x}`]);
  options['priceRange'] = data['priceRange'];
  return options;
}

function filterFields(data, field, tags) {
  return data.filter(h =>
    tags.map( t => h[field].includes(t))
        .reduce((a, b) => a || b, false)
  )
}

/**
 * Filter implementation
 * @param hotelData: list of hotels to filter.
 * @param formData: form data from the component state.
 * @return: filtered list of hotels.
 */
function filter(hotelData, formData) {
  if(!hotelData || !formData) return hotelData;

  let res = hotelData;
  const { priceRange, deals, stars, specialOffer, stayType, services } = makeOptions(formData);

  if (priceRange) {
    const [min, max] = priceRange;
    if(min < max)
      res = res.filter( h => h.price >= min && h.price <= max );
  }

  if (deals && deals.length > 0) {
    res = filterFields(res, "tags", deals);
  }
  if (services && services.length > 0) {
    res = filterFields(res, "services", services);
  }

  if (specialOffer) {
    res = res.filter( h => h.oldPrice !== undefined);
  }

  if (stars && stars.reduce((a, b) => a || b, false) > 0) {
    res = res.filter( h => { return stars[h.star] });
  }

  if(stayType && stayType.length > 0) {
    res = res.filter( h => stayType.includes(h.stayType) );
  }

  return res;
};

export default filter;
export { makeOptions, initFilterForm };





