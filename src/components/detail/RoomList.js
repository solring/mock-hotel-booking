import React from 'react';
import PropTypes from 'prop-types';

import RoomItem from './RoomItem';

function RoomList(props) {
  const {rooms, orders, onOrderChange} = props;

  return (
    <table className="w-100 list-divider-info mb-5">
    <tbody>
      <tr key="header" className="row no-gutters d-none d-md-flex text-uppercase">
        <th className="col-md-6">room type</th>
        <th className="col-md-2 text-center">sleeps</th>
        <th className="col-md-2 text-center">price</th>
        <th className="col-md-2 text-center">rooms</th>
      </tr>
      {rooms.map((room, i) =>
        <RoomItem
          room={room}
          key={i}
          order={orders[i]}
          onOrderChange={(num) => {
            let newOrders = orders.slice();
            newOrders[i] = num;
            onOrderChange(newOrders);
          }}
        />
      )}
    </tbody>
    </table>
  );
}

RoomList.propTypes = {
  rooms: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default RoomList;

