import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";
import getLocalstorageInfo from "../../context/useLocalstorage";
import { AlertBad } from "./Alert";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";

export default function ProfilePic(props) {
  const userName = getLocalstorageInfo("auth").name;
  const pic_URL = BASE_URL + `/social/profiles/${userName}`;
  const [pict, setPict] = useState("");
  const [errorPic, setErrorPic] = useState(null);
  const [loadingPic, setLoadingPic] = useState(true);
  const authent = useAxios();

  (async function picturo() {
    try {
      const response = await authent.get(pic_URL);
      setPict(response.data.avatar);
    } catch (error) {
      console.log(error.toString());
      setErrorPic("Something went wrong");
    } finally {
      setLoadingPic(false);
    }
  })();

  if (loadingPic) {
    return <Loader />;
  }

  if (errorPic) {
    return <AlertBad />;
  }

  return <Image src={pict} alt={props.alt} className="img-fluid avatar--main " />;
}
ProfilePic.propTypes = {
  alt: PropTypes.string,
};
