import { Spinner } from 'react-bootstrap';

const Loading = () => (
  <div className="container text-center py-5">
    <Spinner variant="primary" animation="border" role="status">
      <span className="invisible">Loading...</span>
    </Spinner>
  </div>
);

export default Loading;