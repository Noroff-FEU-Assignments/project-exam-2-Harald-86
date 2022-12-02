import useAxios from "../../../hooks/useAxios";
import { BASE_URL } from "../../../constants/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { FaCommentDots } from "react-icons/fa";

export default function GetUserPosts({ user }) {
  const [posts, setPosts] = useState([]);
  const auth = useAxios();

  const Posts_URL = BASE_URL + `/social/profiles/${user}/posts`;

  async function fetchPosts() {
    try {
      const respone_post = await auth.get(Posts_URL);

      setPosts(respone_post.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  console.log(Posts_URL);
  return (
    <div className="post">
      {posts.map((post) => {
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
              <div className="post__date"> {moment(post.created).format("DD MMM YYYY")}</div>
              <div className="post__title">{post.title}</div>
              <div className="post__text"> {post.body}</div>
            </div>
            <div className="post__footer">
              <Link to={`/posts/${post.id}`}>
                <Button className="btn-secondary cta post__footer__cta">View</Button>
              </Link>
              <div className="post__footer__count">
                <FaCommentDots /> {post._count.comments}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* 
<div className="post__card" key={following.id}>
              <div className="post__head">
                <Link to={`/posts/${following.id}`}>
                  <div
                    className="post__image"
                    style={{
                      backgroundImage: following.media
                        ? `url(${following.media})`
                        : `url(http://placeimg.com/640/360/any)`,
                    }}
                  >
                    {" "}
                  </div>
                </Link>
              </div>
              <div className="post__body">
                <div className="post__user">{following.author.name}</div>
                <div className="post__date"> {moment(following.created).format("DD MMM YYYY")}</div>
                <div className="post__title">{following.title}</div>
                <div className="post__text"> {following.body}</div>
              </div>
              <div className="post__footer">
                <Link to={`/posts/${following.id}`}>
                  <Button className="btn-secondary cta post__footer__cta">View</Button>
                </Link>
                <div className="post__footer__count">
                  <FaCommentDots /> {following._count.comments}
                </div>
              </div>
            </div> */
