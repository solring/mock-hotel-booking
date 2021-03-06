import PropTypes from 'prop-types'

import { useState } from 'react';
import { Collapse } from 'react-bootstrap';

import { genGuestStr } from '../../utils/utils';
import dayjs from 'dayjs';

function OrderDetail(props) {
  const { orders } = props;
  const [ collapseOn, setCollapseOn] = useState(false);

  let collapsed = collapseOn ? "" : "collapsed";
  let subtotal = orders && orders.length > 0 ?
    orders.map((item) => item.number * item.price * item.night).reduce((a, b) => a+b, 0) :
    0;
  let vat = Math.round(subtotal * 0.07);
  let serviceCharge = Math.round(subtotal * 0.1);
  let total = subtotal + vat + serviceCharge;

  const formatDate = (longStr) => {
    return dayjs(longStr).format('DD MMMM');
  }

  const TitleBtn = (props) => (
    <button className={`btn btn-link p-3 d-block d-md-none ${collapsed}`} onClick={() => setCollapseOn(!collapseOn)}>
      <div className="d-flex justify-content-between">
        <p className="text-dark animate-title-fadeout">
          <span className="text-sub text-secondary mr-3">Total</span>
          <span className="font-weight-bold">TWD {total}</span>
        </p>
        <p className="text-primary text-uppercase font-weight-bold">
          Detail
          <span className="material-icons icon-lg animate-icon animate-icon-spin">keyboard_arrow_up</span>
        </p>
      </div>
    </button>
  );

  return (
<div className="card rounded-lg-up-md bg-info">
  <TitleBtn />
  <Collapse in={collapseOn} className="Order__detail bg-info w-100 collapse-absolute collapse-disabled-md">
    <div> {/* essential for current react-bootstrap collapse */}
    <ul className="list-unstyled list-divider-white py-3 py-md-4 mx-3 mx-md-4 rounded-bottom border-top border-light">
      <li key="detail">
        <h6 className="mb-3">Booking details</h6>
        <ul className="list-unstyled list-divider-white">
          {orders && orders.map((order, i) => (
            <li className="mb-3" key={i}>
              <p className="text-sub text-secondary">{formatDate(order.startDate)} - {formatDate(order.endDate)}???{order.night} night(s)</p>
              <p className="text-sub text-secondary">{genGuestStr(order.adult, order.child, order.room)}</p>
              <p className="text-sub text-secondary">{order.hotel}</p>
              <p className="text-sub text-secondary">{order.room}</p>
            </li>
          ))}
        </ul>
      </li>
      <li key="price">
        <h6 className="mb-3">Price summary</h6>
        <ul className="list-unstyled">
          {orders && orders.map((item, i) => (
            <li key={i} className="d-flex justify-content-between">
              <p className="text-sub text-secondary">{item.room}</p>
              <p className="text-sub text-secondary">
                TWD {item.price * item.number * item.night}
              </p>
            </li>
          ))}
          <li key="vat" className="d-flex justify-content-between">
            <p className="text-sub text-secondary">VAT(7%)</p>
            <p className="text-sub text-secondary">
              TWD {vat}
            </p>
          </li>
          <li key="serviceCharge" className="d-flex justify-content-between">
            <p className="text-sub text-secondary">Property service charge</p>
            <p className="text-sub text-secondary">
              TWD {serviceCharge}
            </p>
          </li>
        </ul>
      </li>
      <li key="total" className="d-flex justify-content-between">
        <p className="text-sub text-secondary">Total</p>
        <p className="font-weight-bold">TWD {total}</p>
      </li>
    </ul>
    </div>
  </Collapse>
</div>
  )
}

OrderDetail.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      hotel: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      adult: PropTypes.number.isRequired,
      child: PropTypes.number.isRequired,
      night: PropTypes.number.isRequired,
    }),
  ),
}

export default OrderDetail;