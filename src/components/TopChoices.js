import { Nav, Tab } from 'react-bootstrap';

import { Swiper, SwiperSlide } from 'swiper/react';
// swiper react does not include navigation by default
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import { Stars } from './UtilComponents';

import { top1, top2, top3, top4 } from '../utils/mockdata';


SwiperCore.use([Navigation]);

function TopChoices(props) {

  const mock_pics = [
    top1, top2, top3, top4
  ];

  const groups = {
    "Bali" :
    [
      {
        name: "Hotel Aqua",
        star: 5,
        reviews: "2k",
        price: "2,480",
        pic: 1,
      },
      {
        name: "Mr. Kawasaki Inn",
        star: 4,
        reviews: "500",
        price: "3,380",
        pic: 2,
      },
      {
        name: "Weekly Paradise",
        star: 4,
        reviews: "470",
        price: "4,780",
        pic: 3,
      },
      {
        name: "Beast Hotel",
        star: 4,
        reviews: "238",
        price: "1,980",
        pic: 4,
      },
      {
        name: "Celebrity Palace",
        star: 4,
        reviews: "586",
        price: "1,980",
        pic: 3,
      },
      {
        name: "Forever Palace",
        star: 4,
        reviews: "320",
        price: "4,780",
        pic: 2,
      },
      {
        name: "RR Space",
        star: 4,
        reviews: "238",
        price: "2,090",
        pic: 1,
      },
    ],
    "Okinawa" :
    [
      {
        name: "Indigo Hotel",
        star: 4,
        reviews: "238",
        price: "2,980",
        pic: 3,
      },
      {
        name: "Celebrity Palace",
        star: 4,
        reviews: "586",
        price: "1,980",
        pic: 2,
      },
      {
        name: "Forever Palace",
        star: 4,
        reviews: "320",
        price: "4,780",
        pic: 4,
      },
      {
        name: "RR Space",
        star: 4,
        reviews: "238",
        price: "2,090",
        pic: 1,
      },
    ],
    "Taipei" :
    [
      {
        name: "Weekly Paradise",
        star: 4,
        reviews: "470",
        price: "4,780",
        pic: 4,
      },
      {
        name: "Hotel Aqua",
        star: 5,
        reviews: "2k",
        price: "2,480",
        pic: 1,
      },
      {
        name: "Mr. Kawasaki Inn",
        star: 4,
        reviews: "500",
        price: "3,380",
        pic: 2,
      },
    ],
  }

  const locations = [
    "Bali", "Okinawa", "Taipei"
  ];

  const genSlides = (group) => {
    return group.map((hotel, idx) => (
      <SwiperSlide>
        <a className="d-block text-dark" href="./detail.html">
          <img className="pic-height-sm rounded-lg" src={mock_pics[hotel.pic-1]} alt={`hotel ${idx}`} />
          <h5 className="my-2">{hotel.name}</h5>
            <Stars star={hotel.star} />
          {hotel.star}.0<span className="text-muted small">・{hotel.reviews} reviews</span>
          <p className="text-secondary">TWD {hotel.price}</p>
        </a>
      </SwiperSlide>
    ));
  }

  const genTabs = () => {

    return locations.map( (loc) => (
      <Tab.Pane key={loc} eventKey={loc}>

        <Swiper className="w-100"
          observer={true}
          observeParents={true}
          slidesPerView={1}
          spaceBetween={10}
          navigation={{
            nextEl: '#swiperHotelNext',
            prevEl: '#swiperHotelPrev',
          }}
          breakpoints={{
            992: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            }
          }}
        >
          {genSlides(groups[loc])}

          <div id="swiperHotelPrev" className="swiper-button-prev swiper-button-round t-33"></div>
          <div id="swiperHotelNext" className="swiper-button-next swiper-button-round t-33"></div>
        </Swiper>

      </Tab.Pane>
    ));
  }

  const genNavs = () => {
    return locations.map((loc) => (
      <Nav.Item key={loc}>
        <Nav.Link eventKey={loc}><h4>{loc}<span className="notation">128</span></h4></Nav.Link>
      </Nav.Item>
    ));
  };

  return (
    <section className="container">
      <h3 className="mb-4">Top Choices</h3>
      <Tab.Container defaultActiveKey="Bali" >
        <Nav variant="tabs" className="mb-4">
          {genNavs()}
        </Nav>

        <Tab.Content>
          {genTabs()}
        </Tab.Content>
      </Tab.Container>
    </section>
  );
}

export default TopChoices;