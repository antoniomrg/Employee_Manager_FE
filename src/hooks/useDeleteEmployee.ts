import EmployeeService from "../services/EmployeeService";
import { useCallback, useState } from "react";

const useDeleteEmployee = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  const deleteEmployee = useCallback(async (employeeId: number) => {
    setIsLoading(true);
    try {
      await EmployeeService.deleteEmployee(employeeId);
    } catch (error) {
      setIsError("Error deleting employee");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { deleteEmployee, isLoading, isError };
};

export default useDeleteEmployee;
