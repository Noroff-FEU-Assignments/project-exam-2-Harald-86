import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";

/* import * as yup from "yup";
import ValidationError from "yup/lib/ValidationError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; */

import { BASE_URL } from "../../constants/api";
/* import { useParams } from "react-router-dom"; */

const POSTS_URL = BASE_URL + "/social/posts?_author=true&_comments=true&_reactions=true";

/* const schema = yup.object().shape({
  body: yup.string().required("Some text is required"),
}); */

export default function GetAllPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postError, setPostError] = useState(null);
  /* const [commentError, setCommentError] = useState(null); */
  /*  const [postId, setPostId] = useState(""); */

  /*  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  }); */

  const HTTP = useAxios();

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await HTTP.get(POSTS_URL);
        setAllPosts(response.data);
        /* setPostId(response.data.id); */
      } catch (error) {
        setPostError(<div className="message--error">Ops! There might be a problem, please try again later</div>);
      } finally {
        setLoading(false);
      }
    }
    fetchAllPosts();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (postError) {
    return <div className="message--error">Ops! There might be a problem, please try again later</div>;
  }
  /*   const COMMENT_URL = BASE_URL + ` /api/v1/social/posts/${postId}/comment`; */
  /*   console.log(COMMENT_URL); */

  /*   async function comment(data) {
    console.log(data);
    try {
      const addComment = await HTTP.post(`/api/v1/social/posts/comment`, data);
      console.log("comment work? :", addComment);
    } catch (error) {
      console.log("comment error :", error.toString());
      setCommentError("Error, please try again later");
    } finally {
      setLoading(false);
    }
  } */

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
