import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { FollowProfile, UnfollowProfile } from "../Follow";
import Heading from "../../common/Heading";
import getLocalstorageInfo from "../../../context/useLocalstorage";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Art from "../../dashboard/DashHero";
import { FaCommentDots, FaRegUserCircle } from "react-icons/fa";
import GetUserPosts from "./GetUserPosts";

export default function UserDetails() {
  let { name } = useParams();
  const auth = useAxios();
  const URL = BASE_URL + `/social/profiles/${name}?_following=true&_followers=true`;

  const user = getLocalstorageInfo("auth").name;

  const [userDetail, setUserDetail] = useState([]);
  const [following, setFollowing] = useState([]);

  async function fetchUserDetails() {
    try {
      const response = await auth.get(URL);
      console.log("use info? :", response.data);
      setUserDetail(response.data);
    } catch (error) {
      console.log(error.toString());
    }
  }

  async function checkMe() {
    try {
      const response_check = await auth.get(BASE_URL + `/social/profiles/${user}?_following=true`);
      setFollowing(response_check.data.following);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUserDetails();
    checkMe();
  }, []);

  const doesFollow = following.map((follow) => {
    return follow.name;
  });

  const iFollow = doesFollow.includes(userDetail.name);

  return (
    <div className="users">
      <div className="users__banner">
        {userDetail.banner ? (
          <img src={userDetail.banner} className="banner" alt="Users banner" />
        ) : (
          <Art>
            <Heading title="koble" size="2" />
          </Art>
        )}
      </div>
      <Row>
        <Col xs={12} sm={4} md={4} className="avatar__user">
          <img src={userDetail.avatar} alt="Users avatar" className="avatar" />
          <Heading title={name} size="2" />
          <div>{iFollow ? <UnfollowProfile /> : <FollowProfile />}</div>
        </Col>
        <Col xs={12} sm={8}>
          <hr />
          <GetUserPosts user={name} />
        </Col>
      </Row>
    </div>
  );
}
