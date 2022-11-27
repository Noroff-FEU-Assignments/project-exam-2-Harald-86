import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";
import getLocalstorageInfo from "../../context/useLocalstorage";
import CreatePost from "./CreatePost";
import Heading from "../common/Heading";
import { Link } from "react-router-dom";

export default function TestPosts() {
  const getUser = getLocalstorageInfo("auth").name;
  const auth = useAxios();
  const mypostsURL = BASE_URL + `/social/profiles/${getUser}/posts`;

  const [testPost, setTestPost] = useState([]);

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

  return (
    <div className="post">
      {/* how do i pass props down and up from this? 
    TestPosts is the parent, <CreatePost is the child..
     i need to set the state in parent in onSubmit in CreatePost..  */}
      <CreatePost posts={fetchTestPosts} />

      {testPost.map((myposts) => {
        return (
          <div className="post__card" key={myposts.id}>
            <div className="post__title">{myposts.title}</div>
            <div className="post__body"> {myposts.body}</div>
          </div>
        );
      })}
    </div>
  );
}
