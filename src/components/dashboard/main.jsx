import Heading from "../common/Heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Art from "./DashHero";
import ProfilePic from "../common/ProfilePic";
import { Link } from "react-router-dom";
import GetFeed from "../posts/GetFeed";
import Username from "../profile/Name";

export default function Dashboard() {
  document.title = "Feed | KOBLE ";
  return (
    <>
      <Art>
        <div className="banner__col--paragraph">
          <span className="banner--brand">koble</span>
        </div>
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
    </>
  );
}
