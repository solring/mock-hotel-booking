import { Carousel } from 'react-bootstrap';
import SearchBar from './SearchBar';
import banner1 from '../assets/images/index-banner.jpg';
import banner2 from '../assets/images/RangRak.jpg';
import banner3 from '../assets/images/Watana2.jpg';

function Banner(props) {
  const banners = [
    [banner1, "Discover your ideal hotel"],
    [banner2, "Essence of relaxation"],
    [banner3, "Explore fantastic vacation"],
  ]

  const carouselItems = () => {
    return banners.map(([image, title],idx) => (
      <Carousel.Item>
        <img src={image} className="w-100" alt={`carousel pic ${idx}`} />
        <Carousel.Caption>
          <h2 className="fz-title">{title}</h2>
        </Carousel.Caption>
      </Carousel.Item>
      ));
  }

  return (
<div>
  <Carousel id="carouselMain" className={`Banner`} data-ride="carousel" data-aos="fade-in">
    {carouselItems()}
  </Carousel>

  <div className="container-custom-md" data-aos="fade-up"  data-aos-delay="200">
    <SearchBar withReturn={false} simplified={true} />
  </div>
</div>

  );
}

export default Banner;