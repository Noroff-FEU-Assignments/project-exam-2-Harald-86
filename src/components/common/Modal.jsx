import Modal from "react-bootstrap/Modal";

export default function KobleModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="update post" centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
}
