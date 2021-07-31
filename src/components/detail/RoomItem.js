import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@material-ui/core';

import NumberPicker from '../NumberPicker';
import * as constants from '../../utils/constants';

function LayoutSmall(props) {
  const {img, desc, tags, prices, numPicker} = props;

  return (
    <tr className="row no-gutters">
      <td className="card w-100">
        <div className="row no-gutters">

          {/* room picture */}
          <div className="col-6">
            {img}
          </div>

          {/* room desc */}
          <div className="col-6">
            <div className="centering-vertical h-100 Room__cardDesc">
              {desc}

              {tags}
              <div>
                <span className="material-icons">person</span><span className="material-icons">person</span>
              </div>

            </div>
          </div>
        </div>

        <div className="card-footer px-2 py-2 border-0 bg-info">
          <div className="row no-gutters">
            <div className="col-6 centering-vertical my-2">
              {numPicker}
            </div>
            <div className="col-6 centering-vertical text-right">
              {prices}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

function LayoutLarge(props) {
  const {img, desc, tags, prices, numPicker} = props;

  return (
    <tr className="row no-gutters">
      <td className="card col-md-6">
        <div className="row no-gutters">
          {/* room picture */}
          <div className="col-6">
            {img}
          </div>
          {/* room desc */}
          <div className="col-6">
            <div className="centering-vertical h-100 Room__cardDesc">
              {desc}

              {tags}

            </div>
          </div>
        </div>
      </td>

      <td className="d-flex col-md-2 align-items-center justify-content-center">
        <div>
          <span className="material-icons">person</span><span className="material-icons">person</span>
        </div>
      </td>
      <td className="d-flex col-md-2 align-items-center justify-content-center">
        <div className="text-center">
          {prices}
          <p className="card-text">per night</p>
        </div>
      </td>
      <td className="d-flex col-md-2 align-items-center justify-content-center">
        {numPicker}
      </td>
    </tr>
  );
}

function RoomItem(props) {
  const { room, order, onOrderChange } = props;

  const small = useMediaQuery(`(max-width:${constants.BS_BREAKPOINT_MD})`);

  const tagList = [
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

  const img = (
    <img className="pic-height-sm Room__cardImg" src={room.img} alt="room picture" />
  );

  const tags = (
    <ul className="Room__tagsGroup d-flex flex-lg-column flex-wrap align-items-start">
      {room.tags.map((t, i) => (
        <li key={`tag${i}`} className="text-secondary">
          <span className="material-icons">{tagList[t].icon}</span>
          <span className="d-none d-lg-inline">{tagList[t].name}</span>
        </li>
      ))}
    </ul>
  );

  const desc = (
    <React.Fragment>
      <h6 className="mt-1">{room.name}</h6>
      <p className="card-text mb-2">1 bed (Queen size)</p>
    </React.Fragment>
  );

  const numPicker = (
    <NumberPicker number={order} onNumChange={onOrderChange}/>
  );

  const Layout = small ? LayoutSmall : LayoutLarge;

  return <Layout img={img} desc={desc} tags={tags} numPicker={numPicker} prices={genPrices(room.price, room.oldPrice)} />
}

RoomItem.propTypes = {
  room: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.array,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
  }),
  order: PropTypes.number.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default RoomItem;

