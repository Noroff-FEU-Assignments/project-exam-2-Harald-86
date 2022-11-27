import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { BASE_URL } from "../../constants/api";
import useAxios from "../../hooks/useAxios";
import avatarplaceholder from "../../images/avatarplaceholder.png";
import ValidationError from "../common/FormError";

const schema = yup.object().shape({
  avatar: yup.string().required("Please provide valid image url."),
});

export default function Avatar() {
  const authorized = useAxios();
  const getAvatar = JSON.parse(localStorage.getItem("auth"));
  const userAvatar = getAvatar.name;
  const myAvatarUrl = BASE_URL + `/social/profiles/${userAvatar}?following=true&_followers=true`;
  const avatarUrl = BASE_URL + `/social/profiles/${userAvatar}/media`;

  const [avatar, setAvatar] = useState(null);
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

  (async function getAvatar() {
    try {
      const avatarDetails = await authorized.get(myAvatarUrl);
      setAvatar(avatarDetails.data.avatar);
    } catch (error) {
      console.log(error);
    }
  })();

  async function avatarSubmit(data, e) {
    console.log("url submittet :", data);
    try {
      const response = await authorized.put(avatarUrl, data);
      setAvatar(response.data.avatar);
      e.target.reset();
    } catch (error) {
      console.log("error", error.toString());
      setMediaError("Image must be from a valid url");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Image
        src={avatar ? avatar : avatarplaceholder}
        className="avatar img-fluid"
        alt="This is your avatar"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change profile picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(avatarSubmit)}>
            {mediaError && <ValidationError>{mediaError}</ValidationError>}
            <fieldset disabled={submitting}>
              <Form.Group>
                <Form.Control name="avatar" placeholder="Image url.." {...register("avatar")} />
                {errors.avatar && <ValidationError>{errors.avatar.message}</ValidationError>}
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
    </>
  );
}
