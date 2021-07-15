import React from 'react';
import Layout from '../layout/Layout';

import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

import TopChoices from '../components/TopChoices';
import PopularDestination from '../components/PopularDest';
import BlogPosts from '../components/BlogPosts';
import Subscription from '../components/Subscription';

import api, { LoadRecommendation } from '../api/mockApi';
//import { blogPosts, hotelTopChoices, popCities } from '../utils/mockdata';

 class HomePage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      blogsPosts: [],
      tops: [],
      popCities: [],
    }
  }

  componentDidMount() {
    api(LoadRecommendation()).then((res) => {
      const { blogs, hotels, locations } = res;
      this.setState({
        blogsPosts: blogs,
        tops: hotels,
        popCities: locations,
      });
      console.log(this.state);
    }).catch((e) => {
      console.error("Failed to get recommendation.");
      console.error(e);
    });
  }

  render() { return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false} />
      </Layout.Header>

      <Layout.Content>

        <Banner />

        <section className="container">
          <h3 className="mb-4">Top Choices</h3>
          <TopChoices data={this.state.tops}/>
        </section>


        <section className="container">
          <h3 className="mb-4">Popular Destinations</h3>
          <PopularDestination cities={this.state.popCities}/>
        </section>

        <section className="mb-5 container">
          <div className="d-flex justify-content-between align-items-start">
            <h3 className="mb-4">Get Inspiration</h3>
            <a href="#" className="btn btn-outline-primary text-uppercase">See More</a>
          </div>
          <BlogPosts posts={this.state.blogsPosts} />
        </section>

        <Subscription size="large" />
        <Footer short={false} />

      </Layout.Content>
    </Layout>
  );}
}

export default HomePage;