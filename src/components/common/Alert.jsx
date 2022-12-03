import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function AlertBad(props) {
  return <div className="message__error">{props.alert}</div>;
}

export function AlertGood(props) {
  return <div className="message__success">{props.alert}</div>;
}

export function AlertRegister(props) {
  return (
    <div className="message__success">
      {props.alert}
      <Link to="/">Now you can Log in</Link>
    </div>
  );
}

AlertBad.propTypes = {
  alert: PropTypes.string,
};

AlertGood.propTypes = {
  alert: PropTypes.string,
};

AlertRegister.propTypes = {
  alert: PropTypes.string,
};
