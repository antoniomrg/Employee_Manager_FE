import React, { useState } from "react";

import { Alert, Button, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  onDeleteEmployee: () => void;
  employeeName: string | null;
}

const DeleteEmployeeModal: React.FC<ModalProps> = ({
  show,
  handleClose,
  onDeleteEmployee,
  employeeName,
}) => {
  console.log("Rendering Delete Modal");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      // throw new Error();
      await onDeleteEmployee();
      handleClose();
    } catch (err) {
      console.log("Error deleting employee", err);
      setError("Failed to delete employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered autoFocus={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Employee</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Are you sure you want to delete <b>{employeeName}</b>?
        </p>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
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
