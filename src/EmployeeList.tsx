import React, { useEffect, useState } from "react";
import { Employee } from "./services/Employee";
import EmployeeService from "./services/EmployeeService";

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    EmployeeService.getAllEmployees().then((response) => {
      setEmployees(response.data);
    });
  }, []);
  return (
    <div>
      {employees.map((employee) => (
        <div key={employee.id}>
          <p>{employee.name}</p>
          <p>{employee.email}</p>
          <p>{employee.jobTitle}</p>
          <img
            src={employee.imageUrl}
            alt={employee.name}
            className="img-fluid rounded-circle w-60"
          />
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
