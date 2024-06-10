import axios from "axios";
import { Employee, Employees } from "./Employee";

const API_URL = "http://localhost:8080/employee";

class EmployeeService {
  getAllEmployees() {
    return axios.get<Employees>(`${API_URL}/all`);
  }

  createEmployee(employee: Employee) {
    return axios.post<Employee>(`${API_URL}/add`, employee);
  }

  deleteEmployee(id: number) {
    return axios.delete(`${API_URL}/delete/${id}`);
  }

  updateEmployee(employee: Employee) {
    return axios.put<Employee>(`${API_URL}/update`, employee);
  }

  getEmployeesByName(name: string) {
    return axios.get(`${API_URL}/find`, {
      params: { name },
    });
  }
}

export default new EmployeeService();
