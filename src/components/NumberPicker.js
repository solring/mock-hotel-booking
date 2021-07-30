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
      <a onClick={minus} className="material-icons text-dark mr-3">remove</a>
        {number}
      <a onClick={plus} className="material-icons text-dark ml-3">add</a>
    </div>
  );
}

export default NumberPicker;