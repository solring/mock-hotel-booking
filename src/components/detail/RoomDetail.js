import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addBatch } from '../../features/cartSlicer';

import * as links from '../../utils/links';

import NumberPicker from '../NumberPicker';
import BottomModal from '../BottomModal';

import { genGuestStr } from '../../utils/utils';
import { diffDate } from '../../utils/dates';


function RoomList(props) {
  const {rooms, order, onOrderChange} = props;

  const tags = [
    {
      icon: "wifi",
      name: "Wifi"
    },
    {
      icon: "restaurant",
      name: "Breakfast"
    },
    {
      icon: "tv",
      name: "Television"
    },
    {
      icon: "ac_unit",
      name: "Air Conditioner"
    },
    {
      icon: "kitchen",
      name: "Refrigerator"
    },
    {
      icon: "room_service",
      name: "Room Service"
    },
    {
      icon: "local_bar",
      name: "Mini Bar"
    },
    {
      icon: "smoke_free",
      name: "Smoke Free"
    },
  ];

  const genPrices = (price, oldPrice) => {
    if (oldPrice != undefined) {
      return (
        <div>
          <p className="text-secondary text-sub"><del>TWD {oldPrice}</del></p>
          <h6>TWD <span className="text-primary">{price}</span></h6>
        </div>
      );
    } else {
       return <h6>TWD {price}</h6>;
    }
  };

  const genRoom = (room, i) => {
    return (
      <tr key={i} className="row no-gutters">
        <td className="card col-md-6">
          <div className="row no-gutters">
            {/* room picture */}
            <div className="col-6">
              <img className="pic-height-sm Room__cardImg" src={room.img} alt="room picture" />
            </div>
            {/* room desc */}
            <div className="col-6">
              <div className="centering-vertical h-100 Room__cardDesc">
                <h6 className="mt-1">{room.name}</h6>
                <p className="card-text mb-2">1 bed (Queen size)</p>

                <ul className="Room__tagsGroup d-flex flex-lg-column flex-wrap align-items-start">
                  {room.tags.map((t, i) => (
                    <li key={`tag${i}`} className="text-secondary">
                      <span className="material-icons">{tags[t].icon}</span>
                      <span className="d-none d-lg-inline">{tags[t].name}</span>
                    </li>
                  ))}
                </ul>
                <div className="d-block d-md-none">
                  <span className="material-icons">person</span><span className="material-icons">person</span>
                </div>

              </div>
            </div>
          </div>

          {/* HIDDEN when larger than md */}
          <div className="card-footer px-2 py-2 d-md-none border-0 bg-info">
            <div className="row no-gutters">
              <div className="col-6 centering-vertical my-2">
                <NumberPicker number={order[i]}
                  onNumChange={(newNum) => {
                  let newOrder = order.slice();
                  newOrder[i] = newNum;
                  onOrderChange && onOrderChange(newOrder);
                }}/>
              </div>
              <div className="col-6 centering-vertical text-right">
                {genPrices(room.price, room.oldPrice)}
              </div>
            </div>
          </div>
        </td>

        <td className="d-none d-md-flex col-md-2 align-items-center justify-content-center">
          <div>
            <span className="material-icons">person</span><span className="material-icons">person</span>
          </div>
        </td>
        <td className="d-none d-md-flex col-md-2 align-items-center justify-content-center">
          <div className="text-center">
            {genPrices(room.price, room.oldPrice)}
            <p className="card-text">per night</p>
          </div>
        </td>
        <td className="d-none d-md-flex col-md-2 align-items-center justify-content-center">
          <NumberPicker number={order[i]}
            onNumChange={(newNum) => {
            let newOrder = order.slice();
            newOrder[i] = newNum;
            onOrderChange && onOrderChange(newOrder);
          }}/>
        </td>
      </tr>
    );
  };

  return (
    <table className="w-100 list-divider-info mb-5">
    <tbody>
      <tr key="header" className="row no-gutters d-none d-md-flex text-uppercase">
        <th className="col-md-6">room type</th>
        <th className="col-md-2 text-center">sleeps</th>
        <th className="col-md-2 text-center">price</th>
        <th className="col-md-2 text-center">rooms</th>
      </tr>
      {rooms.map(genRoom)}
    </tbody>
    </table>
  );
}

function RoomDetail(props) {
  const {hotelInfo, availableRooms} = props;

  // Redux
  const globalDispatch = useDispatch();
  const searchOptions = useSelector(state => state.search);

  const [cartModal, setCartModal] = useState(false);
  const [order, setOrder] = useState(Array(availableRooms.length).fill(0));

  let totalNights = diffDate(searchOptions.startDate, searchOptions.endDate);
  let totalPrice = availableRooms.map(
    (r, i) => order[i] * r.price * totalNights
  ).reduce((a,b) => a+b, 0);
  let roomNum = order.reduce((a, b)=>a+b, 0);


  // Handlers
  const onClearCart = () => {
    setCartModal(false);
    setOrder(Array(availableRooms.length).fill(0));
  }

  const onOrderChangeHandler = (order) => {
    setOrder(order);
    if (!cartModal) setCartModal(!cartModal);
  };

  const addToCart = () => {
    // set order data
    let arr = [];
    order.map((c, idx) => {
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
    globalDispatch(addBatch(arr));
    // call api and goto comfirmation page
    window.location.href = links.ORDER;
  }

  return (
    <div>

    {/* Room options */}
    <div className="py-4" data-aos="fade-up">
      <h3 className="mb-md-4 mb-3">Select your room</h3>
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
        order={order}
        onOrderChange={onOrderChangeHandler}/>
    </div>

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

export default RoomDetail;