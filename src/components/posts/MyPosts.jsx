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
import GetFollowNumbers from "../profile/FollowedNumbers";
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
  const [modalShowTwo, setModalShowTwo] = useState(false);

  return (
    <div className="post">
      <div className="post__panel">
        <Button
          onClick={() => {
            setModalShowTwo(true);
          }}
        >
          {" "}
          Say something
        </Button>
        <GetFollowNumbers />
      </div>
      <KobleModal show={modalShowTwo} onHide={() => setModalShowTwo(false)} title="Shout! | Koble">
        <CreatePost posts={fetchMyPosts} />
      </KobleModal>
      {testPost.map((myposts) => {
        return (
          <div className="post__card" key={myposts.id}>
            <Link to={`/posts/${myposts.id}`}>
              <div
                className="post__image"
                style={{
                  backgroundImage: myposts.media ? `url(${myposts.media})` : `url(http://placeimg.com/640/360/any)`,
                }}
              >
                {" "}
              </div>
            </Link>
            <div className="post__body">
              <div className="post__title">{myposts.title}</div>
              <div className="post__text"> {myposts.body}</div>
            </div>
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
