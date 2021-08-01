import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import banner1 from '../../assets/images/index-banner.jpg';
import banner2 from '../../assets/images/RangRak.jpg';
import banner3 from '../../assets/images/Watana2.jpg';

function Banner(props) {
  const banners = [
    [banner1, "Discover your ideal hotel"],
    [banner2, "Essence of relaxation"],
    [banner3, "Explore fantastic vacation"],
  ];

  const [load, setLoad] = useState(false);

  const carouselItems = () => {
    return banners.map(([image, title],idx) => (
      <Carousel.Item key={idx}>
        <LazyLoadImage
          alt={`carousel ${idx}`}
          src={image} // use normal <img> attributes as props
          width={`100%`}
          effect="blur"
          afterLoad={() => setLoad(true)}
        />

        <Carousel.Caption>
          <h2 className="fz-title">{title}</h2>
        </Carousel.Caption>
      </Carousel.Item>
    ));
  }

  return (
    <div>
      <Carousel
        id="carouselMain"
        className={`Banner animate-onload animate-fade-up animate-delay-500 ${load ? "show" : ""}`}
      >
        {carouselItems()}
      </Carousel>

      <div className="container-custom-md">
        <SearchBar withReturn={false} simplified={true} />
      </div>
    </div>

  );
}

export default Banner;