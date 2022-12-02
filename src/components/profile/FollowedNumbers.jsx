import useAxios from "../../hooks/useAxios";
import getLocalstorageInfo from "../../context/useLocalstorage";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/api";
import { Link } from "react-router-dom";
import KobleModal from "../common/Modal";
import { GetFollowerProfiles, GetFollowingProfiles } from "./SmallProfiles";

export default function GetFollowNumbers() {
  const me = getLocalstorageInfo("auth").name;
  const followerInfo_URL = BASE_URL + `/social/profiles/${me}?_following=true&_followers=true`;
  const auth = useAxios();

  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalSecond, setShowModalSecond] = useState(false);
  const [profileList, setProfileList] = useState([]);

  async function checkForFollowDetails() {
    try {
      const response = await auth.get(followerInfo_URL);
      console.log("count", response.data._count.followers);
      setFollowers(response.data._count.followers);
      setFollowing(response.data._count.following);
    } catch (error) {
      console.log(error.toString());
    }
  }

  async function getProfiles() {
    try {
      const response = await auth.get(followerInfo_URL);
      console.log("display followers", response.data.following);
      setProfileList(response.data.following);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkForFollowDetails();
    getProfiles();
  }, []);

  return (
    <>
      <div className="count">
        <p onClick={() => setShowModal(true)}>
          Following : <span className="count__details">{following}</span>
        </p>

        <p className="count__fix" onClick={() => setShowModalSecond(true)}>
          Followers :<span className="count__details"> {followers}</span>
        </p>
      </div>

      <KobleModal show={showModal} onHide={() => setShowModal(false)} title="Following | Koble">
        <GetFollowingProfiles user={me} />
      </KobleModal>
      <KobleModal show={showModalSecond} onHide={() => setShowModalSecond(false)} title="Followers | Koble">
        <GetFollowerProfiles user={me} />
      </KobleModal>
    </>
  );
}
