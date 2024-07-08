import { useState, useEffect, useCallback } from "react";
import EmployeeService from "../services/EmployeeService";
import { Employee } from "../interfaces/Employee";

const useCreateEmployee = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createEmployee = useCallback(async (newEmployee: Employee) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    try {
      await EmployeeService.createEmployee(newEmployee);
    } catch (error) {
      setIsError(true);
      setError("Error creating a new employee");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createEmployee, isError, isLoading, error };
};

export default useCreateEmployee;
