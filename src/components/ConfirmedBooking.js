import { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';

function ConfirmedBooking(props) {
  const { data } = props;

  const tabs = [
    "Upcoming", "Completed"
  ];
  const [currTab, setCurrTab ] = useState(tabs[0]);

  const genBookings = (bookings) => {
    return (

    <ul className="list-divider-info mb-4">
      {bookings.map((booking, idx) => (
        <li key={`booking ${idx}`}>
        <div className="card Booking__card hover-shadow">
          <div className="row no-gutters">

            <div className="col-md-4">
              <img src={booking.img} alt="" className="Booking__card-img pic-height-sm" />
            </div>

            <div className="col-md-8">
              <div className="card-body d-flex flex-column flex-md-row justify-content-between">
                <ul className="mb-4 mb-md-0">
                  <li key="hotel" className="d-flex pb-1">
                    <div className="material-icons mr-3">hotel</div>
                    <div>
                      <h6 className="">{booking.name}</h6>
                      <p className="card-subtitle">{booking.room}</p>
                    </div>
                  </li>
                  <li key="date" className="d-flex pb-1">
                    <div className="material-icons mr-3">date_range</div>
                    <div>
                      <h6 className="">{booking.startDate} - {booking.endDate}</h6>
                      <p className="card-subtitle">{booking.nights} nights・{booking.adults} adults</p>
                    </div>
                  </li>
                  <li key="price" className="d-flex">
                    <div className="material-icons mr-3">attach_money</div>
                    <div>
                      <h6 className="">TWD {booking.price}</h6>
                      <p className="card-subtitle">{booking.room}</p>
                    </div>
                  </li>
                </ul>
                <a href="#" className="text-uppercase font-weight-bold">view details</a>
              </div>
            </div>

          </div>
        </div>
      </li>
      ))}
    </ul>

    );
  }

  return (
    <Tab.Container defaultActiveKey={currTab}>

    <Nav className="mb-4 font-weight-bold" role="tablist">
      {tabs.map((tab) => (
        <Nav.Item key={tab} className="nav-item">
          <Nav.Link eventKey={tab} onClick={() => setCurrTab(tab)}>
            {tab}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>

    <Tab.Content>
      {tabs.map((tab) => (
        <Tab.Pane eventKey={tab}>
          {genBookings(data.filter(booking => booking.status === tab))}
        </Tab.Pane>
      ))}
    </Tab.Content>

    </Tab.Container>

  );
}

export default ConfirmedBooking;