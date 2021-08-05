import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as constants from '../../utils/constants';

function genLocStr(city, country) {
  if (city === constants.DEFAULT_CITY_STR &&
    country === constants.DEFAULT_COUNTRY_STR)
    return "Destination";
  return `${city}, ${country}`;
}

function DestButton(props) {
  const { city, country, small=false, onChange } = props;
  const [destText, setDestText] = useState("");

  const localOnChange = (e) => {
    setDestText(e.target.value);
    onChange(e.tatget.value);
  };

  useEffect(() => {
    setDestText(genLocStr(city, country))
  }, [city, country])

  if (small) {
    return (
      <div className="d-flex align-items-center">
            <span className="material-icons mr-2">location_on</span>
            <input
              aria-label="destination"
              type="text" placeholder={genLocStr(city, country)}
              value={destText} onChange={localOnChange}
            />
          </div>
    );
  } else {
    return (
      <div>
        <div className="d-none d-md-block">
          <div className="d-flex align-items-center">
            <div className="material-icons pr-lg-3 pr-2">location_on</div>
            <div className="text-left">
              <h5 id="btn-destination" className="Search__title">destination</h5>
              <input className="Search__subtitle" aria-labelledby="btn-destination"
                type="text" placeholder={genLocStr(city, country)}
                value={destText} onChange={localOnChange}
              />
            </div>
          </div>
        </div>
        <div className="d-md-none text-secondary">
          {city}
        </div>
      </div>
    );
  }
}

DestButton.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  small: PropTypes.bool,
};

export default DestButton;

