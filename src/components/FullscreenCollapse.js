import { Collapse } from 'react-bootstrap';

export default (props) => {
  const { toggle, onClose, title, footer} = props;

  return(
    <Collapse in={toggle} className="Fullscreen__collapse">
      <div> {/* Essential for Collapse to animate smoothly.*/}
      <div className="Fullscreen__collapse-wrapper">

        <div className="Fullscreen__header bg-light">
          {title}
          <button type="button" className="btn btn-link text-dark" onClick={onClose}>
            <span className="material-icons icon-lg">close</span>
          </button>
        </div>

        <div className="Fullscreen__content bg-info">
          <div className="container pt-4">
            {props.children}
          </div>
        </div>

        <div className="Fullscreen__footer BottomModal text-left">
          <div className="BottomModal__wrapper">
            {footer}
          </div>
        </div>

      </div>
      </div>
    </Collapse>
  );
};