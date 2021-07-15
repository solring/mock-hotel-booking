import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addBatch } from '../features/cart/cartSlicer';

import { Swiper, SwiperSlide } from 'swiper/react';
// swiper react does not include navigation by default
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss'

import api, { LoadRooms } from '../api/mockApi';
import * as links from '../utils/links';

import NumberPicker from './NumberPicker';
import BottomModal from './BottomModal';

import { genGuestStr } from '../utils/utils';
import { diffDate } from '../utils/dates';


SwiperCore.use([Navigation])

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
              <div className="col-6 centering-vertical my-2" data-toggle="collapse">
                <NumberPicker number={order[i]}
                  numSetter={(newNum) => {
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
            numSetter={(newNum) => {
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
  const {hotelPics, hotelInfo} = props;

  // Redux
  const globalDispatch = useDispatch();
  const searchOptions = useSelector(state => state.search);

  const [availableRooms, setAvailableRooms] = useState([]);
  const [cartModal, setCartModal] = useState(false);
  const [order, setOrder] = useState(Array(availableRooms.length).fill(0));

  let totalNights = diffDate(searchOptions.startDate, searchOptions.endDate);
  let totalPrice = availableRooms.map(
    (r, i) => order[i] * r.price * totalNights
  ).reduce((a,b) => a+b, 0);
  let roomNum = order.reduce((a, b)=>a+b, 0);

    // Init
    useEffect(() => {
      if (availableRooms.length!==0) return;
      api(LoadRooms('fakeId')).then((r) => {
        setAvailableRooms(r.data);
        setOrder(Array(r.data.length).fill(0));
      }).catch(() => {
        console.log("failed to load hotel rooms.");
      });
    });

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


  // ===== Rengerers & Components =====
  const picGrid = (
    <div className="row Hotel__picGroup no-gutters d-none d-md-flex" data-aos="fade-down">
      <div className="col-md-7 h-100">
        <div className="pic-fill-container">
          <img src={hotelPics[0] ? hotelPics[0] : ""} alt="room pic 1" />
        </div>
      </div>
      <div className="col-md-5 h-100 d-none d-md-block pl-md-1 pl-lg-2">
        <div className="row h-100 no-gutters">
          <div className="col-12 h-50 pb-md-1 pb-lg-2">
            <div className="pic-fill-container">
              <img src={hotelPics[1] ? hotelPics[1] : ""} alt="room pic 2" />
            </div>
          </div>
          <div className="col-5 h-50">
            <div className="pic-fill-container">
              <img src={hotelPics[2] ? hotelPics[2] : ""} alt="room pic 3" />
            </div>
          </div>
          <div className="col-7 h-50 pl-sm-1 pl-lg-2 d-flex flex-column">
            <div className="h-75 pb-sm-1 pb-lg-2">
              <div className="pic-fill-container">
                <img src={hotelPics[3] ? hotelPics[3] : ""} alt="room pic 4" />
              </div>
            </div>
            <button className="btn btn-dark btn-block h-25 text-uppercase p-0 text-sub">See All 10 photos</button>
          </div>
        </div>
      </div>
    </div>
    );

  const picSwiper = (
    <Swiper className="Hotel__picSwiper d-md-none"
      observer={true}
      observeParents={true}
      slidesPerView={1}
      navigatio
    >
      {hotelPics.map((img, i) => (
        <SwiperSlide key={i}>
          <div className="pic-fill-container"><img src={img} alt={`room picture ${i}`} /></div>
        </SwiperSlide>
      ))}
    </Swiper>
  )

  return (
  <div className="pt-md-4 Hotel__pageContainer">

    {picGrid}
    {picSwiper}

    {/* Hotel Description */}
    <div className="px-3 px-sm-0" data-aos="fade-up">
      <div className="d-flex flex-column flex-md-row align-items-md-center pt-md-4 pt-3">
        <h2 className="mr-3">{hotelInfo.name}</h2>
        <div className="align-icons">
          <span className="material-icons align-center">
            {"star ".repeat(hotelInfo.star)}
          </span>
          <span className="text-secondary text-sub">{hotelInfo.star}.0({hotelInfo.review})</span>
        </div>
      </div>
      <p className="mb-md-4 mb-3"><a href="#" className="text-primary text-sub">{hotelInfo.addr}</a></p>
      <p className="text-secondary mb-6">{hotelInfo.desc}</p>
    </div>

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