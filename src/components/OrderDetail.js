import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { genGuestStr } from '../utils/utils';

function OrderDetail(props) {
  const { data } = props;
  const [ collapseOn, setCollapseOn] = useState(false);

  let collapsed = collapseOn ? "" : "collapsed";
  let total = data.priceItems && data.priceItems.length > 0 ?
    data.priceItems.map((item) => item.number).reduce((a, b) => a+b, 0) :
    0;

  return (
<div className="card rounded-lg-up-md bg-info">
  <a className={`p-3 d-block d-md-none ${collapsed}`} onClick={() => setCollapseOn(!collapseOn)}>
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
  </a>
  <Collapse in={collapseOn} className="Order__detail bg-info w-100 collapse-absolute collapse-disabled-md">
    <div> {/* essential for current react-bootstrap collapse */}
    <ul className="list-unstyled list-divider-white py-3 py-md-4 mx-3 mx-md-4 rounded-bottom border-top border-light">
      <li key="detail">
        <h6 className="mb-3">Booking details</h6>
        <p className="text-sub text-secondary">{data.duration.start} - {data.duration.end}・{data.duration.night} nights</p>
        <p className="text-sub text-secondary">{genGuestStr(data.guests.adult,data.guests.child,data.guests.room)}</p>
        <p className="text-sub text-secondary">{data.hotelName}</p>
      </li>
      <li key="price">
        <h6 className="mb-3">Price summary</h6>
        <ul className="list-unstyled">
          {data.priceItems.map((item) => (
            <li key={item.name} className="d-flex justify-content-between">
              <p className="text-sub text-secondary">{item.name}</p>
              <p className="text-sub text-secondary">TWD {item.number}</p>
            </li>
          ))}
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

export default OrderDetail;