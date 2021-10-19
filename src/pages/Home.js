import React from 'react';
import { Reveal } from 'react-reveal';

import Layout from '../layout/Layout';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

import Banner from '../components/index/Banner';
import TopChoices from '../components/index/TopChoices';
import PopularDestination from '../components/index/PopularDest';
import BlogPosts from '../components/index/BlogPosts';

import Subscription from '../components/Subscription';

import api, { LoadRecommendation } from '../api/mockApi';

class HomePage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      blogsPosts: [],
      tops: {},
      popCities: [],
      animation: false,
    }
  }

  componentDidMount() {
    api(LoadRecommendation()).then((res) => {
      const { blogs, hotels, locations } = res;
      this.setState({
        blogsPosts: blogs,
        tops: hotels,
        popCities: locations,
        animation: true,
      });
      console.log(this.state);

    }).catch((e) => {
      console.error("Failed to get recommendation.");
      console.error(e);
    });
  }

  render() {
    const {
      blogsPosts,
      tops,
      popCities,
      animation,
    } = this.state;

    return (
      <Layout>
        <Layout.Header>
          <Header simple={false} />
        </Layout.Header>
        <Layout.Content>

          <Banner />

          <Reveal effect="fadeInUp" when={animation}>
            <section className="container" style={{ minHeight: "400px" }}>
              <h3 className="mb-4">Top Choices</h3>
              <TopChoices data={tops}/>
            </section>
          </Reveal>

          <Reveal effect="fadeInUp" when={animation}>
          <section className="container">
            <h3 className="mb-4">Popular Destinations</h3>
            <PopularDestination cities={popCities}/>
          </section>
          </Reveal>

          <Reveal effect="fadeInUp" when={animation}>
          <section className="mb-5 container">
            <div className="d-flex justify-content-between align-items-start">
              <h3 className="mb-4">Get Inspiration</h3>
              <a href="/blogs" className="btn btn-outline-primary text-uppercase">See More</a>
            </div>
            <BlogPosts posts={blogsPosts} />
          </section>
          </Reveal>

          <Reveal effect="fadeInUp" when={animation}>
            <Subscription size="large" />
          </Reveal>

          <Footer short={false} />

        </Layout.Content>
      </Layout>
  );}
}

export default HomePage;