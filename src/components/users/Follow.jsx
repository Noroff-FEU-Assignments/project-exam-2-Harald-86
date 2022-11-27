import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Button from "react-bootstrap/Button";

export function FollowProfile() {
  let { name } = useParams();
  const auth = useAxios();

  async function onClickFollow() {
    try {
      const response = await auth.put(`/social/profiles/${name}/follow`);
      console.log("followed", response);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  }

  return (
    <Button onClick={onClickFollow} className="btn-secondary btn">
      Follow
    </Button>
  );
}

export function UnfollowProfile() {
  let { name } = useParams();
  const auth = useAxios();

  async function onClickUnfollow() {
    try {
      const response = await auth.put(`/social/profiles/${name}/unfollow`);
      console.log("unfollowed", response);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  }

  return (
    <Button className="btn-secondary btn" onClick={onClickUnfollow}>
      Unfollow
    </Button>
  );
}
