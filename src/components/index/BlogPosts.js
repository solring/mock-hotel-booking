import PropTypes from 'prop-types'

import { Swiper, SwiperSlide } from 'swiper/react';
// swiper react does not include navigation by default
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss'

SwiperCore.use([Navigation]);

function BlogPosts(props) {
  const {posts} = props;
  if (!posts || posts.length === 0) return <div></div>;
  return (
    <Swiper className="w-100"
      observer={true}
      observeParents={true}
      navigation
      slidesPerView={1.5}
      spaceBetween={30}
      breakpoints={{
        768: {
          slidesPerView: 3,
        }
      }}
    >
      {posts.map((post, i) => (
      <SwiperSlide key={`post ${i}`}>
        <img src={post.pic} alt={`post ${i}`} className="rounded-lg pic-height-md" />
        <h4 className="mt-4 mb-2">{post.title}</h4>
        <p className="text-secondary">{post.preview}</p>
      </SwiperSlide>
      ))}
    </Swiper>
  );
}

BlogPosts.propTypes = {
  posts: PropTypes.array,
};

export default BlogPosts;