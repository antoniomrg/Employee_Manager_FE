import { useState, useEffect, useCallback } from "react";
import EmployeeService from "../services/EmployeeService";
import { Employee } from "../services/Employee";

const useCreateEmployee = () => {
  const [isError, setIsError] = useState<boolean | string>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const createEmployee = useCallback(async (newEmployee: Employee) => {
    setIsLoading(true);
    try {
      await EmployeeService.createEmployee(newEmployee);
    } catch (error) {
      setError("Error creating a new employee");
      setIsError(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createEmployee, isError, isLoading };
};

export default useCreateEmployee;
