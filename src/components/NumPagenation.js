import PropTypes from 'prop-types';

function NumPagenation(props) {
  const {
    curr, window,
    min, max,
    onIndex = () => {},
  } = props;

  let nums = [];

  let start = Math.max(min, curr - Math.floor((window)/2));
  if ((start + window - 1) > max)
    start = Math.max(min, max - window + 1);
  let end = Math.min(max, start + window - 1);

  for(let i = start; i<end+1; i++) {
    nums.push(i);
  }

  const onNext = () => {
    if(curr === max) return;
    onIndex(curr+1);
  }

  const onPrev = () => {
    if(curr === min) return;
    onIndex(curr-1);
  }

  return (
    <nav className="bg-info rounded-lg p-3 w-100 mt-4 mb-5 d-flex justify-content-between">
      <button className="btn btn-outline-primary text-uppercase"
        onClick={onPrev} role="button">
        previous
      </button>
      <ul className="pagination">

        {min &&
          <li key={min} className="page-item">
            <a className="page-link" onClick={() => onIndex(min)} role="button">
              {min}
            </a>
          </li>
        }
        {min && <li key="upperEllipsis" className="page-item text-primary">...</li>}
        {
          nums.map((n) =>
            <li key={n} className={`page-item d-none d-md-block ${ n === curr ? "active" : ""}`}>
              <a className="page-link" onClick={() => onIndex(n)} role="button">{n}</a>
            </li>
          )
        }
        {max && <li key="lowerEllipsis" className="page-item text-primary">...</li>}
        {max &&
          <li key={max} className="page-item">
            <a className="page-link" onClick={()=>onIndex(max)} role="button">
              {max}
            </a>
          </li>
        }

      </ul>
      <button className="btn btn-primary text-uppercase"
        onClick={onNext} role="button">
        next
      </button>
    </nav>
  )
}

NumPagenation.propTypes = {
  curr: PropTypes.number.isRequired,
  window: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onIndex: PropTypes.func.isRequired,
};

export default NumPagenation;