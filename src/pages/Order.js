import { useState } from 'react';
import qs from 'query-string';
import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import OrderDetail from '../components/order/OrderDetail';

import { useSelector, useDispatch } from 'react-redux'
import { submitOrder } from '../features/cartSlicer';
import {
  AJAX_STATUES_LOADING,
  AJAX_STATUES_FAILED,
} from '../features/fetchStatus';

import { CONFIRMATION } from '../utils/links';

function OrderPage(props){

  const [name, setName] = useState("");
  const [email, setEmail]  = useState("");
  const [phone, setPhone] = useState("");
  const [validating, setValidating] = useState("");

  const fields = [
    ["name", "Name", "text", name, setName],
    ["email", "Email", "email", email, setEmail],
    ["phone", "Phone (optional)", "tel", phone, setPhone],
  ];

  // redux
  const orders = useSelector(state => state.cart.orders);
  const status = useSelector(state => state.cart.status);
  const globalDispatch = useDispatch();

  const doReserve = async (e) => {
    e.preventDefault();
    setValidating('was-validated');

    if(e.target.checkValidity() === false) return;

    if(status !== AJAX_STATUES_LOADING) {
      let res = await globalDispatch(submitOrder(orders))
      console.log(res);
      if(res.payload.order)
        window.location.href = CONFIRMATION + "?" + qs.stringify({order: res.payload.order});
    }
  }

  const Form = (
    <form className={validating} onSubmit={doReserve} noValidate>
      <h2 className="mb-4 mt-4 mt-md-0">Reservation Details</h2>
      <ul className="list-unstyled text-secondary">
        {fields.map(([short, title, type, reactValue, reactSet]) => (
          <li key={short} className="form-group">
            <label htmlFor={short}>{title}</label>
            <input id={short} name={short} type={type}
              className="form-control form-control-lg"
              required={(short === 'phone') ? false : true}
              value={reactValue} onChange={(e) => reactSet(e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button className="btn btn-lg btn-primary btn-block text-uppercase mt-4" type="submit">reserve</button>
      <a href="#" className="d-block text-center text-sub mt-2">Reserve now, pay at stay</a>
    </form>
  );

  const failMsg = (
    <div className="alert alert-danger mt-4">
      Oops! There is something wrong with the server. Please submit later.
    </div>
  );

  const Content = (
  <div className="container pt-0 pt-md-4">
  <div className="row no-gutters justify-content-center">
    <div className="col-lg-8">

      <div className="row flex-md-row-reverse">
        <div className="col-md-6 px-0 px-sm-3">

          <OrderDetail orders={orders}/>
        </div>
        <div className="col-md-6 mb-5">
          {status === AJAX_STATUES_LOADING ?  <Loading /> : Form }
          {status === AJAX_STATUES_FAILED && failMsg}
        </div>
      </div>

    </div>
  </div>
  </div>
  );

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false} />
      </Layout.Header>
      <Layout.Content>
        {Content}
      </Layout.Content>
      <Footer short={true} />
    </Layout>
  );
}

export default OrderPage;