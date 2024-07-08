import { useCallback, useEffect, useState } from "react";
import { Employee } from "../interfaces/Employee";
import EmployeeService from "../services/EmployeeService";

const useGetAllEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setError("");
    try {
      const response = await EmployeeService.getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      setError("Error fetching employees");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { employees, isLoading, isError, error, fetchEmployees };
};

export default useGetAllEmployees;
