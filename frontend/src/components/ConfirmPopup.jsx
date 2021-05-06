import React from "react";
import { Modal, Button } from "react-bootstrap";
const ConfirmPopup = ({
  show,
  onHide,
  userName,
  orderId,
  history,
  clearCart,
}) => {
  // console.log(orderId);

  const onClose = () => {
    history.push("/");
    clearCart();
    onHide();
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered
      show={show}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">
          <p className="h2">Hey {userName}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="h2">Your Order is Confirmed!</p>
        <p>Order Number: {orderId}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmPopup;
