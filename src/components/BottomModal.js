import { Collapse } from 'react-bootstrap';

function ButtomModel(props) {
  const {
    toggle,
    clearHandler,
    confirmText,
    confirmAction,
    total,
    roomNum,
    night} = props;
  return (
<Collapse in={toggle} id="cartCollapse" className="BottomModal fixed-bottom">
  <div className="BottomModal__wrapper">
    <div className="container d-flex justify-content-md-between flex-column flex-md-row">
      <div>
        <p className="small text-secondary">{roomNum} room・{night} night</p>
        <h4 className="mb-4">TWD {total}</h4>
      </div>
      <div className="row">
        <div className="col-6">
          <button className="btn btn-outline-primary btn-lg btn-block text-uppercase" onClick={clearHandler}>cencel</button>
        </div>
        <div className="col-6">
          <a className="btn btn-primary btn-lg btn-block text-uppercase" onClick={confirmAction}>
            {confirmText}
          </a>
        </div>
      </div>
    </div>
  </div>
</Collapse>
  );
}

export default ButtomModel;