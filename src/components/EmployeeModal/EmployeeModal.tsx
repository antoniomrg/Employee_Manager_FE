import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Employee } from "@serv/Employee";
import EmployeeService from "../../services/EmployeeService";

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
  const [formData, setFormData] = useState<Employee>({
    id: 0,
    name: "",
    email: "",
    jobTitle: "",
    phone: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    } else {
      setFormData({
        id: 0,
        name: "",
        email: "",
        jobTitle: "",
        phone: "",
        imageUrl: "",
      });
    }
  }, [initialFormData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      // Editing an existing employee
      try {
        const response = await EmployeeService.updateEmployee(formData);
        onUpdateEmployee(response.data);
        handleClose();
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    } else {
      // Adding a new employee
      try {
        const response = await EmployeeService.createEmployee(formData);
        onAddEmployee(response.data);
        handleClose();
      } catch (error) {
        console.error("Error creating employee:", error);
      }
    }
  };

  return (
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
            />
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {modalTitle === "Add Employee" ? "Add Employee" : "Edit Employee"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeModal;
