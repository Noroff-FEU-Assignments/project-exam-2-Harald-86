import Heading from "../common/Heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/* const user = JSON.parse(localStorage.getItem("auth"));
console.log(user.name); */

export default function Dashboard() {
  return (
    <>
      <Row>
        <p>insert uploaded banner here</p>
      </Row>
      <Row>
        <Heading title="KobleUniverset" />
        <p>Følg profiler, si din mening og koble opp mot andre folk med samme interesser.. bla bla</p>
        <Col> Tweet en tweet her</Col>
      </Row>
      <Row>
        <Col xs={12} sm={6} md={3}>
          Mini profil her banner, bilde og navn. med link til profil seff.
        </Col>
        <Col xs={12} sm={6} md={6}>
          poster fra profiler jeg følger her uten comments, men kan få frem comment ved å klikke på poste? eller skal vi
          inn på selve details da?
        </Col>
        <Col sm={12} md={3}>
          Oversikt/Liste over Profiler jeg følger.
        </Col>
      </Row>
    </>
  );
}
