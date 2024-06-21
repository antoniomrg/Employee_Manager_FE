import Navbar from "components/Navbar";
import {
  useCreateEmployee,
  useDeleteEmployee,
  useGetAllEmployees,
  useGetEmployeesByName,
  useUpdateEmployee,
} from "hooks";
import React, { useCallback, useMemo, useState } from "react";
import DeleteEmployeeModal from "./components/DeleteEmployeeModal";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeModal from "./components/EmployeeModal";
import FloatingAddButton from "components/FloatingAddButton/FloatingAddButton";
import { Employee } from "./services/Employee";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { showToast } from "utils/toastUtils";

const App: React.FC = () => {
  const { employees, isLoading, isError, error } = useGetAllEmployees();
  const { createEmployee } = useCreateEmployee();
  const { deleteEmployee } = useDeleteEmployee();
  const { updateEmployee } = useUpdateEmployee();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
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

  const handleOpenDeleteModal = useCallback((id: number) => {
    setSelectedEmployeeId(id);
    setShowDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setSelectedEmployeeId(null);
    setShowDeleteModal(false);
  }, []);

  const handleAddEmployee = useCallback(
    (newEmployee: Employee) => {
      createEmployee(newEmployee);
      showToast("Employee added successfully", "success");
    },
    [createEmployee]
  );

  const handleUpdateEmployee = useCallback(
    (updatedEmployee: Employee) => {
      updateEmployee(updatedEmployee);
      showToast("Employee edited successfully", "success");
    },
    [updateEmployee]
  );

  const handleDeleteEmployee = useCallback(() => {
    if (selectedEmployeeId !== null) {
      deleteEmployee(selectedEmployeeId);
      handleCloseDeleteModal();
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
      />
      <FloatingAddButton show={showModal} handleOpenModal={handleOpenModal} />
    </>
  );
};

export default App;
