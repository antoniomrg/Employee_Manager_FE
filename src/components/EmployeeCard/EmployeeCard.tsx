import React from "react";
import "../../styles.css";
import { Employee } from "@serv/Employee";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useGetAllEmployees from "../../hooks/useGetallEmployees";
import Error from "../Error/Error";
import { error } from "console";

interface EmployeeCardProps {
  employees: Employee[];
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
                    onClick={() => {
                      if (employee.id !== undefined) {
                        handleOpenDeleteModal(employee.id, employee.name);
                      }
                    }}
                  >
                    <i className="fa fa-times"></i>
                  </a>
                </div>
                <ul className="social-links list-inline mb-0">
                  <li className="list-inline-item">
                    <a
                      title=""
                      data-placement="top"
                      data-toggle="tooltip"
                      className="tooltips"
                      href=""
                      data-original-title="Facebook"
                    >
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      title=""
                      data-placement="top"
                      data-toggle="tooltip"
                      className="tooltips"
                      href=""
                      data-original-title="Twitter"
                    >
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      title=""
                      data-placement="top"
                      data-toggle="tooltip"
                      className="tooltips"
                      href=""
                      data-original-title="Skype"
                    >
                      <i className="fa fa-skype"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(EmployeeCard);
