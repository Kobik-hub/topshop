import React from "react";
import { Button, Modal } from "react-bootstrap";
import LoginScreen from "../screens/LoginScreen";
const LogInPopup = ({ show, onHide }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginScreen />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogInPopup;
