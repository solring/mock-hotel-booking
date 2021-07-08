function PopularDestination(props) {
  const {cities} = props;
  if (!cities || cities.length === 0) return <div></div>;

  return (
    <ul className="row">
      {cities.map((city) => (
        <li key={city.name} className="col-md-6 col-lg-4 mb-2 mb-md-4">
          <button className={`btn btn-block border-0 px-4 py-3 rounded-lg bg-img-${city.name}`}>

              <div className="d-flex justify-content-between align-items-center">
                <div className="text-left">
                  <p className="small text-muted text-uppercase">{city.country}</p>
                  <h5 className="text-light">{city.name}</h5>
                </div>
                <div className="material-icons icon-lg text-light">keyboard_arrow_down</div>
              </div>

          </button>
        </li>
      ))}
    </ul>
  );
}

export default PopularDestination;