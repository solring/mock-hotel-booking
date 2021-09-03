import React from 'react';
import PropTypes from 'prop-types';

import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as constants from '../utils/constants';

const CustomSlider = withStyles({
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

  static propTypes = {
    sections: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onFilter = props.onFilter || null;
    this.sections = props.sections || [];

    // check box data
    Object.values(this.sections).map((sec) =>{
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
    this.sliderOnCommit = this.sliderOnCommit.bind(this);
    this.callOnFilter = this.callOnFilter.bind(this);
  }

  // Helpers
  callOnFilter(newState) {
    let data = {...this.state};
    Object.assign(data, newState);
    this.onFilter(data);
  }

  // Handlers
  checkBoxHandler(e) {
    const target = e.target;
    const value = target.checked;
    const title = target.title;
    this.setState({ [title]: value });
    if(this.onFilter) this.callOnFilter({ [title]: value });
  }

  sliderHandler(e, value) {
    this.setState({'priceRange' : value});
  }

  sliderOnCommit(e, value) {
    if(this.onFilter) this.callOnFilter();
  }

  // Renderers
  genCheckBox(sec, prefix) {
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

  genGradeForm() {
    let nums = [1, 2, 3, 4, 5];

    return (
      <ul>
      {nums.map((i) => (
        <li key={`rate${i}`}className="custom-control custom-checkbox">
          <input
            type="checkbox" className="custom-control-input"
            id={`rate${i}_Check`} title={`rate${i}`}
            value={this.state[`rate${i}`]}
            onChange={this.checkBoxHandler}
          />
          <label htmlFor={`rate${i}_Check`} className="custom-control-label" aria-label={`${i} star`}>
            <span className="material-icons">
            {"grade ".repeat(i)}
            </span>
            <span className="text-secondary">{i}.0</span>
          </label>
        </li>
      ))}
        <li key="unrated" className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input"
            id="unrateCheck" title="rate0"
            value={this.state["rate0"]}
            onChange={this.checkBoxHandler}
          />
          <label htmlFor="unrateCheck" className="custom-control-label text-secondary">Unrated</label>
        </li>
      </ul>
    );
  };

  // Filter implementation
  render() {

    return (
      <form target="#" method="get" className="filter" aria-label="search filter">
      <ul className="list-divider-white">

        <li key="sec1">
          {this.genCheckBox(this.sections["deals"], "_")}
        </li>

        <li key="sec2">
          {this.genCheckBox(this.sections["popular"], "_")}
        </li>

        <li key="sec3">
          <h6 className="card-title">Budget</h6>

          <CustomSlider
            data-testid="budget-slider"
            value={this.state.priceRange}
            onChange={this.sliderHandler}
            onChangeCommitted={this.sliderOnCommit}
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
          {this.genGradeForm()}
        </li>
        <li key="sec5">
          {this.genCheckBox(this.sections["stayType"], "_")}
        </li>
      </ul>

      </form>
    );
  }
}

export default Filter;