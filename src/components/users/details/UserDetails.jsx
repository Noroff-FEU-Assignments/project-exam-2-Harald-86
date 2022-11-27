import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { FollowProfile, UnfollowProfile } from "../Follow";
import Heading from "../../common/Heading";
import getLocalstorageInfo from "../../../context/useLocalstorage";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import heroart from "../../../images/heroart.jpg";
import Art from "../../dashboard/DashHero";

export default function UserDetails() {
  let { name } = useParams();
  const auth = useAxios();
  const URL = BASE_URL + `/social/profiles/${name}`;
  const you = getLocalstorageInfo("auth").name;

  const [userDetail, setUserDetail] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await auth.get(URL);
        console.log("responseOne", response.data);
        setUserDetail(response.data);
      } catch (error) {
        console.log(error.toString());
      }
    }
    fetchUserDetails();
  }, []);

  useEffect(() => {
    async function checkMe() {
      try {
        const responseTwo = await auth.get(BASE_URL + `/social/profiles/${you}?_following=true`);
        setFollowing(responseTwo.data.following);
      } catch (error) {
        console.log(error);
      }
    }
    checkMe();
  }, []);

  console.log(userDetail.name);
  console.log(following);

  const doesFollow = following.map((follow) => {
    console.log(follow.name);

    return follow.name;
  });

  console.log("do i follow?", doesFollow);

  const iFollow = doesFollow.includes(userDetail.name);

  console.log("correct button?", iFollow);

  return (
    <>
      <Row className="profile__body">
        <Col md={12}>
          {userDetail.banner ? (
            <img src={userDetail.banner} className="profile__banner img-fluid" alt="Users banner" />
          ) : (
            <Art>
              <Heading title="koble" size="2" />
            </Art>
          )}
        </Col>
        <Col sm={6}>
          {" "}
          <Heading size="1" title={userDetail.name} />
        </Col>

        <Col sm={6}>
          <img src={userDetail.avatar} alt="Users avatar" className="profile__avatar" />
          <div>{iFollow ? <UnfollowProfile /> : <FollowProfile />}</div>
        </Col>
      </Row>

      <Row className="profile__footer"></Row>
    </>
  );
}
