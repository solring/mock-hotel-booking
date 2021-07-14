import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';
import OrderDetail from '../components/OrderDetail';

import { useDispatch } from 'react-redux'
import { clear } from '../features/cart/cartSlicer';

import { CONFIRMATION } from '../utils/links';

import { orderDetail } from '../utils/mockdata';

function OrderPage(props){

  // redux
  const globalDispatch = useDispatch();

  const doReserve = () => {
    // call async api
    // mock: go to confirmation page directly.
    globalDispatch(clear());
    window.location.href = CONFIRMATION;
  }

  const Content = () => {

    const fields = [
      ["name", "Name", "text"],
      ["email", "Email", "email"],
      ["phone", "Phone (optional)", "tel"],
    ];

    return (
  <div className="container pt-0 pt-md-4">
  <div className="row no-gutters justify-content-center">
    <div className="col-lg-8">

      <div className="row flex-md-row-reverse">
        <div className="col-md-6 px-0 px-sm-3">
            <OrderDetail data={orderDetail}/>
        </div>
        <div className="col-md-6 mb-5">
          <form onClick={doReserve}>
            <h2 className="mb-4 mt-4 mt-md-0">Reservation Details</h2>
            <ul className="list-unstyled text-secondary">
              {fields.map(([short, title, type]) => (
                <li key={short} className="form-group">
                  <label htmlFor={short}>{title}</label>
                  <input id={short} name={short} type={type} className="form-control form-control-lg" />
                </li>
              ))}
            </ul>
            <button className="btn btn-lg btn-primary btn-block text-uppercase mt-4">reserve</button>
            <a href="#" className="d-block text-center text-sub mt-2">Reserve now, pay at stay</a>
          </form>
        </div>
      </div>

    </div>
  </div>
  </div>
    );
  }

  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false} />
      </Layout.Header>
      <Layout.Content>
        {Content()}
      </Layout.Content>
      <Footer short={true} />
    </Layout>
  );
}

export default OrderPage;