import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types'

function SearchItemBtn(props) {
  const { title, onToggle, label } = props;

  const ariaLabel = `searchItem-${label}`;
  const ariaLabel2 = `searchMenu-${label}`;

  return (
  <Dropdown onToggle={onToggle}>
    <Dropdown.Toggle variant="light" bsPrefix="no-toggle" aria-label={ariaLabel}
      className="btn btn-block text-left pl-3 text-nowrap" data-offset="0,8">
      {title}
    </Dropdown.Toggle>
    <Dropdown.Menu as="ul" className="list-unstyled w-100" aria-label={ariaLabel2}>
      {props.children}
    </Dropdown.Menu>
  </Dropdown>
  );
};

SearchItemBtn.propTypes = {
  title: PropTypes.object,
  onToggle: PropTypes.func,
  label: PropTypes.string.isRequired,
}

export default SearchItemBtn;
