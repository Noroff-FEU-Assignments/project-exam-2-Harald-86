import useAxios from "../../hooks/useAxios";
import getLocalstorageInfo from "../../context/useLocalstorage";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../../constants/api";
const POSTS_URL = BASE_URL + "/social/posts?_author=true&_comments=true&_reactions=true";
console.log(POSTS_URL);
export default function GetFollowedPosts() {
  const user = getLocalstorageInfo("auth").name;
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postError, setPostError] = useState(null);
  const [following, setFollowing] = useState([]);
  /*   const [iFollow, setIfollow] = useState([]); */

  const HTTP = useAxios();

  useEffect(() => {
    async function followedProfiles() {
      try {
        const response = await HTTP.get(POSTS_URL);
        const responseTwo = await HTTP.get(BASE_URL + `/social/profiles/${user}?_following=true&_followers=true`);
        console.log("response one", response.data);
        console.log("response two", responseTwo.data.following);
        setAllPosts(response.data);
        setFollowing(responseTwo.data);
        console.log("filter this", response.data);
      } catch (error) {
        setPostError(<div className="message--error">Ops! There might be a problem, please try again later</div>);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <Spinner />;
  }

  if (postError) {
    return <div className="message--error">Ops! There might be a problem, please try again later</div>;
  }

  return (
    <div className="all__posts">
      {allPosts.map(function (post) {
        return (
          <div className="post" key={post.id}>
            <div className="post__head">
              <h3 className="post__author">{post.author.name}</h3>
              <h4 className="post_title">{post.title}</h4>
              <p className="post__body">{post.body}</p>
            </div>
            <div className="post__comment">
              <p className="post__comment--counter">Comments: {post._count.comments}</p>
              {post.comments.map(function (comment) {
                return (
                  <div className="post__comment--comments" key={comment.id}>
                    <h5 className="post__comment--user">{comment.owner}</h5>
                    <p className="post__comment--commented">Had this to say: {comment.body}</p>
                  </div>
                );
              })}
            </div>
            <div className="post__footer"></div>
          </div>
        );
      })}
    </div>
  );
}
