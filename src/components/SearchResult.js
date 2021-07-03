import { Nav } from "react-bootstrap";
import Filter from './Filter';
import HotelList from './HotelList';

function SearchResult(props) {

  const tabs = [
    ["recomment", "Recommended"],
    ["price", "Lowest Price"],
    ["value", "Best value"],
    ["distance", "Distance to City Center"],
  ];

  const genTabs = () => (
    <Nav variant="tabs" className="flex-nowrap">
        {tabs.map(([short, title]) => (
          <Nav.Item>
            <Nav.Link eventKey={short} className="h6">{title}</Nav.Link>
          </Nav.Item>
        ))}
    </Nav>
  );

  const filterPhone = () => (
    <div className="d-md-none">
  <ul className="d-flex align-items-center justify-content-center w-100 mb-3">
    <li className="flex-fill border-right border-info">
      <a href="#filterCollapse" className="btn btn-link btn-block font-weight-bold text-dark text-sub" data-toggle="collapse" >
        <span className="material-icons icon-lg">filter_list</span> FILTER
      </a>
    </li>
    <li className="flex-fill">
      <div className="dropdown">
        <a href="#" className="btn btn-link btn-block font-weight-bold text-dark text-sub" data-toggle="dropdown">
          <span className="material-icons icon-lg">sort</span> SORT
        </a>
        <div className="dropdown-menu dropdown-menu-right bg-info border-0 vw-100">
          <ul className="nav">
            <li className="nav-item dropdown-item"><a href="#pane0" data-toggle="tab" className="nav-link font-weight-bold active">Recommended</a></li>
            <li className="nav-item dropdown-item"><a href="#pane1" data-toggle="tab" className="nav-link font-weight-bold">Lowest Price</a></li>
            <li className="nav-item dropdown-item"><a href="#pane2" data-toggle="tab" className="nav-link font-weight-bold">Best value</a></li>
            <li className="nav-item dropdown-item"><a href="#pane3" data-toggle="tab" className="nav-link font-weight-bold">Distance to City Center</a></li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</div>
  );

  return (

<div className="container px-0 px-md-3 pt-4">

  <div className="row align-items-basline mb-3">
    <div className="col-md-4 text-center text-md-left">
      <h2 className="fixed-size mb-0">Bangkok<span className="notation-lg text-primary">3,240</span></h2>
    </div>

    <div className="col-md-8 d-none d-md-block">
      {genTabs()}
    </div>
  </div>

  <div className="row">

    <div className="col-md-4 d-none d-md-block mb-4" data-aos="fade-right">
      <nav className="card bg-info border-0">
        <div className="card-body">
          <Filter />
        </div>
      </nav>
    </div>

    <div className="col-md-8" data-aos="fade-up">
      <HotelList />

      <nav className="bg-info rounded-lg p-3 w-100 mt-4 mb-5 d-flex justify-content-between">
        <button className="btn btn-outline-primary text-uppercase">previous</button>
        <ul className="pagination">

          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item d-none d-md-block"><a className="page-link" href="#">3</a></li>
          <li className="page-item d-none d-lg-block"><a className="page-link" href="#">4</a></li>
          <li className="page-item d-none d-lg-block"><a className="page-link" href="#">5</a></li>
          <li className="page-item d-none d-lg-block"><a className="page-link" href="#">6</a></li>
          <li className="page-item d-none d-lg-block"><a className="page-link" href="#">7</a></li>
          <li className="page-item text-primary">...</li>
          <li className="page-item"><a className="page-link" href="#">9</a></li>

        </ul>
        <button className="btn btn-primary text-uppercase">next</button>
      </nav>
    </div>
  </div>
</div>

  );
}

export default SearchResult;