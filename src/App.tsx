import React, { useCallback, useEffect, useState } from "react";
import Navbar from "components/Navbar";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeModal from "./components/EmployeeModal";
import { Employee } from "./services/Employee";
import EmployeeService from "./services/EmployeeService";
import DeleteEmployeeModal from "./components/DeleteEmployeeModal";

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
      // console.log("Retreiving all employees");
    });
  }, []);

  useEffect(() => {
    // To avoid searching on first render
    if (searchEmployeeInput.trim()) {
      try {
        EmployeeService.getEmployeesByName(searchEmployeeInput).then(
          (response) => {
            setEmployees(response.data);
          }
        );
        console.log("Searching employees");
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    }
  }, [searchEmployeeInput]);

  const handleOpenModal = useCallback(
    (modalTitle: string, employee?: Employee) => {
      if (employee) {
        setInitialFormData(employee);
      } else {
        setInitialFormData(undefined);
      }
      setModalTitle(modalTitle);
      setShowModal(true);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback((id: number) => {
    setSelectedEmployeeId(id);
    setShowDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setSelectedEmployeeId(null);
    setShowDeleteModal(false);
  }, []);

  const handleAddEmployee = useCallback((newEmployee: Employee) => {
    setEmployees([...employees, newEmployee]);
  }, []);

  const handleUpdateEmployee = useCallback((updatedEmployee: Employee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  }, []);

  const handleDeleteEmployee = useCallback(async () => {
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
  }, [selectedEmployeeId, handleCloseDeleteModal]);

  const handleSearchEmployeeInput = useCallback((name: string) => {
    setSearchEmployeeInput(name);
  }, []);

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
