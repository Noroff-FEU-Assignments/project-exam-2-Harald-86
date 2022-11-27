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

export default function TestPosts() {
  const getUser = getLocalstorageInfo("auth").name;
  const auth = useAxios();
  const mypostsURL = BASE_URL + `/social/profiles/${getUser}/posts`;

  const [testPost, setTestPost] = useState([]);
  const [modalInfo, setModalInfo] = useState({});

  async function fetchTestPosts() {
    try {
      const response = await auth.get(mypostsURL);
      console.log(response);
      setTestPost(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchTestPosts();
  }, []);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="post">
      <CreatePost posts={fetchTestPosts} />
      {testPost.map((myposts) => {
        return (
          <div className="post__card" key={myposts.id}>
            <div className="post__title">{myposts.title}</div>
            <div className="post__body"> {myposts.body}</div>
            <div className="post__footer">
              <Button
                variant="primary"
                onClick={() => {
                  setModalInfo(myposts);
                  setModalShow(true);
                }}
              >
                Edit post
              </Button>
            </div>
          </div>
        );
      })}
      <KobleModal show={modalShow} onHide={() => setModalShow(false)} title="Update post">
        <UpdateModal
          refresh={fetchTestPosts}
          id={modalInfo.id}
          body={modalInfo.body}
          title={modalInfo.title}
          media={modalInfo.media}
        />
      </KobleModal>
    </div>
  );
}
