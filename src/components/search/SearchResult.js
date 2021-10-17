import { useState, useMemo } from 'react';
import { Nav, Tab, Dropdown } from "react-bootstrap";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Reveal } from 'react-reveal';

import Filter from '../Filter';
import FilterWrapper from '../FilterWrapper';
import HotelCard from './HotelCard';
import NumPagenation from '../NumPagenation.js'

import filter, {sections, initFilterForm} from './FilterImpl';

import * as constants from '../../utils/constants';

const ITEMS_PER_PAGE = 10;

function Hotels(props) {
  const {on, rooms, pageSize, index=1} = props;

  // NOTE: index start from 1
  const len = Math.ceil(rooms.length/pageSize);
  const curr = Math.min(len-1, index-1);
  const start = curr * pageSize;
  const end = Math.min(start + pageSize, rooms.length);
  const range = rooms.slice(start, end);

  if (!rooms) return <div></div>;
  if(!pageSize) pageSize = rooms.length;

  return (
    <ul className={`fade list-divider-info no-divider-down-sm ${on ? "show" : ""}`}>
      {range.map((r, idx) => <HotelCard key={idx} room={r} />)}
    </ul>
  );
}

function SearchResult(props) {
  const { query, hotelData } = props;

  const tabs = [
    ["recommend", "Recommended"],
    ["price", "Lowest Price"],
    ["value", "Best value"],
    ["distance", "Distance to City Center"],
  ];

  const [currTab, setCurrTab ] = useState(tabs[0][0]);
  const [currPage, setCurrPage] = useState(1);
  const [show, setShow] = useState(true);
  const [filterOps, setFilterOps] = useState(initFilterForm());
  const filteredHotels = useMemo(
    () => filter(hotelData, filterOps),
    [hotelData, filterOps]
  );

  // RWD
  const isSmallScreen = useMediaQuery(`(max-width:${constants.BS_BREAKPOINT_MD})`);
  const isMidScreen = useMediaQuery(`(max-width:${constants.BS_BREAKPOINT_LG})`);
  const [filterOn, setFilterOn] = useState(false);

  // Handler
  const onPageChange = (i) => {
    setShow(false);
    setTimeout(() => {
      setCurrPage(i);
      setShow(true)
    }, 150); //BS fade setting
  };

  const onFilter = (data) => {
    const newData = {...filterOps};
    Object.assign(newData, data);
    setFilterOps(newData);
  };

  // Helper functions
  const sortRooms = (category) => {
    let copied = [...filteredHotels];
    switch(category) {
      case "price":
        return copied.sort((a, b) => a.price - b.price);
      case "value":
        return copied.sort((a, b) => b.star/b.price - a.star/a.price);
      case "distance":
        return copied.sort((a, b) => a.distance - b.distance);
      default:
        return filteredHotels;
    }
  };

  // Renderers
  const genPanes = () => (
    <Tab.Content>
    {tabs.map(([short, title]) => (
      <Tab.Pane key={short} eventKey={short} >
        <Hotels
          rooms={sortRooms(short)}
          index={currPage}
          pageSize={ITEMS_PER_PAGE}
          on={show}
        />
      </Tab.Pane>
    ))}
    </Tab.Content>
  );

  const genTabs = () => (
    <Nav variant="tabs" className="flex-nowrap">
        {tabs.map(([short, title]) => (
          <Nav.Item key={short} >
            <Nav.Link eventKey={short} className="h6"
              onClick={() => setCurrTab(short)}
            >{title}</Nav.Link>
          </Nav.Item>
        ))}
    </Nav>
  );

  const genFilter = () => {
    if (isSmallScreen) {
      return (
        <FilterWrapper
          toggle={filterOn}
          toggleSetter={setFilterOn}
          resNumber={filteredHotels.length}>
          <Filter
            sections={sections}
            data={filterOps}
            onFilter={onFilter}
          />
        </FilterWrapper>
      );
    } else {
      return (
        <Reveal effect="fadeInLeft" duration={1300}>
          <div className="col-md-4 mb-4">
            <nav className="card bg-info border-0">
              <div className="card-body">
                <Filter
                  sections={sections}
                  data={filterOps}
                  onFilter={onFilter}
                />
              </div>
            </nav>
          </div>
        </Reveal>
      )
    }
  };

  const toolbarPhone = () => {
    return (
      <ul className="d-flex align-items-center justify-content-center w-100 mb-3">
        <li key="tab1" className="flex-fill border-right border-info">
          <a className="btn btn-link btn-block font-weight-bold text-dark text-sub"
            onClick={() => {
              setFilterOn(true);
              console.log(filterOn);
            }}
          >
            <span className="material-icons icon-lg">filter_list</span> FILTER
          </a>
        </li>
        <li key="tab2" className="flex-fill">
          <Dropdown>
            <Dropdown.Toggle variant="light" className="btn btn-link btn-block font-weight-bold text-dark text-sub">
              <span className="material-icons icon-lg">sort</span> SORT
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-info border-0 vw-100">
              {tabs.map(([short, title]) => <Dropdown.Item key={short} eventKey={short}><a className="nav-link font-weight-bold">{title}</a></Dropdown.Item>)}
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    );
  };

  return (
  <div>

    <div className="container px-0 px-md-3 pt-4">
      <Tab.Container defaultActiveKey={currTab}>

        <div className="row align-items-basline mb-3">
          <div className="col-md-4 text-center text-md-left">
            <h2 className="fixed-size mb-0">
              {query.city}<span className="text-primary"><sup>{hotelData.length}</sup></span>
            </h2>
          </div>

          <div className="col-md-8 d-none d-md-block">
            {genTabs()}
          </div>
        </div>

        {/* toolbar on phones */}
        {isSmallScreen && toolbarPhone()}

        <div className="row ">

          {genFilter()}

          <Reveal effect="fadeInUp" duration={1300}>
            <div className="col-md-8">
              {genPanes()}

              <NumPagenation
                curr={currPage}
                window={isMidScreen ? 5 : 9}
                min={filteredHotels.length > 0 ? 1: null}
                max={filteredHotels.length > 0 ?
                  Math.ceil(filteredHotels.length/ITEMS_PER_PAGE) : null}
                onIndex={onPageChange}
              />
            </div>
          </Reveal>

        </div>
      </Tab.Container>
    </div>
  </div>
  );
}

export default SearchResult;