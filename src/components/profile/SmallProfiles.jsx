import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";
import getLocalstorageInfo from "../../context/useLocalstorage";
import { useEffect, useState } from "react";
import Heading from "../common/Heading";
const me = getLocalstorageInfo("auth").name;

export function GetFollowingProfiles() {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = useAxios();
  const follow_URL = BASE_URL + `/social/profiles/${me}?_following=true&_followers=true`;

  async function getFollowing() {
    try {
      const responseFollowing = await auth.get(follow_URL);
      setFollowing(responseFollowing.data.following);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollowing();
  }, []);

  return (
    <div>
      {following.map((ing) => {
        return (
          <div className="small__profile">
            <img src={ing.avatar} className="small__profile--avatar" alt="" />
            <Heading size="4" title={ing.name} className="small__profile--name" />
          </div>
        );
      })}
    </div>
  );
}

export function GetFollowerProfiles() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = useAxios();
  const follow_URL = BASE_URL + `/social/profiles/${me}?_following=true&_followers=true`;

  async function getFollowers() {
    try {
      const responseFollowers = await auth.get(follow_URL);

      setFollowers(responseFollowers.data.followers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollowers();
  }, []);

  return (
    <>
      <p>followers</p>
    </>
  );
}
