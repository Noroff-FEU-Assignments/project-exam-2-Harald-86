import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";

export default function Loader(props) {
  return (
    <Spinner animation="border" role="status" className="spinner-border text-secondary">
      {props.text}
    </Spinner>
  );
}

Loader.propTypes = {
  text: PropTypes.string,
};
