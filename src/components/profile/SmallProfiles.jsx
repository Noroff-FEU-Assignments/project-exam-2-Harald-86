import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import Heading from "../common/Heading";
import { Link } from "react-router-dom";

export function GetFollowingProfiles({ user }) {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = useAxios();
  const follow_URL = BASE_URL + `/social/profiles/${user}?_following=true&_followers=true`;

  async function getFollowing() {
    try {
      const responseFollowing = await auth.get(follow_URL);
      setFollowing(responseFollowing.data.following);
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFollowing();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    <Loader />;
  }

  if (error) {
    <div></div>;
  }

  return (
    <div className="small">
      {following.map((ing) => {
        return (
          <Link to={`/users/${ing.name}`} key={ing.name}>
            <div className="small__profile">
              <img src={ing.avatar} className="small__profile--avatar" alt="" />
              <Heading size="4" title={ing.name} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function GetFollowerProfiles({ user }) {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = useAxios();
  const follow_URL = BASE_URL + `/social/profiles/${user}?_following=true&_followers=true`;
  async function getFollowers() {
    try {
      const responseFollowers = await auth.get(follow_URL);
      setFollowers(responseFollowers.data.followers);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFollowers();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    <Loader />;
  }

  if (error) {
    <div></div>;
  }

  return (
    <div className="small">
      {followers.map((ers) => {
        return (
          <Link to={`/users/${ers.name}`} key={ers.name}>
            <div className="small__profile">
              <img src={ers.avatar} className="small__profile--avatar" alt="" />
              <Heading size="4" title={ers.name} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
