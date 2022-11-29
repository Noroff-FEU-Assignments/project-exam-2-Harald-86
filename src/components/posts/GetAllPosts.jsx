import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";
import { AlertBad } from "../common/Alert";
import Button from "react-bootstrap/Button";

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
    <div className="posts">
      {allPosts.map(function (post) {
        return (
          <div className="post__card" key={post.id}>
            <div className="post__head">
              <Link to={`/posts/${post.id}`}>
                <div
                  className="post__image"
                  style={{
                    backgroundImage: post.media ? `url(${post.media})` : `url(http://placeimg.com/640/360/any)`,
                  }}
                >
                  {" "}
                </div>
              </Link>
            </div>
            <div className="post__body">
              <div className="post__user">{post.author.name}</div>
              <div className="post__title">{post.title}</div>
              <div className="post__text"> {post.body}</div>
            </div>
            <div className="post__footer">
              <Link to={`/posts/${post.id}`}>
                <Button>View</Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
