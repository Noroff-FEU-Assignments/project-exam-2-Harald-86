/* import Layout from "./components/layout/Layout"; */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Bootstrap
import Container from "react-bootstrap/Container";
// Components
import NavBar from "./components/common/Nav";
import Footer from "./components/footer/Footer";
// Routes
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Posts from "./components/posts/Posts";
import Dashboard from "./components/dashboard/main";
import Users from "./components/users/Users";
import Profile from "./components/profile/Profile";
import GetPostDetails from "./components/posts/details/PostDetails";
import { AuthProvider } from "./context/AuthContext";
import "./App.scss";
import UserDetails from "./components/users/details/UserDetails";

function App() {
  return (
    <AuthProvider>
      {/* <Layout></Layout> */}
      <Router>
        <NavBar />
        <div className="wrapper app">
          <Container>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/posts" element={<Posts />}></Route>
              <Route path="/posts/:id" element={<GetPostDetails />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/users/:name" element={<UserDetails />}></Route>
              <Route path="*" element={<Dashboard />}></Route>
              {/*  istead of 404 this redirects to the "dashboard/Feed*/}
            </Routes>
          </Container>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
