import PropTypes from 'prop-types'

function NumberPicker(props) {
  const {number, onNumChange} = props;

  const minus = () => {
    if(number === 0) return;
    onNumChange(number-1);
  }

  const plus = () => {
    if(number > 99) return;
    onNumChange(number+1);
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <button onClick={minus} className="material-icons btn btn-link text-dark p-0 mr-3">remove</button>
        {number}
      <button onClick={plus} className="material-icons btn btn-link text-dark p-0 ml-3">add</button>
    </div>
  );
}

NumberPicker.propTypes = {
  number: PropTypes.number.isRequired,
  onNumChange: PropTypes.func.isRequired,
}

export default NumberPicker;