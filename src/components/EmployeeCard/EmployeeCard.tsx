import React from "react";
import { Employee, Employees } from "../../interfaces/Employee";
import "../../styles.css";
import Error from "../Error/Error";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface EmployeeCardProps {
  employees: Employees;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  show: boolean;
  handleOpenDeleteModal: (id: number, name: string) => void;
  handleOpenModal: (modalTitle: string, employee?: Employee) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employees,
  isLoading,
  isError,
  errorMessage,
  show,
  handleOpenDeleteModal,
  handleOpenModal,
}) => {
  console.log("Employee Card rendered");

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div>
        <Error error={errorMessage} />
      </div>
    );

  return (
    <div className="container" id="main-container">
      <div className="row">
        {employees.map((employee) => (
          <div key={employee.id} className="col-md-6 col-xl-3">
            <div
              className="card m-b-30 d-flex flex-column"
              style={{ height: "90%" }}
            >
              <div className="card-body row flex-grow-1">
                <div className="col-4">
                  <a href="">
                    <img
                      src={employee.imageUrl}
                      alt=""
                      className="img-fluid rounded-circle w-100"
                    />
                  </a>
                </div>
                <div className="col-6 card-title align-self-center mb-0">
                  <div className="card-title-container">
                    <h5>{employee.name}</h5>
                    <p className="m-0">{employee.jobTitle}</p>
                  </div>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <i className="fa fa-envelope float-right"></i>
                  {employee.email}
                </li>
                <li className="list-group-item">
                  <i className="fa fa-phone float-right"></i>
                  {employee.phone}
                </li>
              </ul>
              <div className="card-body">
                <div className="float-right btn-group btn-group-sm">
                  <a
                    href="#"
                    className="btn btn-primary tooltips"
                    data-placement="top"
                    data-original-title="Edit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenModal("Edit Employee", employee);
                    }}
                  >
                    <i className="fa fa-pencil"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-secondary tooltips"
                    data-placement="top"
                    data-original-title="Delete"
                    onClick={(e) => {
                      e.preventDefault();
                      if (employee.id !== undefined) {
                        handleOpenDeleteModal(employee.id, employee.name);
                      }
                    }}
                  >
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(EmployeeCard);
