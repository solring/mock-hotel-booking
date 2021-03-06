import { useEffect } from 'react';
import Layout from '../layout/Layout';

import Header from '../components/Header/Header';
import Footer from '../components/Footer';

import MemberProfile from '../components/member/MemberProfile';
import ConfirmedBooking from '../components/member/ConfirmedBooking';

import { fetchMemberInfo } from '../features/member/memberSlicer';
import { fetchMemberOrder } from '../features/member/memberOrderSlicer';
import { AJAX_STATUES_LOADING } from '../features/fetchStatus';
import { useSelector, useDispatch } from 'react-redux'

function Page (){

  const dispatch = useDispatch();
  const bookings = useSelector(state => state.morder.orders);
  const memberData = useSelector(state => state.member.info);
  const statusBooking = useSelector(state => state.morder.status);
  const statusMember = useSelector(state => state.member.status);

  useEffect(() => {
      dispatch(fetchMemberInfo("fakeId"));
      dispatch(fetchMemberOrder("fakeId"));
      // eslint-disable-next-line
  },[]);

  const Content = () => {
    return (

    <div className="container">
      <div className="row flex-column-reverse flex-lg-row">
        <div className="col-lg-8">
          <h2 className="h4 my-4">My Bookings</h2>

          <ConfirmedBooking data={bookings} loading={statusBooking === AJAX_STATUES_LOADING}/>
        </div>

        <MemberProfile member={memberData} loading={statusMember === AJAX_STATUES_LOADING} />
      </div>
    </div>
    );
  }

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} />
      </Layout.Header>
      <Layout.Content>
        {Content()}
      </Layout.Content>
      <Footer short={false} />
    </Layout>
  );
}

export default Page;