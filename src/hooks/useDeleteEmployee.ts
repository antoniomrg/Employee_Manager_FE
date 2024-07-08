import EmployeeService from "../services/EmployeeService";
import { useCallback, useState } from "react";

const useDeleteEmployee = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState("");

  const deleteEmployee = useCallback(async (employeeId: number) => {
    setIsLoading(true);
    setIsError(false);
    setError("");
    try {
      await EmployeeService.deleteEmployee(employeeId);
    } catch (error) {
      setError("Error deleting employee");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { deleteEmployee, isLoading, isError, setIsError };
};

export default useDeleteEmployee;
