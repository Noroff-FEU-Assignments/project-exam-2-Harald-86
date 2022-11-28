import { BASE_URL } from "../../constants/api";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteButton({ id, renew }) {
  const delete_URL = BASE_URL + `/social/posts/${id}`;
  const auth = useAxios();

  const [deleteError, setDeleteError] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function deleteEntry() {
    try {
      const response = await auth.delete(delete_URL);
      console.log("delete post?", response);
      renew();
    } catch (error) {
      console.log(deleteError);
      setDeleteError(error.toString());
    } finally {
    }
  }

  return (
    <>
      <Button variant="btn btn-danger cta" onClick={handleShow}>
        Delete Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No!!
          </Button>
          <Button variant="btn btn-danger cta" onClick={deleteEntry}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
