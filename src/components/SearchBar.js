import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useMediaQuery } from '@material-ui/core';
import queryString from 'query-string';

import { useSelector, useDispatch } from 'react-redux';
import { update } from '../features/search/searchSlicer';

import NumberPicker from './NumberPicker';
import DatePicker from './DatePicker';

import { SEARCH } from '../utils/links';
import { genGuestStr } from '../utils/utils';
import { serializeDate, parseDate, parseJSDate } from '../utils/dates';
import * as constants from '../utils/constants';

import { suggestLocs } from '../utils/mockdata';


function SearchItemBtn(props) {
  const { title, onToggle } = props;
  return (
  <Dropdown onToggle={onToggle}>
        <Dropdown.Toggle variant="light"  bsPrefix="no-toggle"
          className="btn btn-block text-left pl-3" data-offset="0,8"
        >
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu className="list-unstyled w-100">
          {props.children}
        </Dropdown.Menu>
  </Dropdown>
  );
}

function SearchBar (props) {
  const {
    withReturn,
    simplified,
   } = props;

  const globalDispatch = useDispatch();
  const updateGlobal = (data) => globalDispatch(update(data));
  const searchState = useSelector(state => state.search);
  const { city, country, adult, child, room, startDate, endDate } = searchState;


  // For UI only
  const [touchedCal, setTouchedCal] = useState(false);
  const [touchedGuest, setTouchedGuest] = useState(false);


  let isSmallScreen = useMediaQuery(`(max-width:${constants.BS_BREAKPOINT_MD})`);
  let isMidcreen = useMediaQuery(`(max-width:${constants.BS_BREAKPOINT_XL})`);

  let formStyle = "py-2 py-md-4 Search__bar container";
  if (withReturn) {
    formStyle += " d-none d-md-block";
  }

  // Helpers
  const _getDateStr = (d) => {
    let format = isMidcreen ? 'DD MMM' : 'DD MMMM';
    return parseDate(d).format(format);
  };
  let dateRangeStr = [_getDateStr(startDate), _getDateStr(endDate)];

  // Handlers
  const setDestination = (city, country) => {
    updateGlobal({city, country});
  };

  const setDate = (date1, date2) => {
    let start = date1 ? serializeDate(parseJSDate(date1)): startDate;
    let end = date2 ? serializeDate(parseJSDate(date2)) : endDate;

    updateGlobal({ startDate: start, endDate: end });
    setTouchedCal(true);
  };

  const doSearch = (e) => {
    console.log("doSearch");
    e.preventDefault();
    let searchOptions = {
      country,
      city,
      adult,
      child,
      room,
      startDate,
      endDate,
    };
    let str = queryString.stringify(searchOptions);
    window.location.href = SEARCH + '?' + str;
  };

  // Renderers
  const genLocStr = () => {
    if (city === constants.DEFAULT_CITY_STR &&
      country === constants.DEFAULT_COUNTRY_STR)
      return "Destination";
    return `${city}, ${country}`;
  };

  const returnBtn = () => {
    if (!withReturn) return;
    // Only visible in small screens
    return (
    <a href={SEARCH} className="d-md-none btn container py-3 px-3">
      <span className="material-icons text-dark">arrow_back</span>
      <span className="text-secondary small">
        {city}・{dateRangeStr[0]} - {dateRangeStr[1]}・{genGuestStr(adult, child, room)}
      </span>
    </a>
    );
  };

  const dateBtnLg = () => {
    if(isSmallScreen) {
      return (
        <div className="d-md-none text-secondary">
          {dateRangeStr[0]} / {dateRangeStr[1]}
        </div>
      );
    } else return (
      <div className="d-none d-md-flex align-items-center">
        <div className="material-icons pr-lg-3 pr-2">date_range</div>

        <ul className="list-unstyled list-row-divider-info d-none d-lg-flex">
          <li>
            <h5 className="Search__title">check-in</h5>
            <p className="Search__subtitle">{dateRangeStr[0]}</p>
          </li>
          <li>
            <h5 className="Search__title">check-out</h5>
            <p className="Search__subtitle">{dateRangeStr[1]}</p>
          </li>
        </ul>
        <div className="text-left d-lg-none">
          <h5 className="Search__title">check-in / out</h5>
          <p className="Search__subtitle">{dateRangeStr[0]} / {dateRangeStr[1]}</p>
        </div>

      </div>
      );
  }

  const destBtnLg = () => (
    <div>
      <div className="d-none d-md-block">
        <div className="d-flex align-items-center">
          <div className="material-icons pr-lg-3 pr-2">location_on</div>
          <div className="text-left">
            <h5 className="Search__title">destination</h5>
            <p className="Search__subtitle">{genLocStr()}</p>
          </div>
        </div>
      </div>
      <div className="d-md-none text-secondary">
        {city}
      </div>
    </div>
  );

  const guestBtnLg = () => (
    <div>
    <div className="d-none d-md-flex align-items-center">
      <div className="material-icons pr-lg-3 pr-2">person</div>
      <div className="text-left">
        <h5 className="Search__title">guests</h5>
        <p className="Search__subtitle">
          {genGuestStr(adult, child, room)}
        </p>
      </div>
    </div>
    <div className="d-md-none text-secondary">
        {genGuestStr(adult, child, room)}
    </div>
    </div>
  );

  const destinations = () => {
    return suggestLocs.map(([country, city]) => (
      <Dropdown.Item key={city}>
        <a className="d-block"
          onClick={() => setDestination(country, city)}
        >
          <div className="d-flex align-items-center">
            <div className="material-icons icon-lg mr-2">grade</div>
            <div>
              <p>{country}</p>
              <p className="small">{city}</p>
            </div>
          </div>
        </a>
      </Dropdown.Item>
    ));
  };

  const visitors = () => {
    const numberOptions = [
      ['Adult', adult, "adult"],
      ['Child', child, "child"],
      ['Room', room, "room"],
    ];
    return numberOptions.map((option) => (
      <li key={option[0]} className="dropdown-item">
          <div className="d-flex justify-content-between">
            <p>{option[0]}</p>
            <NumberPicker number={option[1]}
              numSetter={(num) => updateGlobal({ [option[2]]: num })} />
          </div>
      </li>
    ));
  };

  const searchBarSmall = (

  <form className="p-4 Search__bar bg-info rounded-lg" onSubmit={doSearch}>
    <ul className="Search__options flex-column flex-lg-row">
      {/* Field Destination */}
      <li key="destination" className="mb-3 mb-lg-0">
        <SearchItemBtn title={(
          <div>
            <span className="material-icons mr-2">location_on</span>
            {genLocStr()}
          </div>
        )}>
          {destinations()}
        </SearchItemBtn>
      </li>

      {/* Field 2: Calendar */}
      <li key="calendar" className="mb-3 mb-lg-0">
        <DatePicker name="small" handler={setDate}>
          <span className="material-icons mr-2">date_range</span>
          {touchedCal ? `${dateRangeStr[0]} / ${dateRangeStr[1]}` : "Check-in / Check-out"}
        </DatePicker>
      </li>


      {/* Field 3: Guests */}
      <li key="guest" className="mb-3 mb-lg-0">
        <SearchItemBtn onToggle={() => setTouchedGuest(true)}
        title={(
          <div>
            <span className="material-icons mr-2">person</span>
            {touchedGuest ? genGuestStr(adult, child, room) : "Guest"}
          </div>
          )}
        >
          {visitors()}
        </SearchItemBtn>
      </li>

      <li key="button" className="flex-grow-0 flex-shrink-0">
        <button className="btn btn-primary Search__btn btn-block" type="submit">Search</button>
      </li>
    </ul>

  </form>
  );

  const searchBarLarge = (
  <div className="bg-info text-center">
      {returnBtn()}

  <form className={formStyle} onSubmit={doSearch}>

    <ul className="Search__options Search__collapse-sm">

      {/* Field 1: Destination */}
      <li key="destination">
        <SearchItemBtn title={destBtnLg()}>
          {destinations()}
        </SearchItemBtn>
      </li>

      {/* Field 2: Calendar */}
      <li key="datePicker">
        <DatePicker name="large" handler={setDate}>
          {dateBtnLg()}
        </DatePicker>
      </li>


      {/* Field 3: Guests */}
      <li key="guests" className="border-right-0">
        <SearchItemBtn title={guestBtnLg()}>
          {visitors()}
        </SearchItemBtn>
      </li>

      <li key="buttons" className="flex-grow-0 flex-shrink-0 d-none d-md-block">
        <button className="btn btn-primary Search__btn text-uppercase" type="submit">Search</button>
      </li>
    </ul>

  </form>
  </div>
  );

  if (simplified) {
    return searchBarSmall;
  } else {
    return searchBarLarge;
  }
}

export default SearchBar;