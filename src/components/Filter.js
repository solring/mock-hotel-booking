import React from 'react';
import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import FullscreenCollapse from './FullscreenCollapse';

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

class Filter extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};

    this.sections = [
      {
        title: "Deals",
        options: [
          {
            title: "freeCancel",
            text: "Free cancel",
          },
          {
            title: "noPrepay",
            text: "No prepayment",
          },
          {
            title: "specialOffer",
            text: "Special offer",
          },
        ],
      },
      {
        title: "Popular Filters",
        options: [
          {
            title: "breakfast",
            text: "Breakfast included",
          },
          {
            title: "freeWifi",
            text: "Free Wifi",
          },
          {
            title: "swimmingPool",
            text: "Swimming pool",
          },
        ],
      },
      {
        title: "Stay Type",
        options: [
          {
            title: "hotel",
            text: "Hotel",
          },
          {
            title: "apartment",
            text: "Apartment",
          },
          {
            title: "unique",
            text: "Unique",
          },
          {
            title: "hostel",
            text: "Hostel",
          },
        ],
      },
    ]

    // check box data
    this.sections.map((sec) =>{
      sec.options.map((opt) => {
        this.state[opt.title] = false;
      })
    });
    [0,1,2,3,4,5].map((i) => {
      this.state[`rate${i}`] = false;
    })
    
    this.state['priceRange'] = [1000, 5000];

    this.checkBoxHandler = this.checkBoxHandler.bind(this);
    this.sliderHandler = this.sliderHandler.bind(this);
    this.closeFilter = this.closeFilter.bind(this);
    this._Filter = this._Filter.bind(this);
  }

  // Handlers
  checkBoxHandler(e) {
    const target = e.target;
    const value = target.checked;
    const title = target.title;
    this.setState({ [title]: value });
  }

  sliderHandler(e, newValue) {
    this.setState({'priceRange' : newValue});
  }

  closeFilter(e){
    this.props.toggleSetter(false);
  }

  // Filter implementation
  _Filter() {

    /* ------ helper functions ------ */
    const genCheckBox = (sec, prefix) => {
      return (
        <div>
          <h6 className="card-title">{sec.title}</h6>
          <ul className="list-gap-8">
            {sec.options.map((option, idx) => (
              <li key={option.title} className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input"
                id={`${prefix}_${option.title}_Check`} title={option.title}
                value={this.state[option.title]}
                onChange={this.checkBoxHandler}
              />
              <label htmlFor={`${prefix}_${option.title}_Check`} className="custom-control-label text-secondary">{option.text}</label>
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
            <input
              type="checkbox" className="custom-control-input"
              id={`rate${i}_Check`} title={`rate${i}`}
              value={this.state[`rage${i}`]}
              onChange={this.checkBoxHandler}
            />
            <label htmlFor={`rate${i}_Check`} className="custom-control-label">
              <span className="material-icons">
              {"grade ".repeat(i)}
              </span>
              <span className="text-secondary">{i}.0</span>
            </label>
          </li>
        ))}
          <li key="unrated" className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input"
              id="unrateCheck" title="unrate"
              value={this.state["rate0"]}
              onChange={this.checkBoxHandler}
            />
            <label htmlFor="unrateCheck" className="custom-control-label text-secondary">Unrated</label>
          </li>
        </ul>
      );
    };

    return (

      <form target="#" method="get" className="filter">

      <ul className="list-divider-white">

        <li key="sec1">
          {genCheckBox(this.sections[0], "_")}
        </li>

        <li key="sec2">
          {genCheckBox(this.sections[1], "_")}
        </li>

        <li key="sec3">
          <h6 className="card-title">Budget</h6>

          <CustomSlider
            value={this.state.priceRange}
            onChange={this.sliderHandler}
            max={constants.MAX_FILTER_PRICE}
            min={constants.MIN_FILTER_PRICE}
            step={constants.FILTER_STEP}
          />

          <ul className="Filter__priceTag w-100">
            <li key="minPrice">
              <p className="title">min price</p>
              <div className="d-flex price">
                <span className="number">
                  {this.state.priceRange[0]}
                </span>
                <span className="label">TWD</span>
              </div>
            </li>
            <li className="divider">
              -
            </li>
            <li key="maxPrice">
              <p className="title">max price</p>
              <div className="d-flex price">
                <span className="number">
                  {this.state.priceRange[1]}
                </span>
                <span className="label">TWD</span>
              </div>
            </li>
          </ul>
        </li>

        <li key="sec4">
          <h6 className="card-title">Rating</h6>
          {genGradeForm()}
        </li>
        <li key="sec5">
          {genCheckBox(this.sections[2], "_")}
        </li>
      </ul>

      </form>
    );
  }

  render() {

    const bottomModal = (
      <div>
        <h4 className="mb-4">Find 1,245 results</h4>
        <div className="row">
          <div className="col-6"><button className="btn btn-outline-light btn-lg btn-block text-uppercase" onClick={this.closeFilter} >clear</button></div>
          <div className="col-6"><button className="btn btn-primary btn-lg btn-block text-uppercase" onClick={this.closeFilter} >filter</button></div>
        </div>
      </div>
    );

    if(!this.props.fullscreen) return this._Filter();
    else return (
      <FullscreenCollapse toggle={this.props.toggle}
        onClose={this.closeFilter}
        title={(
          <div>
              <span className="material-icons icon-lg">filter_list</span> FILTER
          </div>
        )}
        footer={bottomModal}
      >
        {this._Filter()}
      </FullscreenCollapse>
    );
  }
}

export default Filter;