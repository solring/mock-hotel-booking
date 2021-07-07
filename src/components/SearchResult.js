import { useState } from 'react';
import { Nav, Tab, Dropdown } from "react-bootstrap";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Filter from './Filter';
import HotelCard from './HotelCard';
import NumPagenation from './NumPagenation.js'

import * as constants from '../utils/constants';
import { hotelData } from '../utils/mockdata';

function SearchResult(props) {

  const isSmallScreen = useMediaQuery(`(max-width:${constants.BS_BREAKPOINT_MD})`);
  const [filterOn, setFilterOn] = useState(false);

  const groups = {
    "recomment": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "price": [7, 4, 5, 3, 8, 1],
    "value": [9, 0, 3, 6],
    "distance": [3, 10, 2],
  };

  const tabs = [
    ["recomment", "Recommended"],
    ["price", "Lowest Price"],
    ["value", "Best value"],
    ["distance", "Distance to City Center"],
  ];

  const getRooms = (category) => {
    let idxes = groups[category];
    return idxes.map(idx => hotelData[idx]);
  }

  const genCards = (category) => {
    let rooms = getRooms(category);
    if (!rooms) return <div></div>;
    return rooms.map((r) => <HotelCard room={r} />);
  };

  const genPanes = () => (
    <Tab.Content>
    {tabs.map(([short, title]) => (
      <Tab.Pane key={short} eventKey={short} >
        <ul class="list-divider-info no-divider-down-sm">
          {genCards(short)}
        </ul>
      </Tab.Pane>
    ))}
    </Tab.Content>
  );

  const genTabs = () => (
    <Nav variant="tabs" className="flex-nowrap">
        {tabs.map(([short, title]) => (
          <Nav.Item key={short} >
            <Nav.Link eventKey={short} className="h6">{title}</Nav.Link>
          </Nav.Item>
        ))}
    </Nav>
  );

  const genFilter = () => {
    if (isSmallScreen) {
      return <Filter toggle={filterOn} toggleSetter={setFilterOn} fullscreen={isSmallScreen}/> ;
    } else {
      return (
        <div className="col-md-4 d-none d-md-block mb-4" data-aos="fade-right">
            <nav className="card bg-info border-0">
              <div className="card-body">
              <Filter toggle={filterOn} toggleSetter={setFilterOn} fullscreen={isSmallScreen}/>
              </div>
            </nav>
        </div>
      )
    }
  }

  const toolbarPhone = () => {
    return (
      <div className="d-md-none">
      <ul className="d-flex align-items-center justify-content-center w-100 mb-3">
        <li key="tab1" className="flex-fill border-right border-info">
          <a className="btn btn-link btn-block font-weight-bold text-dark text-sub"
            onClick={() => {
              setFilterOn(!filterOn);
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
      </div>
    );
  }

  return (
  <div>

    <div className="container px-0 px-md-3 pt-4">
      <Tab.Container defaultActiveKey={tabs[0][0]}>

        <div className="row align-items-basline mb-3">
          <div className="col-md-4 text-center text-md-left">
            <h2 className="fixed-size mb-0">
              Bangkok<span className="notation-lg text-primary">3,240</span>
            </h2>
          </div>

          <div className="col-md-8 d-none d-md-block">
            {genTabs()}
          </div>
        </div>

        {/* toolbar on phones */}
        {toolbarPhone()}

        <div className="row ">

          {genFilter()}

          <div className="col-md-8" data-aos="fade-up">
            {genPanes()}

            <NumPagenation
              start={12}
              end={18}
              min={1}
              max={20}
            />
          </div>
        </div>
      </Tab.Container>
    </div>
  </div>
  );
}

export default SearchResult;