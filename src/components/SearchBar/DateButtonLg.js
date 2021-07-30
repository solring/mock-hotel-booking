import React from 'react'
import PropTypes from 'prop-types'

function DateButtonLg(props) {
  const { small, start, end } = props;

  if(small) {
    return (
      <div className="d-md-none text-secondary">
        {start}-{end}
      </div>
    );
  } else return (
    <div className="d-none d-md-flex align-items-center">
      <div className="material-icons pr-lg-3 pr-2">date_range</div>

      <ul className="list-unstyled list-row-divider-info d-none d-lg-flex text-nowrap">
        <li>
          <h5 className="Search__title">check-in</h5>
          <p className="Search__subtitle">{start}</p>
        </li>
        <li>
          <h5 className="Search__title">check-out</h5>
          <p className="Search__subtitle">{end}</p>
        </li>
      </ul>
      <div className="text-left d-lg-none">
        <h5 className="Search__title">check-in / out</h5>
        <p className="Search__subtitle">{start} / {end}</p>
      </div>

    </div>
    );
}

DateButtonLg.propTypes = {
  small: PropTypes.bool,
  start: PropTypes.string,
  end: PropTypes.string,
}

export default DateButtonLg

