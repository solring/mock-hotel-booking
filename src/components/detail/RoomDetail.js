import PropTypes from 'prop-types'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Reveal } from 'react-reveal';

import { add } from '../../features/cartSlicer';

import RoomList from './RoomList';
import BottomModal from '../BottomModal';

import { genGuestStr } from '../../utils/utils';
import { diffDate } from '../../utils/dates';
import * as links from '../../utils/links';

function RoomDetail(props) {
  const {hotelInfo, availableRooms} = props;

  // Redux
  const globalDispatch = useDispatch();
  const searchOptions = useSelector(state => state.search);

  const [cartModal, setCartModal] = useState(false);
  const [orders, setOrders] = useState(Array(availableRooms.length).fill(0));

  let totalNights = diffDate(searchOptions.startDate, searchOptions.endDate);
  let totalPrice = availableRooms.map(
    (r, i) => orders[i] * r.price * totalNights
  ).reduce((a,b) => a+b, 0);
  let roomNum = orders.reduce((a, b)=>a+b, 0);


  // Handlers
  const onClearCart = () => {
    setCartModal(false);
    setOrders(Array(availableRooms.length).fill(0));
  }

  const onOrderChangeHandler = (order) => {
    setOrders(order);
    if (!cartModal) setCartModal(!cartModal);
  };

  const addToCart = () => {
    // set order data
    let arr = [];
    orders.map((c, idx) => {
      if (c>0) {
        let room = availableRooms[idx];
        arr.push({
          hotel: hotelInfo.name,
          room: room.name,
          number: c,
          price: room.price,
          startDate: searchOptions.startDate,
          endDate: searchOptions.endDate,
          adult: searchOptions.adult,
          child: searchOptions.child,
          night: totalNights
        });
      }
    })
    globalDispatch(add(arr));
    // call api and goto comfirmation page
    window.location.href = links.ORDER;
  }

  return (
    <div>
      {/* Room options */}
      <Reveal effect="fadeInUp" duration={1500}>
        <div className="py-4 mx-3 mx-md-0">
          <h3 className="mb-3 mb-md-4">Select your room</h3>
          <div className="d-none d-md-flex align-items-center mb-md-5">
            <div className="div-badge bg-info">{searchOptions.city}, {searchOptions.country}</div>
            <div className="div-badge bg-info">{searchOptions.startDate} - {searchOptions.endDate}</div>
            <div className="div-badge bg-info">
              {genGuestStr(searchOptions.adult, searchOptions.child, searchOptions.room)}
            </div>
            <a href="#" className="text-uppercase text font-weight-bold ml-4">edit detail</a>
          </div>
          <RoomList
            rooms={availableRooms}
            orders={orders}
            onOrderChange={onOrderChangeHandler}
          />
        </div>
      </Reveal>

      {/* CartModal*/}
      <BottomModal
        collapse={true}
        toggle={cartModal}
        clearHandler={onClearCart}
        confirmText="Reserve"
        confirmAction={addToCart}
        direction="row"
      >
        <p className="small text-secondary">{roomNum} room・{totalNights} night</p>
        <h4 className="mb-4">TWD {totalPrice}</h4>
      </BottomModal>

    </div>
  );
}

RoomDetail.propTypes = {
  hotelInfo: PropTypes.object.isRequired,
  availableRooms: PropTypes.array.isRequired,
}

export default RoomDetail;