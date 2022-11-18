import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

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
            <Navbar.Brand href="/dashboard">koble</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-nav-bar">
              <Nav className="mx-auto">
                <Nav.Link href="/profile">{userName.name}</Nav.Link>
                <Nav.Link href="/dashboard">Home</Nav.Link>
                <Nav.Link href="/posts">All posts</Nav.Link>
                <Nav.Link href="/users">Explore Users</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link href="/">
                  <button onClick={logout}>Log out</button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      ) : (
        <>
          <Navbar bg="primary" expand="md">
            <Navbar.Brand href="/">koble</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-nav-bar">
              <Nav className="mx-auto">
                <Nav.Link href="/register">Create account?</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      )}
    </>
  );
}

export default NavBar;
