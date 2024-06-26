import FloatingAddButton from "components/FloatingAddButton/FloatingAddButton";
import Navbar from "components/Navbar";
import {
  useCreateEmployee,
  useDeleteEmployee,
  useGetAllEmployees,
  useUpdateEmployee,
} from "hooks";
import React, { useCallback, useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import { showToast } from "utils/toastUtils";
import DeleteEmployeeModal from "./components/DeleteEmployeeModal";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeModal from "./components/EmployeeModal";
import { Employee } from "./services/Employee";
import { Alert } from "react-bootstrap";

const App: React.FC = () => {
  const { employees, isLoading, isError, error, fetchEmployees } =
    useGetAllEmployees();
  const { createEmployee } = useCreateEmployee();
  const { deleteEmployee } = useDeleteEmployee();
  const { updateEmployee } = useUpdateEmployee();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<
    string | null
  >(null);
  const [initialFormData, setInitialFormData] = useState<Employee | undefined>(
    undefined
  );
  const [searchEmployeeInput, setSearchEmployeeInput] = useState("");

  const handleOpenModal = useCallback(
    (modalTitle: string, employee?: Employee) => {
      if (employee) {
        setInitialFormData(employee);
      } else {
        setInitialFormData(undefined);
      }
      setModalType(modalTitle);
      setShowModal(true);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback((id: number, name: string) => {
    setSelectedEmployeeId(id);
    setSelectedEmployeeName(name);
    setShowDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setSelectedEmployeeId(null);
    setSelectedEmployeeName(null);
    setShowDeleteModal(false);
  }, []);

  const handleAddEmployee = useCallback(
    async (newEmployee: Employee) => {
      await createEmployee(newEmployee);
      fetchEmployees(); // Fetch the updated list of employees
      showToast("Employee added successfully", "success");
    },
    [createEmployee]
  );

  const handleUpdateEmployee = useCallback(
    (updatedEmployee: Employee) => {
      updateEmployee(updatedEmployee);
      fetchEmployees();
      showToast("Employee edited successfully", "success");
    },
    [updateEmployee]
  );

  const handleDeleteEmployee = useCallback(async () => {
    if (selectedEmployeeId !== null) {
      await deleteEmployee(selectedEmployeeId);
      handleCloseDeleteModal();
      fetchEmployees();
      showToast("Employee deleted successfully", "success");
    }
  }, [selectedEmployeeId, deleteEmployee, handleCloseDeleteModal]);

  const handleSearchEmployeeInput = useCallback((name: string) => {
    setSearchEmployeeInput(name);
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!searchEmployeeInput.trim()) {
      return employees;
    }
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchEmployeeInput.toLowerCase())
    );
  }, [employees, searchEmployeeInput, handleAddEmployee]);

  return (
    <>
      <ToastContainer />
      <Navbar handleSearchEmployeeInput={handleSearchEmployeeInput} />

      {filteredEmployees.length === 0 && (
        <Alert variant="info">Sorry, no employees match your search</Alert>
      )}

      <EmployeeModal
        show={showModal}
        handleClose={handleCloseModal}
        onAddEmployee={handleAddEmployee}
        onUpdateEmployee={handleUpdateEmployee}
        modalTitle={modalType}
        initialFormData={initialFormData}
      />
      <EmployeeCard
        employees={filteredEmployees}
        show={showDeleteModal}
        handleOpenDeleteModal={handleOpenDeleteModal}
        handleOpenModal={handleOpenModal}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error}
      />
      <DeleteEmployeeModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        onDeleteEmployee={handleDeleteEmployee}
        employeeName={selectedEmployeeName}
      />
      <FloatingAddButton show={showModal} handleOpenModal={handleOpenModal} />
    </>
  );
};

export default App;
