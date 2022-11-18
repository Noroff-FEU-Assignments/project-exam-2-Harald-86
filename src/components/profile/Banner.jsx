import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import useAxios from "../../hooks/useAxios";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { FaCameraRetro } from "react-icons/fa";
import { BASE_URL } from "../../constants/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import ValidationError from "../common/FormError";
import getLocalstorageInfo from "../../context/useLocalstorage";

const schema = yup.object().shape({
  banner: yup.string().required("Please provide valid image url."),
});

export default function Banner() {
  const authorized = useAxios();
  const userBanner = getLocalstorageInfo("auth").name;
  const bannerUrl = BASE_URL + `/social/profiles/${userBanner}/media`;
  const myProfileUrl = BASE_URL + `/social/profiles/${userBanner}?_following=true&_followers=true`;
  const placeholderColour = {
    color: "white",
  };
  const [banner, setBanner] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [mediaError, setMediaError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  (async function getProfile() {
    try {
      const profileDetails = await authorized.get(myProfileUrl);
      setBanner(profileDetails.data.banner);
    } catch (error) {
      console.log("Profile details error ", error.toString());
    }
  })();

  async function bannerSubmit(data) {
    try {
      const bannerResponse = await authorized.put(bannerUrl, data);
      console.log("bannner put :", bannerResponse.data.banner);
      setBanner(bannerResponse.data.banner);
    } catch (error) {
      console.log("Error :", error);
      setMediaError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Row className="profile_banner" style={{ backgroundImage: banner ? `url(${banner})` : placeholderColour.color }}>
      <FaCameraRetro className="editBanner" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(bannerSubmit)}>
            {mediaError && <ValidationError>{mediaError}</ValidationError>}
            <fieldset disabled={submitting}>
              <Form.Group>
                <Form.Control name="banner" placeholder="Image url.." {...register("banner")} />
                {errors.banner && <ValidationError>{errors.banner.message}</ValidationError>}
              </Form.Group>
              <Button type="submit" onClick={handleClose} variant="secondary">
                {submitting ? "Updating." : "Update"}
              </Button>
            </fieldset>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
