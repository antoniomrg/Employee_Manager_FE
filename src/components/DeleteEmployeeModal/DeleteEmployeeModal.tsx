import React, { useState } from "react";

import { Button, Spinner } from "react-bootstrap";
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
  console.log("Rendering Delete Modal");

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDeleteEmployee();
      handleClose();
    } catch (error) {
      console.log("Error deleting employee", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Employee</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this Employee?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Deleting…
            </>
          ) : (
            "Confirm deletion"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(DeleteEmployeeModal);
