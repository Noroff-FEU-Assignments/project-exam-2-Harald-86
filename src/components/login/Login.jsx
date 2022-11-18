import LoginForm from "./LoginForm";
import Heading from "../common/Heading";
/* import HeroImage from "../common/Hero"; */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <Row className="banner">
        <Col className="banner__col">
          <p className="banner__col--paragraph">koble</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <Heading size="1" title="Login" />
          <LoginForm />
        </Col>
        <Col sm={12} md={6}>
          <p>
            New to Koble? Register <Link to="/register">here</Link> to create an Account in no time.
          </p>
          <h3>What is Koble?</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </Col>
      </Row>
    </>
  );
}
