import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants/api";
import useAxios from "../../../hooks/useAxios";
import Loader from "../../common/Loader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationError from "../../common/FormError";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const schema = yup.object().shape({
  body: yup.string().required("Please add a comment to comment...."),
});

export default function GetPostDetails() {
  const [postDetail, setPostDetail] = useState([]);
  const [commentDetail, setCommentDetail] = useState([]);
  const [loadPostDetail, setLoadPostDetail] = useState(true);
  const [errorDetail, setErrorDetail] = useState(null);

  let { id } = useParams();

  const authenticate = useAxios();

  const POST_DETAIL_URL = BASE_URL + `/social/posts/${id}?_author=true&_comments=true&_reactions=true`;

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const detailResponse = await authenticate.get(POST_DETAIL_URL);
        console.log("is this a array??", detailResponse.data);
        setPostDetail(detailResponse.data);
        setCommentDetail(detailResponse.data.comments);
      } catch (error) {
        console.log(error);
        setErrorDetail(<p className="message__error">Something went wrong, please try again later</p>);
      } finally {
        setLoadPostDetail();
      }
    }
    fetchPostDetails();
  }, []);

  const COMMENT_URL = BASE_URL + `/social/posts/${id}/comment`;
  console.log(COMMENT_URL);

  console.log("comments", commentDetail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleComment(data) {
    async function postComment(data) {
      try {
        const commentResponse = await authenticate.post(COMMENT_URL, data);
        const newComments = await authenticate.get(POST_DETAIL_URL);
        console.log("updated comments?", newComments.data.comments);
        console.log("i made a comment :", commentResponse);
        setCommentDetail(newComments.data.comments);
      } catch (error) {
        console.log(error);
      }
    }
    postComment(data, commentDetail);
  }

  if (loadPostDetail) {
    return <Loader />;
  }

  if (errorDetail) {
    return <div className="message__error"></div>;
  }

  return (
    <div className="detail">
      <Row className="detail__post">
        <Col sm={12} md={6}>
          <img src={postDetail.author.avatar} alt="Koble user" className="detail__head__avatar img-fluid" />
        </Col>
        <Col className="detail__body">
          <h2 className="detail__body__title">{postDetail.title}</h2>
          <p className="detail__body__copy">{postDetail.body}</p>
          <img className="img-fluid" src={postDetail.media} alt="related to the post text " />
        </Col>
      </Row>
      <div className="detail__comment">
        <div className="detail__comment__head">
          <input name="body" placeholder="Comment" {...register("body")} />
          <button onClick={handleSubmit(handleComment)}>Comment</button>
        </div>
        <div className="detail__comment__body">
          {commentDetail.map((getComments) => {
            console.log(getComments);

            return (
              <div key={getComments.id}>
                <h3>{getComments.owner}</h3>
                <p>{getComments.body}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="detail__footer">
        <p className="detail__footer__published">Published: {postDetail.created}</p>
      </div>
    </div>
  );
}
