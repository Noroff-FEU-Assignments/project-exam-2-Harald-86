import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";
import { AlertBad } from "../common/Alert";

import { BASE_URL } from "../../constants/api";

const POSTS_URL = BASE_URL + "/social/posts?_author=true&_comments=true&_reactions=true";

export default function GetAllPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  const HTTP = useAxios();

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await HTTP.get(POSTS_URL);
        setAllPosts(response.data);
      } catch (error) {
        setPostError(<AlertBad alert="Something went wrong, please try again later." />);
      } finally {
        setLoading(false);
      }
    }
    fetchAllPosts();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader text="Koble.." />;
  }

  if (postError) {
    return <AlertBad alert="Something went wrong, please try again later." />;
  }

  return (
    <div className="all__posts">
      {allPosts.map(function (post) {
        return (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div className="post">
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
          </Link>
        );
      })}
    </div>
  );
}
