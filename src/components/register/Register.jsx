import RegForm from "./RegisterFrom";
import Heading from "../common/Heading";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <Row className="banner">
        <Col className="banner__col">
          <p className="banner__col--paragraph">koble</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <p>
            Already a Koble user? go <Link to="/">here</Link> to login.
          </p>
          <h3>Why join Koble?</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </Col>
        <Col sm={12} md={6}>
          <Heading title="register" />
          <RegForm />
        </Col>
      </Row>
    </>
  );
}
