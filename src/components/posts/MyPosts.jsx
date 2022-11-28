import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";
import getLocalstorageInfo from "../../context/useLocalstorage";
import CreatePost from "./CreatePost";
import Heading from "../common/Heading";
import { Link } from "react-router-dom";
import UpdateModal from "./changePost";
import Button from "react-bootstrap/Button";
import KobleModal from "../common/Modal";
import DeleteButton from "./DeletePost";

export default function MyPosts() {
  const getUser = getLocalstorageInfo("auth").name;
  const auth = useAxios();
  const mypostsURL = BASE_URL + `/social/profiles/${getUser}/posts`;

  const [testPost, setTestPost] = useState([]);
  const [modalInfo, setModalInfo] = useState({});

  async function fetchMyPosts() {
    try {
      const response = await auth.get(mypostsURL);
      console.log(response);
      setTestPost(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMyPosts();
  }, []);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="post">
      <CreatePost posts={fetchMyPosts} />
      {testPost.map((myposts) => {
        return (
          <div className="post__card" key={myposts.id}>
            <Link to={`/posts/${myposts.id}`}>
              {" "}
              {myposts.media ? (
                <img src={myposts.media} className="img-fluid post__img" alt="post art" />
              ) : (
                <img
                  src="http://placeimg.com/640/360/any"
                  className="img-fluid post__img"
                  alt="this is a random generated placeholder"
                />
              )}
            </Link>
            <div className="post__title">{myposts.title}</div>
            <div className="post__body"> {myposts.body}</div>
            <div className="post__footer">
              <Link to={`/posts/${myposts.id}`}>
                <Button>View</Button>
              </Link>
              <Button
                variant="primary"
                onClick={() => {
                  setModalInfo(myposts);
                  setModalShow(true);
                }}
              >
                Edit post
              </Button>
              <DeleteButton id={myposts.id} renew={fetchMyPosts} />
            </div>
          </div>
        );
      })}
      <KobleModal show={modalShow} onHide={() => setModalShow(false)} title="Update post">
        <UpdateModal
          refresh={fetchMyPosts}
          id={modalInfo.id}
          body={modalInfo.body}
          title={modalInfo.title}
          media={modalInfo.media}
        />
      </KobleModal>
    </div>
  );
}
