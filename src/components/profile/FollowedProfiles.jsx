import useAxios from "../../hooks/useAxios";
import getLocalstorageInfo from "../../context/useLocalstorage";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../../constants/api";
import { Link } from "react-router-dom";

const followed_URL =
  BASE_URL + "/social/posts/following?sort=created&sortOrder=desc&_author=true&_comments=true&_reactions=true";
export default function GetFollowedPosts() {
  const [followedPosts, setFollowedPosts] = useState([]);
  const [followedError, setFollowedError] = useState(null);
  const [followedLoading, setFollowedLoading] = useState(true);

  const authenticate = useAxios();

  useEffect(() => {
    async function followedProfiles() {
      try {
        const response = await authenticate.get(followed_URL);

        console.log("response one", response.data);
        setFollowedPosts(response.data);
      } catch (error) {
        setFollowedError(<div className="message--error">Ops! There might be a problem, please try again later</div>);
      } finally {
        setFollowedLoading(false);
      }
    }
    followedProfiles();
    // eslint-disable-next-line
  }, []);

  /*  following.map((iFollowing) => {
    return const follow = iFollowing.name
  }); */

  /*   console.log("filtered now ? ", filtered); */

  /* console.log("following", following.name); */

  /*   async function checkFollowers() {
    try {
      const doFollow = await HTTP.get(BASE_URL + `/social/profiles/${user}?_following=true`);
      console.log("follow data", doFollow.data.following);
      setFollowing(doFollow.data.following);
    } catch (error) {
      console.log(error);
    }
  }
  checkFollowers(); */

  if (followedLoading) {
    return <Spinner />;
  }

  if (followedError) {
    return <div className="message--error">Ops! There might be a problem, please try again later</div>;
  }

  return (
    <div className="all_posts">
      {followedPosts.map((post) => {
        return (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div className="posts" key={post.id}>
              <div className="post__head">
                <h3 className="post__author">{post.author.name}</h3>
                <h4 className="post_title">{post.title}</h4>
                <p className="post__body">{post.body}</p>
              </div>
              {/*   <div className="post__comment">
              <p className="post__comment--counter">Comments: {post.comments.length}</p>
              {post.comments.map((comment) => {
                return (
                  <div className="post__comment--comments" key={comment.id}>
                    <h4 className="post__comment--owner">{comment.owner}</h4>
                    <p className="post__comment--commented">{comment.body}</p>
                  </div>
                );
              })}
            </div> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
