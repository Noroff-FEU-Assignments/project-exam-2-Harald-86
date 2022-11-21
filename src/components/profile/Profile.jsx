/* import Heading from "../common/Heading"; */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Username from "./Name";
import Avatar from "./Media";
import Banner from "./Banner";
import GetFollowedPosts from "./FollowedProfiles";

export default function Profile() {
  document.title = "Profile";
  return (
    <>
      <Banner />
      <Row>
        <Avatar />
        <Username />
        <Col>
          {" "}
          <GetFollowedPosts />
        </Col>
        <Col> My posts</Col>
        <Col>{/*  <Media /> */}</Col>
      </Row>
    </>
  );
}
