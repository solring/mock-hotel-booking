import Layout from '../layout/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';

import OrderDetail from '../components/OrderDetail';

import { orderDetail } from '../utils/mockdata';

function Content(props) {

  const fields = [
    ["name", "Name", "text"],
    ["email", "Email", "email"],
    ["phone", "Phone (optional)", "tel"],
  ];

  return (
<div className="container pt-0 pt-md-4">
<div className="row no-gutters justify-content-center">
  <div className="col-lg-8">

    <form action="./confirmation.html" className="row flex-md-row-reverse" method="get">
      <div className="col-md-6 px-0 px-sm-3">
        <OrderDetail data={orderDetail}/>
      </div>
      <div className="col-md-6 mb-5">
        <h2 className="mb-4 mt-4 mt-md-0">Reservation Details</h2>
        <ul className="list-unstyled text-secondary">
          {fields.map(([short, title, type]) => (
            <li key={short} className="form-group">
              <label htmlFor={short}>Name</label>
              <input id={short} name={short} type={type} className="form-control form-control-lg" />
            </li>
          ))}
        </ul>
        <button className="btn btn-lg btn-primary btn-block text-uppercase mt-4">reserve</button>
        <a href="#" className="d-block text-center text-sub mt-2">Reserve now, pay at stay</a>
      </div>
    </form>

  </div>
</div>
</div>
  );
}

function Page (){
  return (
    <Layout>
      <Layout.Header>
        <Header simple={false} member={false} />
      </Layout.Header>
      <Layout.Content>
        {Content()}
        <Footer short={true} />
      </Layout.Content>
    </Layout>
  );
}

export default Page;