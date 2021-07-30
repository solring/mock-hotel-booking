import React from 'react';
import PropTypes from 'prop-types';

import { genGuestStr } from '../../utils/utils';

function GuestButtonLg(props) {
  const { adult, child, room, short } = props;

  const guestStr = short ?
      `${adult}+${child}・${room} room(s)`:
      genGuestStr(adult, child, room);

  return (
    <div>
    <div className="d-none d-md-flex align-items-center">
      <div className="material-icons pr-lg-3 pr-2">person</div>
      <div className="text-left">
        <h5 className="Search__title">guests</h5>
        <p className="Search__subtitle">
          {guestStr}
        </p>
      </div>
    </div>
    <div className="d-md-none text-secondary">
        {guestStr}
    </div>
    </div>
  );
}

GuestButtonLg.propTypes = {
  adult: PropTypes.string,
  child: PropTypes.string,
  room: PropTypes.string,
  short: PropTypes.bool,
};

export default GuestButtonLg;

