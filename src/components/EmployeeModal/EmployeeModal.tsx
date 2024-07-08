import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Employee, Employees } from "../../interfaces/Employee";
import EmployeeService from "../../services/EmployeeService";

import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  onAddEmployee: (employee: Employee) => void;
  onUpdateEmployee: (updatedEmployee: Employee) => void;
  modalTitle: string;
  initialFormData?: Employee;
}

const EmployeeModal: React.FC<ModalProps> = ({
  show,
  handleClose,
  onAddEmployee,
  onUpdateEmployee,
  modalTitle,
  initialFormData,
}) => {
  console.log("Modal rendered");

  const initialFormState: Employee = {
    id: 0,
    name: "",
    email: "",
    jobTitle: "",
    phone: "",
    imageUrl: "",
  };

  const [formData, setFormData] = useState<Employee>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    } else {
      setFormData(initialFormState);
    }
  }, [initialFormData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      if (formData.id) {
        // Editing an existing employee
        const response = await EmployeeService.updateEmployee(formData);
        onUpdateEmployee(response.data);
      } else {
        // Adding a new employee
        const response = await EmployeeService.createEmployee(formData);
        onAddEmployee(response.data);
      }
      handleClose();
    } catch (err) {
      console.error(
        `Error ${formData.id ? "updating" : "adding"} employee`,
        err
      );
      setError(`Error ${formData.id ? "updating" : "adding"} employee`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobTitle">Job title</label>
              <input
                type="text"
                name="jobTitle"
                className="form-control"
                id="jobTitle"
                placeholder="Job title"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                id="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                className="form-control"
                id="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={loading}
              >
                Close
              </Button>

              <Button variant="primary" type="submit">
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Adding…
                  </>
                ) : modalTitle === "Add Employee" ? (
                  "Add Employee"
                ) : (
                  "Edit Employee"
                )}
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(EmployeeModal);
