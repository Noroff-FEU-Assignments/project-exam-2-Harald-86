import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";
import { Link } from "react-router-dom";
import Heading from "../common/Heading";
import { FaCommentDots, FaRegUserCircle } from "react-icons/fa";

const allUsersUrl = BASE_URL + "/social/profiles?sortOrder=asc";
console.log("all users :", allUsersUrl);

export default function GetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loadUsers, setLoadUsers] = useState(true);
  const [userError, setUserError] = useState(null);

  const auth = useAxios();

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const userResponse = await auth.get(allUsersUrl);
        setAllUsers(userResponse.data);
      } catch (error) {
        console.log(error.toString());
        setUserError(error.toString());
      } finally {
        setLoadUsers(false);
      }
    }
    fetchAllUsers();
    // eslint-disable-next-line
  }, []);

  if (loadUsers) {
    return <Spinner animation="border" />;
  }

  if (userError) {
    return <div className="message__error">Something went wrong, please try again later</div>;
  }

  return (
    <div className="allUsers">
      {allUsers.map(function (user) {
        return (
          <Link to={`/users/${user.name}`} key={user.name} style={{ textDecoration: "none" }}>
            <div className="user">
              <div className="user__head">
                {user.avatar ? (
                  <img src={user.avatar} className="user__avatar" alt="" />
                ) : (
                  <img
                    src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="user__avatar"
                    alt=""
                  />
                )}
              </div>
              <div className="user__body">
                <div className="user__body__info">
                  <span>
                    <FaRegUserCircle /> {user._count.followers}
                  </span>
                  <span>
                    <FaCommentDots /> {user._count.posts}
                  </span>
                </div>
                <div className="user__body__title">
                  <Heading size="5" title={user.name} />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
