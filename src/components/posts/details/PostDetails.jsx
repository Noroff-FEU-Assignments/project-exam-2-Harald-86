import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants/api";
import useAxios from "../../../hooks/useAxios";
import Loader from "../../common/Loader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationError from "../../common/FormError";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import moment from "moment/moment";
import { FaTachometerAlt } from "react-icons/fa";
import ReactToPost from "../Reaction";

import KobleModal from "../../common/Modal";

const schema = yup.object().shape({
  body: yup.string().required("Please add a comment to comment...."),
});

export default function GetPostDetails() {
  const [postDetail, setPostDetail] = useState([]);
  const [commentDetail, setCommentDetail] = useState([]);
  const [loadPostDetail, setLoadPostDetail] = useState(true);
  const [errorDetail, setErrorDetail] = useState(null);
  const [modalShow, setModalShow] = useState(false);

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
    // eslint-disable-next-line
  }, []);

  const COMMENT_URL = BASE_URL + `/social/posts/${id}/comment`;
  console.log(COMMENT_URL);

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
      <div className="banner detail__banner">
        {postDetail.media ? (
          <img className="banner detail__banner" src={postDetail.media} alt="" />
        ) : (
          <img
            src="https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="this post has no media"
            className="banner detail__banner"
          />
        )}
      </div>
      <div className="detail__user">
        <Link to={`/users/${postDetail.author.name}`}>
          <img src={postDetail.author.avatar} alt="Koble user" className="avatar" />
        </Link>
      </div>
      <div className="detail__body">
        <h2 className="detail__body__title">{postDetail.title}</h2>
        <p className="detail__body__text">{postDetail.body}</p>
        <p className="detail__published">Published: {moment(postDetail.created).format("DD MMM YYYY")}</p>
        <hr />
        <div className="detail__body__info">
          <div>
            <FaTachometerAlt
              className="detail__reactions"
              onClick={() => {
                setModalShow(true);
              }}
            />
          </div>
          <KobleModal show={modalShow} onHide={() => setModalShow(false)} title="Reactions from other users">
            {postDetail.reactions.map((reaction) => {
              console.log("rea", reaction);
              return (
                <div key={reaction.symbol}>
                  {reaction.symbol}
                  {reaction.count}
                </div>
              );
            })}
          </KobleModal>
          <div>
            <ReactToPost post={postDetail.id} />
          </div>

          <hr />
          <div className="comment">
            <div className="comment__head">
              <Form>
                <Form.Control as="textarea" name="body" placeholder="Shout back" {...register("body")} />
                <Button className="btn-secondary btn cta" onClick={handleSubmit(handleComment)}>
                  Comment
                </Button>
              </Form>
            </div>
            <div className="comment">
              {commentDetail.map((getComments) => {
                console.log(getComments);

                return (
                  <div className="comment__body" key={getComments.id}>
                    <h3 className="comment__body__owner">{getComments.owner}</h3>
                    <p className="comment__body__text">{getComments.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
