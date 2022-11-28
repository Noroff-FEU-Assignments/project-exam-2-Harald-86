import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function PostFromFollowingProfiles() {
  const auth = useAxios();
  const followingPosts_URL = BASE_URL + "/social/posts/following";

  const [FollowingPosts, setFollowingPosts] = useState([]);

  async function fetchPosts() {
    try {
      const response = await auth.get(followingPosts_URL);
      console.log("data from following fetch", response.data);
      setFollowingPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post">
      {FollowingPosts.map((following) => {
        return (
          <div className="post__card" key={following.id}>
            <Link to={`/posts/${following.id}`}>
              {" "}
              {following.media ? (
                <img src={following.media} className="img-fluid post__img" alt="post art" />
              ) : (
                <img
                  src="http://placeimg.com/640/360/any"
                  className="img-fluid post__img"
                  alt="this is a random generated placeholder"
                />
              )}
            </Link>
            <div className="post__title">{following.title}</div>
            <div className="post__body"> {following.body}</div>
            <div className="post__footer">
              <Link to={`/posts/${following.id}`}>
                <Button>View</Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
