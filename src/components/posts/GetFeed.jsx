import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import getLocalstorageInfo from "../../context/useLocalstorage";
import KobleModal from "../common/Modal";
import CreatePost from "./CreatePost";
import moment from "moment";
import { FaCommentDots } from "react-icons/fa";
import Loader from "../common/Loader";
import { AlertBad } from "../common/Alert";

export default function GetFeed() {
  const auth = useAxios();
  const followingPosts_URL = BASE_URL + "/social/posts/following?_author=true";
  const me = getLocalstorageInfo("auth").name;
  const [followingPosts, setFollowingPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [combinedResults, setCombinedResults] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("combined array", combinedResults);

  async function fetchMyPosts() {
    try {
      const response_ONE = await auth.get(BASE_URL + `/social/profiles/${me}/posts?_author=true`);
      console.log("response one", response_ONE);
      setMyPosts(response_ONE.data);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  async function fetchPosts() {
    try {
      const response_TWO = await auth.get(followingPosts_URL);
      console.log("data from following fetch", response_TWO.data);
      setFollowingPosts(response_TWO.data);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPosts();
    fetchMyPosts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCombinedResults([...followingPosts, ...myPosts]);
  }, [myPosts, followingPosts]);

  if (loading) {
    <Loader />;
  }

  if (error) {
    <AlertBad>Something went wrong, please try again later.</AlertBad>;
  }
  return (
    <div className="post">
      <div className="post__panel">
        <Button
          className="cta btn-secondary btn"
          onClick={() => {
            setModalShow(true);
          }}
        >
          {" "}
          NEW SHOUT!
        </Button>
        <div className="post__panel--text">Friends are shouting</div>
      </div>
      <KobleModal show={modalShow} onHide={() => setModalShow(false)} title="Shout! | Koble">
        <CreatePost posts={fetchMyPosts} />
      </KobleModal>
      {[...combinedResults]
        .sort((a, b) => b.id - a.id)
        .map((following) => {
          return (
            <div className="post__card" key={following.id}>
              <div className="post__head">
                {following.media ? (
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
                      :{" "}
                    </div>
                  </Link>
                ) : (
                  <div style={{ display: "none" }}>No media included</div>
                )}
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
            </div>
          );
        })}
    </div>
  );
}
