import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';

function BottomModal(props) {
  const {
    toggle,
    clearHandler,
    confirmText,
    confirmAction,
    direction,
    collapse,
    } = props;

  let layoutClass = (direction === 'vertical') ?
    "" :
    "container d-flex justify-content-md-between flex-column flex-md-row";

  const Content = (
  <div className="BottomModal__wrapper">
    <div className={layoutClass}>
      <div>
        {props.children}
      </div>
      <div className="row">
        <div className="col-6">
          <button className="btn btn-outline-primary btn-lg btn-block text-uppercase" onClick={clearHandler}>cencel</button>
        </div>
        <div className="col-6">
          <button className="btn btn-primary btn-lg btn-block text-uppercase" onClick={confirmAction}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  </div>
  )

  if(collapse) {
    return (
    <Collapse in={toggle} id="cartCollapse" className="BottomModal fixed-bottom">
      {Content}
    </Collapse>
    )
  } else return (
    <div className="BottomModal">
      {Content}
    </div>
  );
}

BottomModal.propTypes = {
  toggle: PropTypes.bool.isRequired,
  clearHandler: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  confirmAction: PropTypes.func.isRequired, 
  direction: PropTypes.string,
  collapse: PropTypes.bool,
};

export default BottomModal;