import Heading from "../common/Heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Art from "./DashHero";
import CreatePost from "../posts/CreatePost";
import ProfilePic from "../common/ProfilePic";
import { Link } from "react-router-dom";
import GetFeed from "../posts/GetFeed";
import Username from "../profile/Name";

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
        <Col xs={12} sm={12} md={2} className="dashboard__col--img">
          <Link to="/profile">
            <ProfilePic alt="your profile avatar" />
            <Username />
          </Link>
        </Col>
        <Col xs={612} sm={12} md={10} className="dashboard__col--background">
          <GetFeed />
        </Col>
      </Row>

      {/* <Row>
        <GetFeed />
      </Row> */}
    </>
  );
}
