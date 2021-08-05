import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { useMediaQuery } from '@material-ui/core';
import queryString from 'query-string';

import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../features/searchSlicer';
import { reset } from '../../features/hotelSlicer';

import NumberPicker from '../NumberPicker';
import DatePicker from '../DatePicker';
import SearchItemBtn from './SearchItemBtn';
import DateButtonLg from './DateButtonLg';
import NavReturnButton from './NavReturnButton';
import DestButton from './DestButton';
import GuestButtonLg from './GuestButtonLg';

import api, { LoadRecommendLocs } from '../../api/mockApi';
import { SEARCH } from '../../utils/links';
import { genGuestStr } from '../../utils/utils';
import { serializeDate, parseDate, parseJSDate } from '../../utils/dates';
import * as constants from '../../utils/constants';


function SearchBar (props) {
  const { withReturn, simplified } = props;

  const globalDispatch = useDispatch();
  const updateGlobal = (data) => globalDispatch(update(data));
  const searchState = useSelector(state => state.search);
  const { city, country, adult, child, room, startDate, endDate } = searchState;

  // For UI only
  const [touchedCal, setTouchedCal] = useState(false);
  const [touchedGuest, setTouchedGuest] = useState(false);
  const [suggestLocs, setSuggestLocs] = useState([]);

  useEffect(() => {
    api(LoadRecommendLocs()).then((res) => {
      setSuggestLocs(res.data);
    }).catch((e) => {
      console.error("No suggested destinations.");
    });
  }, []);

  let isSmallScreen = useMediaQuery(`(max-width:${constants.BS_BREAKPOINT_MD})`);
  let isMidScreen = useMediaQuery(`(max-width:${constants.BS_BREAKPOINT_LG})`);
  let isLargeScreen = useMediaQuery(`(max-width:${constants.BS_BREAKPOINT_XL})`);

  // Helpers
  const getDateStr = (d) => {
    return parseDate(d).format('DD MMM');
  };

  const getDateStrLg = (d) => {
    let format = isLargeScreen ? 'DD MMM' : 'DD MMMM';
    return parseDate(d).format(format);
  };

  let dateRangeStrLg = [getDateStrLg(startDate), getDateStrLg(endDate)];
  let dateRangeStr = [getDateStr(startDate), getDateStr(endDate)];

  let formStyle = "py-2 py-md-4 Search__bar container";
  if (withReturn) {
    formStyle += " d-none d-md-block";
  }

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
    e.preventDefault();
    // clear previous search result
    globalDispatch(reset());

    // make query string
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
  const destinations = () => {
    return suggestLocs.map(([country, city]) => (
      <Dropdown.Item
        key={city}
        onClick={() => setDestination(country, city)}
      >
        <div className="d-flex align-items-center">
          <div className="material-icons icon-lg mr-2">grade</div>
          <div>
            <p>{country}</p>
            <p className="small">{city}</p>
          </div>
        </div>
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
      <Dropdown.Item as="div" key={option[0]}>
        <div className="d-flex justify-content-between">
          <p>{option[0]}</p>
          <NumberPicker number={option[1]}
            onNumChange={(num) => updateGlobal({ [option[2]]: num })} />
        </div>
      </Dropdown.Item>
    ));
  };

  /**
   * Search Bar: Small layout
   */
  const searchBarSmall = (

  <form className="p-4 Search__bar bg-info rounded-lg" onSubmit={doSearch}>
    <ul className="Search__options flex-column flex-lg-row">
      {/* Field Destination */}
      <li key="destination" className="mb-3 mb-lg-0">
        <SearchItemBtn label="dest" title={
          <DestButton
            city={city}
            country={country}
            small={true}
            onChange={() => {}} // TODO: should connect to auto complete or othre queries.
          />
        }>
          {destinations()}
        </SearchItemBtn>
      </li>

      {/* Field 2: Calendar */}
      <li key="calendar" className="mb-3 mb-lg-0">
        <DatePicker name="small" handler={setDate}>
          <div className="pl-2 text-left text-nowrap overflow-scroll">
            <span className="material-icons mr-2">date_range</span>
            {touchedCal ? `${dateRangeStr[0]} / ${dateRangeStr[1]}` : "Check-in / Check-out"}
          </div>
        </DatePicker>
      </li>


      {/* Field 3: Guests */}
      <li key="guest" className="mb-3 mb-lg-0">
        <SearchItemBtn label="guest" onToggle={() => setTouchedGuest(true)}
        title={(
          <div className="d-flex align-items-center">
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

  /**
   * Search Bar: Large layout
   */
  const searchBarLarge = (
  <div className="bg-info text-center">
      {withReturn &&
        <NavReturnButton
          city={city}
          start={dateRangeStr[0]}
          end={dateRangeStr[1]}
          adult={adult}
          child={child}
          room={room}
        />
      }

    <form className={formStyle} onSubmit={doSearch}>
      <ul className="Search__options Search__collapse-sm" role="nav">

        {/* Field 1: Destination */}
        <li key="destination">
          <SearchItemBtn label="dest" title={
            <DestButton
              city={city}
              country={country}
              small={false}
              onChange={() => {}}
            />
          }>
            {destinations()}
          </SearchItemBtn>
        </li>

        {/* Field 2: Calendar */}
        <li key="datePicker">
          <DatePicker
            start={parseDate(startDate).toDate()}
            end={parseDate(endDate).toDate()}
            name="large"
            handler={setDate} >
            <DateButtonLg
              small={isSmallScreen}
              start={dateRangeStrLg[0]}
              end={dateRangeStrLg[1]}
            />
          </DatePicker>
        </li>


        {/* Field 3: Guests */}
        <li key="guests" className="border-right-0">
          <SearchItemBtn label="guest" title={
            <GuestButtonLg
              adult={adult}
              child={child}
              room={room}
              short={isMidScreen}
            />
          }>
            {visitors()}
          </SearchItemBtn>
        </li>

        <li key="buttons" className="flex-grow-0 flex-shrink-0 d-none">
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

SearchBar.propTypes = {
  simplified: PropTypes.bool,
  withReturn: PropTypes.bool,
};

export default SearchBar;