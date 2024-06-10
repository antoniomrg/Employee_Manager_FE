import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import EmployeeCard from "./EmployeeCard";
import EmployeeModal from "./EmployeeModal";
import { Employee } from "./services/Employee";
import EmployeeService from "./services/EmployeeService";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [initialFormData, setInitialFormData] = useState<Employee | undefined>(
    undefined
  );
  const [searchEmployeeInput, setSearchEmployeeInput] = useState("");
  const [foundEmployees, setFoundEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // Fetch employees on component mount
    EmployeeService.getAllEmployees().then((response) => {
      setEmployees(response.data);
    });
  }, []);

  useEffect(() => {
    if (searchEmployeeInput !== null) {
      try {
        EmployeeService.getEmployeesByName(searchEmployeeInput).then(
          (response) => {
            setEmployees(response.data);
          }
        );
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    }
  }, [searchEmployeeInput]);

  const handleOpenModal = (modalTitle: string, employee?: Employee) => {
    if (employee) {
      setInitialFormData(employee);
    } else {
      setInitialFormData(undefined);
    }
    setModalTitle(modalTitle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenDeleteModal = (id: number) => {
    setSelectedEmployeeId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedEmployeeId(null);
    setShowDeleteModal(false);
  };

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees([...employees, newEmployee]);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  const handleDeleteEmployee = async () => {
    if (selectedEmployeeId !== null) {
      try {
        await EmployeeService.deleteEmployee(selectedEmployeeId);
        setEmployees(
          employees.filter((employee) => employee.id !== selectedEmployeeId)
        );
        handleCloseDeleteModal();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleSearchEmployeeInput = (name: string) => {
    setSearchEmployeeInput(name);
  };

  return (
    <>
      <Navbar
        handleOpenModal={handleOpenModal}
        handleSearchEmployeeInput={handleSearchEmployeeInput}
      />
      <EmployeeModal
        show={showModal}
        handleClose={handleCloseModal}
        onAddEmployee={handleAddEmployee}
        onUpdateEmployee={handleUpdateEmployee}
        modalTitle={modalTitle}
        initialFormData={initialFormData}
      />
      <EmployeeCard
        employees={employees}
        show={showDeleteModal}
        handleOpenDeleteModal={handleOpenDeleteModal}
        handleOpenModal={handleOpenModal}
      />
      <DeleteEmployeeModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        onDeleteEmployee={handleDeleteEmployee}
      />
      {/* <EmployeeList /> */}
    </>
  );
};

export default App;
