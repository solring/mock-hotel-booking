import React from 'react';
import PropTypes from 'prop-types';

import FullscreenCollapse from './FullscreenCollapse';
import BottomModal from './BottomModal';

function FilterWrapper(props) {

  const {toggle, toggleSetter, resNumber, onFilter} = props;

  const closeFilter = (e) => {
    toggleSetter(false);
  }

  const doFilter = (e) => {
    if(onFilter) onFilter();
    toggleSetter(false);
  };

  const bottomModal = () => (
    <BottomModal
      toggle={true}
      clearHandler={closeFilter}
      confirmText="Filter"
      confirmAction={doFilter}
      direction="row"
      collapse={false}
    >
      <h4 className="mb-4">Found {resNumber || 0} results.</h4>
    </BottomModal>
  );

  return (
      <FullscreenCollapse toggle={toggle}
        onClose={closeFilter}
        title={(
          <div>
            <span className="material-icons icon-lg">filter_list</span> FILTER
          </div>
        )}
        footer={bottomModal()}>
        {props.children}
      </FullscreenCollapse>
  );
}

FilterWrapper.propTypes = {
  toggle: PropTypes.bool.isRequired,
  toggleSetter: PropTypes.func.isRequired,
  resNumber: PropTypes.number.isRequired,
  onFilter: PropTypes.func,
};

export default FilterWrapper;

