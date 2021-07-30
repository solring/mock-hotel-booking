import { Swiper, SwiperSlide } from 'swiper/react';
// swiper react does not include navigation by default
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss'

SwiperCore.use([Navigation])

export default (props) => {
  const {hotelPics, hotelInfo} = props;

  // ===== Rengerers & Components =====
  const picGrid = (
    <div className="row Hotel__picGroup no-gutters d-none d-md-flex" data-aos="fade-down">
      <div className="col-md-7 h-100">
        <div className="pic-fill-container">
          <img src={hotelPics[0] ? hotelPics[0] : ""} alt="room pic 1" />
        </div>
      </div>
      <div className="col-md-5 h-100 d-none d-md-block pl-md-1 pl-lg-2">
        <div className="row h-100 no-gutters">
          <div className="col-12 h-50 pb-md-1 pb-lg-2">
            <div className="pic-fill-container">
              <img src={hotelPics[1] ? hotelPics[1] : ""} alt="room pic 2" />
            </div>
          </div>
          <div className="col-5 h-50">
            <div className="pic-fill-container">
              <img src={hotelPics[2] ? hotelPics[2] : ""} alt="room pic 3" />
            </div>
          </div>
          <div className="col-7 h-50 pl-sm-1 pl-lg-2 d-flex flex-column">
            <div className="h-75 pb-sm-1 pb-lg-2">
              <div className="pic-fill-container">
                <img src={hotelPics[3] ? hotelPics[3] : ""} alt="room pic 4" />
              </div>
            </div>
            <button className="btn btn-dark btn-block h-25 text-uppercase p-0 text-sub">See All 10 photos</button>
          </div>
        </div>
      </div>
    </div>
    );

  const picSwiper = (
    <Swiper className="Hotel__picSwiper d-md-none"
      observer={true}
      observeParents={true}
      slidesPerView={1}
      navigation
    >
      {hotelPics.map((img, i) => (
        <SwiperSlide key={i}>
          <div className="pic-fill-container"><img src={img} alt={`room picture ${i}`} /></div>
        </SwiperSlide>
      ))}
    </Swiper>
  )

  return (
    <div data-aos="fade-up">

    {picGrid}
    {picSwiper}

    {/* Hotel Description */}
    <div className="px-3 px-sm-0">
      <div className="d-flex flex-column flex-md-row align-items-md-center pt-md-4 pt-3">
        <h2 className="mr-3">{hotelInfo.name}</h2>
        <div className="align-icons">
          <span className="material-icons align-center">
            {"star ".repeat(hotelInfo.star)}
          </span>
          <span className="text-secondary text-sub">{hotelInfo.star}.0({hotelInfo.review})</span>
        </div>
      </div>
      <p className="mb-md-4 mb-3"><a href="#" className="text-primary text-sub">{hotelInfo.addr}</a></p>
      <p className="text-secondary mb-6">{hotelInfo.desc}</p>
    </div>
    </div>
  );
};