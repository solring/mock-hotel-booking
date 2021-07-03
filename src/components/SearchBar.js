import './SearchBar.scss'

function SearchBar (props) {
  const {withReturn, simplified} = props;
  const locations = [
    ['Bangkok', 'Thailand'],
    ['Osaka', 'Japan'],
    ['Roma', 'Italy'],
    ['Paris', 'France'],
    ['Reykjavik', 'Iceland'],
  ];

  const numberOptions = [
    'Adult', 'Child', 'Room'
  ];

  const numberPicker = (number, href, options) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <a href={href} className="material-icons text-dark mr-3">remove</a>
        {number}
        <a href={href} className="material-icons text-dark ml-3">add</a>
    </div>
    );
  };

  const returnBtn = () => {
    if (!withReturn) return;

    return (
    <a href="./search-result.html" className="d-md-none btn container py-3 px-3">
      <span className="material-icons text-dark">arrow_back</span>
      <span className="text-secondary small">Bangkok・17 June - 19 June・2 adults・1 room</span>
    </a>
    );
  };

  let formStyle = "py-2 py-md-4 search-bar container";
  if (withReturn) {
    formStyle += " d-none d-md-block";
  }

  const destinations = () => {
    return locations.map(([country, city]) => (
          <li className="dropdown-item">
            <a href="#" className="d-block">
              <div className="d-flex align-items-center">
                <div className="material-icons icon-lg mr-2">grade</div>
                <div>
                  <p>{country}</p>
                  <p className="small">{city}</p>
                </div>
              </div>
            </a>
          </li>
    ));
  };

  const visitors = () => {
    return numberOptions.map((option) => (
      <li className="dropdown-item">
          <div className="d-flex justify-content-between">
            <p>{option}</p>
            {numberPicker()}
          </div>
      </li>
    ));
  };

  const searchBarSmall = (

  <form className="p-4 search-bar bg-info rounded-lg" action="search-result.html" method="get">
    <ul className="search-options flex-column flex-lg-row">
      {/* Field Destination */}
      <li className="dropdown mb-3 mb-lg-0">
        <button className="btn btn-light btn-block text-left pl-3" type="button" data-toggle="dropdown" data-offset="0,8">
          <span className="material-icons">location_on</span>
          Destination
        </button>
        <ul className="dropdown-menu list-unstyled w-100">
          {destinations()}
        </ul>
      </li>

      {/* Field 2: Calendar */}
      {/* TODO: import date picker lib */}
      <li className="mb-3 mb-lg-0">
        <button id="searchDatePicker" className="btn btn-light btn-block text-left pl-3" type="button" data-toggle="dropdown">
          <span className="material-icons">date_range</span>
          Check-in / Check-out
        </button>
      </li>


      {/* Field 3: Guests */}
      <li className="dropdown mb-3 mb-lg-0">
        <button className="btn btn-light btn-block text-left pl-3" type="button" data-toggle="dropdown" data-offset="0,8">
          <span className="material-icons">person</span>
          Guests
        </button>
        <ul className="dropdown-menu list-unstyled w-100">
          {visitors()}
        </ul>
      </li>
      <li className="flex-grow-0 flex-shrink-0">
        <button className="btn btn-primary search-btn btn-block" type="submit">Search</button>
      </li>
    </ul>

  </form>
  );

  const searchBarLarge = (
  <div className="bg-info text-center">
      {returnBtn()}

  <form className={formStyle} action="search-result.html" method="get">

    <ul className="search-options search-collapse-sm">

      {/* Field 1: Destination */}
      <li className="dropdown">
        <button className="btn btn-light btn-block" type="button" data-toggle="dropdown" data-offset="0,8">
          <div className="d-none d-md-block">
            <div className="d-flex align-items-center">
              <div className="material-icons pr-lg-3 pr-2">location_on</div>
              <div className="text-left">
                <h5 className="search-title">destination</h5>
                <p className="search-subtitle search-location">Bangkok, Thailand</p>
              </div>
            </div>
          </div>
          <div className="d-md-none text-secondary">
            Bangkok
          </div>
        </button>


        <ul className="dropdown-menu list-unstyled w-100">
          {destinations()}
        </ul>
      </li>

      {/* Field 2: Calendar */}
      {/* TODO: import date picker lib */}
      <li>
        <a id="searchDatePicker" className="btn btn-light btn-block">

          <div className="d-none d-md-flex align-items-center">
            <div className="material-icons pr-lg-3 pr-2">date_range</div>

            <ul className="list-unstyled list-row-divider-info d-none d-lg-flex">
              <li>
                <h5 className="search-title">check-in</h5>
                <p className="search-subtitle search-date-start">17 June</p>
              </li>
              <li>
                <h5 className="search-title">check-out</h5>
                <p className="search-subtitle search-date-end">19 June</p>
              </li>
            </ul>
            <div className="text-left d-lg-none">
              <h5 className="search-title">check-in / out</h5>
              <p className="search-subtitle search-n-guests">17 june / 19 june</p>
            </div>

          </div>
          <div className="d-md-none text-secondary">
            17 june / 19 june
          </div>
        </a>
      </li>


      {/* Field 3: Guests */}
      <li className="dropdown border-right-0">

        <button className="btn btn-light btn-block" type="button" data-toggle="dropdown" data-offset="0,8">
          <div className="d-none d-md-flex align-items-center">
            <div className="material-icons pr-lg-3 pr-2">person</div>
            <div className="text-left">
              <h5 className="search-title">guests</h5>
              <p className="search-subtitle search-n-guests">2 adults・1 room</p>
            </div>
          </div>
          <div className="d-md-none text-secondary">
            2 adults・1 room
          </div>
        </button>

        <ul className="dropdown-menu list-unstyled w-100">
          {visitors()}
        </ul>
      </li>
      <li className="flex-grow-0 flex-shrink-0 d-none d-md-block">
        <button className="btn btn-primary search-btn text-uppercase" type="submit">Search</button>
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