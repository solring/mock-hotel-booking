function PopularDestination(props) {
  const cities = [
    {
      name: "Osaka",
      country: "Japan",
    },
    {
      name: "Kyoto",
      country: "Japan",
    },
    {
      name: "Reykjavic",
      country: "Iceland",
    },
    {
      name: "Paris",
      country: "France",
    },
    {
      name: "Roma",
      country: "Italy",
    },
    {
      name: "Bangkok",
      country: "Thailand",
    },
  ];

  const genCities = () => {
    return cities.map((city) => (
      <li class="col-md-6 col-lg-4 mb-2 mb-md-4">
        <button class={`btn btn-block border-0 px-4 py-3 rounded-lg bg-img-${city.name}`}>
            <div class="d-flex justify-content-between align-items-center">
              <div class="text-left">
                <p class="small text-muted text-uppercase">{city.country}</p>
                <h5 class="text-light">{city.name}</h5>
              </div>
              <div class="material-icons icon-lg text-light">keyboard_arrow_down</div>
            </div>
        </button>
      </li>
    ));
  }
  return (
  <section class="container">
    <h3 class="mb-4">Popular Destinations</h3>
    <ul class="row">
      {genCities()}
    </ul>
  </section>
  );
}

export default PopularDestination;