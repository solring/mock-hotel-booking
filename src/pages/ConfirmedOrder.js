import { useEffect, useState } from 'react';
import qs from 'query-string';
import Layout from '../layout/Layout';

import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

import { INDEX } from '../utils/links';

import { useSelector, useDispatch } from 'react-redux';
import { switchFetchStatus } from '../features/fetchStatus';
import { fetchOrders } from '../features/orderSlicer';

function Page (props){

  const { order:orderId } = qs.parse(props.location.search);

  const member = useSelector(state => state.order.user);
  const order = useSelector(state => state.order.orders[0]);
  const status = useSelector(state => state.order.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders(orderId));
  },[]);


  const Content = () => {
    if (!order || order.length === 0 || Object.keys(member).length === 0) return <div></div>;

    return (
  <div className="container">
    <div className="row no-gutters justify-content-center">
      <div className="col-lg-8">

        <ul className="list-divider-info list-unstyled">
          <li key="title">
            <h2 className="mt-4">Reservation received!</h2>
          </li>
          <li key="guest">
            <dl className="row no-gutters">
              <dt className="col-3">Guest</dt>
              <dd className="col-9 text-secondary">{member.name}</dd>

              <dt className="col-3">Email</dt>
              <dd className="col-9 text-secondary">
                {member.email}
                <a href="#" className="small">  Confirmation email sent to this address</a>
              </dd>

              <dt className="col-3">Phone</dt>
              <dd className="col-9 text-secondary">{member.phone}</dd>
            </dl>
          </li>

          <li key="order">
            <dl className="row no-gutters">
              <dt className="col-3">Room</dt>
              <dd className="col-9 text-secondary">{order.room} / {order.duration.night} nights</dd>
            </dl>
          </li>
          <li>
            <dl className="row no-gutters">
              <dt className="col-3">Check-In</dt>
              <dd className="col-9 text-secondary">{order.duration.start}</dd>

              <dt className="col-3">Check-Out</dt>
              <dd className="col-9 text-secondary">{order.duration.end}</dd>
            </dl>
          </li>
          <li className="row no-gutters flex-column flex-md-row justify-content-between justify-content-md-end mb-5">
            <a href="#" className="btn btn-outline-primary btn-lg text-uppercase mr-md-2">edit reservation</a>
            <a href={INDEX} className="btn btn-primary btn-lg text-uppercase mt-2 mt-md-0">Homepage</a>
          </li>
        </ul>

      </div>
    </div>
    </div>
    );
  }

  const failMsg = (
    <div className="container">
      <div className="alert alert-primary">
        Oops! Something is wrong loading the order. Please refresh the page.
      </div>
    </div>
  )

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} />
      </Layout.Header>
      <Layout.Content>
        {switchFetchStatus(status, Content(), <Loading />, failMsg)}
      </Layout.Content>
      <Footer short={true} />
    </Layout>
  );
}

export default Page;