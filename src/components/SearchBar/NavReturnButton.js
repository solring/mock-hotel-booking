import React from 'react';
import PropTypes from 'prop-types';
import { genGuestStr } from '../../utils/utils';

function goBack() {
  window.history.back();
}

function NavReturnButton(props) {
  const { city, start, end, adult, child, room } = props;
  return (
    <a
      className="d-md-none btn container py-3 px-3"
      onClick={goBack}
    >
      <span className="material-icons text-dark mr-1">arrow_back</span>
      <span className="text-secondary small">
        {city}・{start} - {end}・{genGuestStr(adult, child, room)}
      </span>
    </a>
  )
}

NavReturnButton.propTypes = {
  city: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  adult: PropTypes.number,
  child: PropTypes.number,
  room: PropTypes.number,
};

export default NavReturnButton;

