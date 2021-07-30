import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types'

function SearchItemBtn(props) {
  const { title, onToggle } = props;
  return (
  <Dropdown onToggle={onToggle}>
    <Dropdown.Toggle variant="light"  bsPrefix="no-toggle"
      className="btn btn-block text-left pl-3 text-nowrap" data-offset="0,8">
      {title}
    </Dropdown.Toggle>
    <Dropdown.Menu className="list-unstyled w-100">
      {props.children}
    </Dropdown.Menu>
  </Dropdown>
  );
};

SearchItemBtn.propTypes = {
  title: PropTypes.string,
  onToggle: PropTypes.func,
}

export default SearchItemBtn;
