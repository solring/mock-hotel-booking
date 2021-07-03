import Layout from '../layout/Layout';

import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

import TopChoices from '../components/TopChoices';
import PopularDestination from '../components/PopularDest';
import Subscription from '../components/Subscription';

function HomePage (){
  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={true} />
      </Layout.Header>
      <Layout.Content>
        <Banner />
        <TopChoices />
        <PopularDestination />
        <Subscription size="large" />

        <Footer short={false} />
      </Layout.Content>
    </Layout>
  );
}

export default HomePage;