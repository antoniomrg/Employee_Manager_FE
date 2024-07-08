import EmployeeService from "../services/EmployeeService";
import { useCallback, useEffect, useState } from "react";
import { Employee } from "../interfaces/Employee";

const useUpdateEmployee = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState("");

  const updateEmployee = useCallback(async (updatedEmployee: Employee) => {
    setIsLoading(true);
    setIsError(false);
    setError("");
    try {
      await EmployeeService.updateEmployee(updatedEmployee);
    } catch (error) {
      setError("Error updating employee");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { updateEmployee, isLoading, isError };
};

export default useUpdateEmployee;
