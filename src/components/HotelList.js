function HotelList(props) {
  const { rooms } = props;
  const tags = [
    "Free cencellation",
    "No prepayment"
  ];
  const results = [
    {
      imgs: ['Rachada1.jpg', 'Rachada2.jpg', 'Rachada3.jpg', 'Rachada4.jpg'],
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
      imgs: ['Phaya.jpg'],
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
      imgs: ['Bangkapi.jpg'],
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
      imgs: ['Chatuchack1.jpg', 'Chatuchack2.jpg'],
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
      imgs: ['Chatuchack2.jpg'],
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
      imgs: ['RangRak.jpg'],
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
      imgs: ['Watana1.jpg'],
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
      imgs: ['Watana2.jpg'],
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
      imgs: ['DinDaeng1.jpg'],
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
      imgs: ['DinDaeng2.jpg'],
      name: "Dininn Hotel",
      star: 3,
      reviews: 446,
      room: "Deluxe Double Room",
      price: "3,450",
      location: "Din Daeng, Bangkok",
      distance: 7,
      tags: [],
    },
  ];

  const groups = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [7, 4, 5, 3, 8, 1],
    [9, 0, 3, 6],
    [3, 10, 2],
  ];

  const genStar = (star) => {
    return "grade ".repeat(star);
  };

  const swiperImages = (images) => {
    if(images.length <= 1) return;

    if(images.length === 1)
      return (<img class="search-card-img pic-height-sm" src={images[0]} alt="hotel picture"></img>);

    return (
    <div class="swiper-container nav-show-hover">
      <ul class="swiper-wrapper">
      {images.map((image) => (
        <li class="swiper-slide">
          <img class="search-card-img pic-height-sm" src={image} alt="hotel picture"/>
        </li>
      ))}
      </ul>
      <div class="swiper-button-prev swiper-button-round"></div>
      <div class="swiper-button-next swiper-button-round"></div>
    </div>
    );
  };

  const genTags = (tags) => {
    return tags.map((idx) => (
        <div class="badge badge-info badge-pill mr-1 mb-1">{tags[idx]}</div>
    ));
  };

  const genOldprice = (room) => {
    if (room.oldPrice != undefined) {
      return (
        <div>
          <p class="old-price"><del>TWD {room.oldPrice}</del></p>
          <h4 class="fz-hotel-title">TWD <span class="h6-md text-primary">{room.price}</span></h4>
        </div>
      );
    } else {
      return <h4 class="fz-hotel-title">TWD {room.price}</h4>;
    }
  };

  const genDetail =  (room) => (
<li>
      <a href="./detail.html" class="d-block text-dark card card-rounded-0-sm w-100 hover-shadow">
        <div class="row no-gutters">

          <div class="col-5 col-md-4">
            {swiperImages(room.images)}
          </div>

          <div class="col-7 col-md-8">
            <div class="card-body-narrow row no-gutters">

              <div class="col-md-7">
                <p class="card-text">
                  <span class="text-primary">room.location</span>
                  <span class="d-none d-lg-inline">・room.distancekm from center</span>
                </p>
                <h4 class="card-title fz-hotel-title">room.name</h4>
              </div>

              <div class="col-md-5">
                <div class="d-flex flex-column align-items-md-end align-items-lg-center justify-content-lg-end flex-lg-row">
                    <div class="material-icons fz-grade">
                      {genStar(room.star)}
                    </div>
                    <p class="ml-1 text-sub text-secondary">room.star.0(room.reviews)</p>
                </div>
              </div>

              <div class="col-md-7">
                <h5 class="card-subtitle">room.room</h5>
                <p class="card-text mb-2 mb-md-3">2 guests・1 bed (Queen size)</p>
                <div class="d-none d-md-flex align-items-center flex-wrap">
                  {genTags()}
                </div>
              </div>

              <div class="col-md-5">
                <div class="d-flex h-100 flex-column justify-content-end align-items-end">
                  <p class="card-text d-none d-md-block">per night</p>
                  {genOldprice()}
                </div>
              </div>

            </div>
          </div>

        </div>
      </a>
  </li>
  );

  if(!rooms) return <div></div>;
  return (
    <ul class="list-divider-info no-divider-down-sm">
      {rooms.map(genDetail)}
    </ul>
  );
}

export default HotelList;