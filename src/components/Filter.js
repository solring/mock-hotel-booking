import { useState } from 'react';
import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Collapse } from 'react-bootstrap';

import * as constants from '../utils/constants';

let CustomSlider = withStyles({
  root: {
    color: constants.PRIMARY_COLOR,
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: constants.PRIMARY_COLOR,
    marginTop: -7,
    marginLeft: -7,
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
})(Slider);

function Filter(props) {
  const {name} = props;

  const [priceRange, setPriceRange] = useState([1000,5000]);
  let filterName = name || "";

  const sections = [
    {
      title: "Deals",
      options: [
        {
          name: "freeCancel",
          text: "Free cancel",
        },
        {
          name: "noPrepay",
          text: "No prepayment",
        },
        {
          name: "specialOffer",
          text: "Special offer",
        },
      ],
    },
    {
      title: "Popular Filters",
      options: [
        {
          name: "breakfast",
          text: "Breakfast included",
        },
        {
          name: "freeWifi",
          text: "Free Wifi",
        },
        {
          name: "swimmingPool",
          text: "Swimming pool",
        },
      ],
    },
    {
      title: "Stey Type",
      options: [
        {
          name: "hotel",
          text: "Hotel",
        },
        {
          name: "apartment",
          text: "Apartment",
        },
        {
          name: "unique",
          text: "Unique",
        },
        {
          name: "hostel",
          text: "Hostel",
        },
      ],
    },
  ]

  /* ------- Slider -------- */

  const sliderHandler = (event, newValue) => {
    setPriceRange(newValue);
  }

  /* ------ helper functions ------ */
  const genCheckBox = (sec, prefix) => {
    return (
      <div>
        <h6 className="card-title">{sec.title}</h6>
        <ul className="list-gap-8">
          {sec.options.map((option) => (
            <li key={option.name} className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id={`${prefix}_${option.name}_Check`} name={option.name}/>
            <label htmlFor={`${prefix}_${option.name}_Check`} className="custom-control-label text-secondary">{option.text}</label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const genGradeForm = () => {
    let nums = [1, 2, 3, 4, 5];

    return (
      <ul>
      {nums.map((i) => (
        <li key={`rate${i}`}className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id={`${filterName}_rate${i}_Check`} name="rate{i}" />
          <label htmlFor={`${filterName}_rate${i}_Check`} className="custom-control-label">
            <span className="material-icons">
            {"grade ".repeat(i)}
            </span>
            <span className="text-secondary">{i}.0</span>
          </label>
        </li>
      ))}
        <li key="unrated" className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="{filterName}_unrateCheck" name="unrate" />
          <label htmlFor="{filterName}_unrateCheck" className="custom-control-label text-secondary">Unrated</label>
        </li>
      </ul>
    );
  };

  return (

<form target="#" method="get" className="filter">

<ul className="list-divider-white">

  <li key="sec1">
    {genCheckBox(sections[0], filterName)}
  </li>

  <li key="sec2">
    {genCheckBox(sections[1], filterName)}
  </li>

  <li key="sec3">
    <h6 className="card-title">Budget</h6>

    <CustomSlider
      value={priceRange}
      onChange={sliderHandler}
      max={constants.MAX_FILTER_PRICE}
      min={constants.MIN_FILTER_PRICE}
      step={constants.FILTER_STEP}
    />

    <ul className="priceTag w-100">
      <li key="minPrice">
        <p className="title">min price</p>
        <div className="d-flex price">
          <span className="priceTag__Num">
            {priceRange[0]}
          </span>
          <span className="priceTag__Label">TWD</span>
        </div>
      </li>
      <li className="divider">
        -
      </li>
      <li key="maxPrice">
        <p className="title">max price</p>
        <div className="d-flex price">
          <span className="priceTag__Num">
            {priceRange[1]}
          </span>
          <span className="priceTag__Label">TWD</span>
        </div>
      </li>
    </ul>
  </li>

  <li key="sec4">
    <h6 className="card-title">Rating</h6>
    {genGradeForm()}
  </li>
  <li key="sec5">
    {genCheckBox(sections[2], filterName)}
  </li>
</ul>

</form>
  );
}

function FilterFullscreen(props) {
  const { toggle, toggleSetter } = props;

  const close = () => toggleSetter(!toggle);

  return (

<Collapse in={toggle} className="Fullscreen__collapse">
  <div> {/* Essential for Collapse to animate smoothly.*/}
  <div className="Fullscreen__collapse-wrapper">

    <div className="Fullscreen__header bg-light">
      <div>
        <span className="material-icons icon-lg">filter_list</span> FILTER
      </div>
      <button type="button" className="btn btn-link text-dark" onClick={close}>
        <span className="material-icons icon-lg">close</span>
      </button>
    </div>

    <div className="Fullscreen__content bg-info">
      <div className="container pt-4">
        <Filter />
      </div>
    </div>

    <div className="Fullscreen__footer bottom-modal text-left">
      <div className="bottom-modal-wrapper">
        <h4 className="mb-4">Find 1,245 results</h4>
        <div className="row">
          <div className="col-6"><button className="btn btn-outline-light btn-lg btn-block text-uppercase" onClick={close} >clear</button></div>
          <div className="col-6"><button className="btn btn-primary btn-lg btn-block text-uppercase" onClick={close} >filter</button></div>
        </div>
      </div>
    </div>

  </div>
  </div>
</Collapse>

  );
}

export { Filter, FilterFullscreen } ;