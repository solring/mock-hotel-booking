import PropTypes from 'prop-types';

function Stars(props) {
  const {star} = props;
  return (
    <span className="material-icons fz-grade">
      {"grade ".repeat(star)}
    </span>
  );
};

Stars.propTypes = {
  star: PropTypes.number.isRequired,
}

export { Stars };