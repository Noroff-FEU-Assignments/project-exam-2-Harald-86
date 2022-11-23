import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { FollowProfile, UnfollowProfile } from "../Follow";
import Heading from "../../common/Heading";
import getLocalstorageInfo from "../../../context/useLocalstorage";
import ValidationError from "../../common/FormError";
import Button from "react-bootstrap/Button";

export default function UserDetails() {
  let { name } = useParams();
  const auth = useAxios();
  const URL = BASE_URL + `/social/profiles/${name}`;
  const you = getLocalstorageInfo("auth").name;

  const [userDetail, setUserDetail] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await auth.get(URL);
        console.log("responseOne", response.data);
        setUserDetail(response.data);
      } catch (error) {
        console.log(error.toString());
      }
    }
    fetchUserDetails();
  }, []);

  useEffect(() => {
    async function checkMe() {
      try {
        const responseTwo = await auth.get(BASE_URL + `/social/profiles/${you}?_following=true`);
        setFollowing(responseTwo.data.following);
      } catch (error) {
        console.log(error);
      }
    }
    checkMe();
  }, []);

  console.log(userDetail.name);
  console.log(following);

  const doesFollow = following.map((follow) => {
    console.log(follow.name);

    return follow.name;
  });

  console.log("do i follow?", doesFollow);

  const iFollow = doesFollow.includes(userDetail.name);

  console.log("correct button?", iFollow);

  return <div>{iFollow ? <UnfollowProfile /> : <FollowProfile />}</div>;
  /*   return <div>{iFollow ? <UnfollowProfile /> : <FollowProfile />}</div>; */
}
