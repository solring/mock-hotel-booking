import { Swiper, SwiperSlide } from 'swiper/react';
// swiper react does not include navigation by default
import SwiperCore, { Navigation } from 'swiper/core';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import styles from './HotelCard.module.scss';

import { Stars } from './UtilComponents';

SwiperCore.use([Navigation]);

function HotelCard(props) {
  const {room} = props;

  const tags = [
    "Free cencellation",
    "No prepayment"
  ];

  const genTags = (indes) => {
    return indes.map((idx) => (
      <div className="badge badge-info badge-pill mr-1 mb-1">{tags[idx]}</div>
    ));
  };

  const genOldprice = (room) => {
    if (room.oldPrice != undefined) {
      return (
        <div>
          <p className={styles.oldPrice}><del>TWD {room.oldPrice}</del></p>
          <h4 className="fz-hotel-title">TWD <span className="h6-md text-primary">{room.price}</span></h4>
        </div>
      );
    } else {
      return <h4 className="fz-hotel-title">TWD {room.price}</h4>;
    }
  };

  const swiperImages = (images) => {
    if(images.length < 1) return;

    if(images.length === 1)
      return (<img className={`${styles.cardImg} pic-height-sm`} src={images[0]} alt="hotel picture" />);

    return (
    <Swiper
      observer={true}
      observeParents={true}
      slidesPerView={1}
      navigation
    >
      {images.map((image, idx) => (
        <SwiperSlide key={idx}>
          <img className={`${styles.cardImg} pic-height-sm`} src={image} alt="hotel picture"/>
        </SwiperSlide>
      ))}
    </Swiper>
    );
  };

  if (!room) return <div></div>;

  return (
    <li key={room.name}>
      <a href="./detail.html" className={`d-block text-dark card w-100 hover-shadow ${styles.noBorder_sm }`}>
        <div className="row no-gutters">

          <div className="col-5 col-md-4">
            {swiperImages(room.imgs)}
          </div>

          <div className="col-7 col-md-8">
            <div className={`row no-gutters ${styles.cardBody}`}>

              <div className="col-md-7">
                <p className="card-text">
                  <span className="text-primary">{room.location}</span>
                  <span className="d-none d-lg-inline">・{room.distance}km from center</span>
                </p>
                <h4 className="card-title fz-hotel-title">{room.name}</h4>
              </div>

              <div className="col-md-5">
                <div className="d-flex flex-column align-items-md-end align-items-lg-center justify-content-lg-end flex-lg-row">
                    <Stars star={room.star} />
                    <p className="ml-1 text-sub text-secondary">{room.star}.0({room.reviews})</p>
                </div>
              </div>

              <div className="col-md-7">
                <h5 className="card-subtitle">{room.room}</h5>
                <p className="card-text mb-2 mb-md-3">2 guests・1 bed (Queen size)</p>
                <div className="d-none d-md-flex align-items-center flex-wrap">
                  {genTags(room.tags)}
                </div>
              </div>

              <div className="col-md-5">
                <div className="d-flex h-100 flex-column justify-content-end align-items-end">
                  {genOldprice(room)}
                  <p className="card-text d-none d-md-block">per night</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </a>
    </li>
  );
}

export default HotelCard;