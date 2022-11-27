import Heading from "../common/Heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Art from "./DashHero";
import CreatePost from "../posts/CreatePost";
/* import Image from "react-bootstrap/Image"; */
import getAvatar from "../profile/Media";
import ProfilePic from "../common/ProfilePic";
import { Link } from "react-router-dom";

/* import getLocalstorageInfo from "../../context/useLocalstorage"; */
/* import { useState } from "react"; */

/* const user = JSON.parse(localStorage.getItem("auth"));
console.log(user.name); */

export default function Dashboard() {
  /*   const avatar = getLocalstorageInfo("auth").avatar;
  const name = getLocalstorageInfo("auth").name;
  console.log(getAvatar); */

  return (
    <>
      <Art>
        <Heading size="2" title="Koble" />
      </Art>
      <Heading size="1" title="Koble" />
      <Row className="dashboard">
        <Col xs={6} sm={4} md={2} className="dashboard__col--img">
          <Link to="/profile">
            <ProfilePic alt="your profile avatar" />
          </Link>
        </Col>
        <Col sm={8} md={10} className="dashboard__col">
          {" "}
          <CreatePost />
        </Col>
      </Row>

      <Row>
        <Heading size="2" title="KobleUniverset" />
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
