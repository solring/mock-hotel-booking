import PropTypes from 'prop-types'

import { Nav, Tab } from 'react-bootstrap';

import { Swiper, SwiperSlide } from 'swiper/react';
// swiper react does not include navigation by default
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import { Stars } from '../UtilComponents';

SwiperCore.use([Navigation]);

function TopChoices(props) {
  const { data:hotelTopChoices } = props;
  const locations = Object.keys(hotelTopChoices);

  const genSlides = (group) => {
    return group.map((hotel, idx) => (
      <SwiperSlide key={idx}>
        <a className="d-block text-dark" href={hotel.url}>
          <img className="pic-height-sm rounded-lg" src={hotel.pic} alt={`hotel ${idx}`} />
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
          {genSlides(hotelTopChoices[loc])}

          <div id="swiperHotelPrev" className="swiper-button-prev swiper-button-round t-33"></div>
          <div id="swiperHotelNext" className="swiper-button-next swiper-button-round t-33"></div>
        </Swiper>

      </Tab.Pane>
    ));
  }

  const genNavs = () => {
    return locations.map((loc) => (
      <Nav.Item key={loc}>
        <Nav.Link eventKey={loc}>
          <h4>
            {loc}<sup>{hotelTopChoices[loc].length}</sup>
          </h4>
        </Nav.Link>
      </Nav.Item>
    ));
  };

  return (
    <Tab.Container defaultActiveKey="Bali" >
      <Nav variant="tabs" className="mb-4">
        {genNavs()}
      </Nav>

      <Tab.Content>
        {genTabs()}
      </Tab.Content>
    </Tab.Container>
  );
}

TopChoices.propTypes = {
  data: PropTypes.object,
}

export default TopChoices;