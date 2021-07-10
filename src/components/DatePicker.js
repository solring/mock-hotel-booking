import LitePicker from 'litepicker';
import React from 'react';

class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.handler = props.handler || null;
    this.name = props.name || "";
    this.divId = `litepicker_${this.name}`;
    this.picker = null;
  }

  onSelected (date1, date2) {
    console.log("onSelected");
    if(this.handler) this.handler(date1, date2);
  }

  componentDidMount() {
    this.picker = new LitePicker({
      element: document.getElementById(this.divId),
      numberOfMonths: 2,
      selectForward: true,
      singleMode: false,
      autoApply: true,
      format: 'MM/DD/YYYY',
      setup: (picker) => {
        picker.on('preselect', this.onSelected)
      }
    });
  }

  render() {
    return (
      <div>
      <button  type="button"
        className="btn btn-light btn-block text-left pl-3"
        onClick={(e) => {
          this.picker.show();
        }}>
        {this.props.children}
      </button>
      <div id={this.divId}></div>
      </div>
    );
  }
}

export default DatePicker;