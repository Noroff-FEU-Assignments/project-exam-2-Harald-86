import useAxios from "../../hooks/useAxios";
import getLocalstorageInfo from "../../context/useLocalstorage";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/api";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

export default function GetFollowNumbers() {
  const me = getLocalstorageInfo("auth").name;
  const followerInfo_URL = BASE_URL + `/social/profiles/${me}?_following=true&_followers=true`;
  const auth = useAxios();

  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [profileList, setProfileList] = useState([]);

  async function checkForFollowDetails() {
    try {
      const response = await auth.get(followerInfo_URL);
      console.log("count", response.data._count.followers);
      setFollowers(response.data._count.followers);
      setFollowing(response.data._count.following);
    } catch (error) {
      console.log(error.toString());
    }
  }

  async function getProfiles() {
    try {
      const response = await auth.get(followerInfo_URL);
      console.log("display followers", response.data.following);
      setProfileList(response.data.following);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkForFollowDetails();
    getProfiles();
  }, []);

  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Following</Accordion.Header>
        <Accordion.Body>
          {profileList.map((users) => {
            return (
              <Link to={`/users/${users.name}`} key={users.name}>
                <img src={users.avatar} className="img-fluid miniatyr" alt="" />
                <div>{users.name}</div>
              </Link>
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>KobleStats</Accordion.Header>
        <Accordion.Body>
          <p>Following : {following}</p>
          <p>Followers : {followers}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
