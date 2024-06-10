import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  onDeleteEmployee: () => void;
}

const DeleteEmployeeModal: React.FC<ModalProps> = ({
  show,
  handleClose,
  onDeleteEmployee,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Employee</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this Employee?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onDeleteEmployee}>
          Confirm deletion
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEmployeeModal;
