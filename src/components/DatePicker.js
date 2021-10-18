import React from 'react';
import PropTypes from 'prop-types';
import LitePicker from 'litepicker';

class DatePicker extends React.Component {

  static propTypes = {
    start: PropTypes.object,
    end: PropTypes.object,
    centered: PropTypes.bool,
    name: PropTypes.string,
    handler: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.name = props.name || "";
    this.divId = `litepicker_${this.name}`;
    this.picker = null;

    this.start = props.start || new Date();
    this.end = props.end || this._getTomorrow();

    this.onSelected = this.onSelected.bind(this);
  }

  _getTomorrow() {
    let tmr = new Date();
    tmr.setDate(tmr.getDate() +1 );
    return tmr;
  }

  onSelected (date1, date2) {
    if(this.props.handler) {
      this.props.handler(
        date1 ? date1.toJSDate() : undefined,
        date2 ? date2.toJSDate() : undefined
      );
    }
  }

  componentDidMount() {
    this.picker = new LitePicker({
      element: document.getElementById(this.divId),
      numberOfMonths: 2,
      selectForward: true,
      singleMode: false,
      autoApply: true,
      startDate: this.start,
      endDate: this.end,
      format: 'MM/DD/YYYY',
      setup: (picker) => {
        picker.on('preselect', this.onSelected)
      }
    });
  }

  render() {
    const styles = this.props.centered ?
      {
        position: "relative",
        left: "calc(50% - 138px)",
      }
      : null;
    return (
      <div>
      <button type="button"
        aria-label="calendar"
        className="btn btn-light btn-block"
        onClick={(e) => {
          this.picker.show();
        }}>
        {this.props.children}
      </button>
      <div style={styles} id={this.divId}></div>
      </div>
    );
  }
}

export default DatePicker;