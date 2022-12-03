import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaUserAlt } from "react-icons/fa";

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);
  const userName = JSON.parse(localStorage.getItem("auth"));

  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/");
  }

  return (
    <>
      {auth ? (
        <>
          <Navbar bg="primary" expand="md">
            <Link className="brand" to="/dashboard">
              koble
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-nav-bar">
              <Nav className="mx-auto">
                <Link to="/profile" title="test">
                  <FaUserAlt className="icon__profile" />
                  {userName.name}
                </Link>
                <Link to="/dashboard">Feed </Link>
                <Link to="/posts">Posts</Link>
                <Link to="/users">Users</Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link href="/">
                  <Button className="btn-secondary" onClick={logout}>
                    Log out
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      ) : (
        <>
          <Navbar bg="primary" expand="md">
            <Link className="brand" to="/">
              koble
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-nav-bar">
              <Nav className="mx-auto">
                <Link to="/register">Create account?</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      )}
    </>
  );
}

export default NavBar;
