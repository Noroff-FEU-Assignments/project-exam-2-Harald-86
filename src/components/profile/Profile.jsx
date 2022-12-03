import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Username from "./Name";
import Avatar from "./Media";
import Banner from "./Banner";
import MyPosts from "../posts/MyPosts";
import getLocalstorageInfo from "../../context/useLocalstorage";

export default function Profile() {
  const user = getLocalstorageInfo("auth").name;
  document.title = `${user} | KOBLE`;
  return (
    <>
      <Banner />
      <Row>
        <Col xs={12} sm={4} md={4} className="avatar__user">
          <Avatar />

          <Username />
        </Col>
        <Col xs={12} sm={8}>
          <hr />
          <MyPosts />
        </Col>
      </Row>
    </>
  );
}
