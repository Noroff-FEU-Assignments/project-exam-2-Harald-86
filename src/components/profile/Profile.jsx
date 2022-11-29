import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Username from "./Name";
import Avatar from "./Media";
import Banner from "./Banner";
import MyPosts from "../posts/MyPosts";
import Heading from "../common/Heading";
import getLocalstorageInfo from "../../context/useLocalstorage";
import GetFollowedNumbers from "./FollowedNumbers";

export default function Profile() {
  const user = getLocalstorageInfo("auth").name;
  document.title = `${user} | KOBLE`;
  return (
    <>
      <Banner />
      <Row>
        <Col xs={12} sm={4} md={4}>
          <Avatar />
          <Username />
          <GetFollowedNumbers />
        </Col>
        <Col xs={12} sm={8}>
          <MyPosts />
        </Col>
      </Row>
    </>
  );
}
