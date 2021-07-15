import { useState, useEffect } from 'react';
import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';

import MemberProfile from '../components/MemberProfile';
import ConfirmedBooking from '../components/ConfirmedBooking';

import api, { GetMemberInfo, GetMemberOrders } from '../api/mockApi';

function Page (){

  const defaultUser = {
    name: "User",
    email: "",
    phone: "",
    pic: "",
    payments: []
  };
  const [bookings, setBooking] = useState([]);
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    if (memberData!==null) return;
    api(GetMemberInfo('fakeId')).then((r) => {
      setMemberData(r.data);
    }).catch(() => {
      console.log("failed to load user info.");
    });

    api(GetMemberOrders('fakeId')).then((r) => {
      setBooking(r.data);
    }).catch(() => {
      console.log("failed to load user orders.");
    });
  });

  const Content = () => {
    return (

    <div className="container">
      <div className="row flex-column-reverse flex-lg-row">
        <div className="col-lg-8">
          <h2 className="h4 my-4">My Bookings</h2>

          <ConfirmedBooking data={bookings} />
        </div>

        <MemberProfile member={
          (memberData === null) ? defaultUser : memberData
        } />
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