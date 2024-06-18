import EmployeeService from "../services/EmployeeService";
import { useCallback, useEffect, useState } from "react";
import { Employee } from "../services/Employee";

const useUpdateEmployee = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  const updateEmployee = useCallback(async (updatedEmployee: Employee) => {
    setIsLoading(true);
    try {
      await EmployeeService.updateEmployee(updatedEmployee);
    } catch (error) {
      setIsError("Error updating employee");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { updateEmployee, isLoading, isError };
};

export default useUpdateEmployee;
