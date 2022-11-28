import { BASE_URL } from "../../constants/api";
import getLocalstorageInfo from "../../context/useLocalstorage";
import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";
import Heading from "../common/Heading";

export default function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const [myPostsError, setMyPostsError] = useState(null);
  const [myPostsLoading, setMyPostsLoading] = useState(true);

  const me = getLocalstorageInfo("auth").name;
  const auth = useAxios();
  const myposts_URL = BASE_URL + `/social/profiles/${me}/posts`;
  const placeholder =
    "https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  useEffect(() => {
    async function fetchMyPosts() {
      try {
        const response = await auth.get(myposts_URL);
        console.log(response.data);
        setMyPosts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setMyPostsLoading(false);
      }
    }
    fetchMyPosts();
  }, []);

  if (myPostsError) {
    return <div className="message__error">ops... something went wrong</div>;
  }

  if (myPostsLoading) {
    return <Loader />;
  }

  return (
    <div className="post">
      {myPosts.map((poster) => {
        console.log(poster);
        return (
          <Link to={`/posts/${poster.id}`} key={poster.id}>
            <div className="post__card">
              {poster.media ? (
                <img src={poster.media} className="post__image img-fluid" alt="create alt text" />
              ) : (
                <img
                  src={placeholder}
                  className="post__image img-fluid"
                  alt="placeholder when the post has no media attached"
                />
              )}
              <Heading size="4" title={poster.title} />
              <div className="post__body">{poster.body}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
