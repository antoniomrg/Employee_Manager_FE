import EmployeeService from "../services/EmployeeService";
import { useCallback, useEffect, useState } from "react";
import { Employee } from "../services/Employee";

const useGetEmployeesByName = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | string>(false);

  const getEmployeesByName = useCallback(async (name: string) => {
    setIsLoading(true);
    try {
      const response = await EmployeeService.getEmployeesByName(name);
      setEmployees(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsError("Error fetching employee");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getEmployeesByName, employees, isError, isLoading };
};

export default useGetEmployeesByName;
