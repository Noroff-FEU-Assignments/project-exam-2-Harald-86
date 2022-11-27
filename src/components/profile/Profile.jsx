import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Username from "./Name";
import Avatar from "./Media";
import Banner from "./Banner";
import TestPosts from "../posts/PostTest";

import MyPosts from "../posts/MyPosts";
import Heading from "../common/Heading";

export default function Profile() {
  document.title = "Profile";
  return (
    <>
      <Banner />
      <Row>
        <Col xs={6} sm={4} md={3}>
          <Avatar />
        </Col>
        <Col xs={6} sm={8} md={9}>
          <Username />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12}>
          {/*  <Heading size="2" title="My shouts" />
          <MyPosts /> */}
          <TestPosts />
        </Col>
      </Row>
    </>
  );
}
