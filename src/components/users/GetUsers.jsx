import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";
import Card from "react-bootstrap/Card";
/* import FollowProfile from "./Follow"; */
import { Link } from "react-router-dom";

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
        console.log("users :", userResponse.data);
      } catch (error) {
        console.log(error.toString());
        setUserError(error.toString());
      } finally {
        setLoadUsers(false);
      }
    }
    fetchAllUsers();
  }, []);

  if (loadUsers) {
    return <Spinner animation="border" />;
  }

  if (userError) {
    return <div className="message--error"></div>;
  }

  return (
    <div className="container">
      {allUsers.map(function (user) {
        return (
          <Link to={`/users/${user.name}`} key={user.name}>
            <Card style={{ width: "18rem" }} className="user">
              <Card.Img variant="top" src={user.avatar} className="user__avatar img-fluid" alt="" />

              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
