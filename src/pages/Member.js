import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';

import MemberProfile from '../components/MemberProfile';
import ConfirmedBooking from '../components/ConfirmedBooking';

import { bookings, memberData } from '../utils/mockdata';

function Page (){

  const Content = () => {
    return (

    <div className="container">
      <div className="row flex-column-reverse flex-lg-row">
        <div className="col-lg-8">
          <h2 className="h4 my-4">My Bookings</h2>

          <ConfirmedBooking data={bookings} />
        </div>

        <MemberProfile member={memberData} />
      </div>
    </div>
    );
  }

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={true} />
      </Layout.Header>
      <Layout.Content>
        {Content()}
      </Layout.Content>
      <Footer short={false} />
    </Layout>
  );
}

export default Page;