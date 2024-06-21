import { useCallback, useEffect, useState } from "react";
import { Employee } from "../services/Employee";
import EmployeeService from "../services/EmployeeService";

const useGetAllEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await EmployeeService.getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      setError("Error fetching employees");
      setIsError(false);
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
