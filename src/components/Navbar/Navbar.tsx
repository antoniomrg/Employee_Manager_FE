import "bootstrap/dist/css/bootstrap.min.css";
import React, { ChangeEvent } from "react";
import "../../index.css";

interface NavbarProps {
  handleOpenModal: (modalTitle: string) => void;
  handleSearchEmployeeInput: (name: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  handleOpenModal,
  handleSearchEmployeeInput,
}) => {
  console.log("Navbar rendered");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleSearchEmployeeInput(value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a
        className="navbar-brand ml-3"
        style={{ fontFamily: "Typist", color: "white", fontSize: "25px" }}
      >
        Dunder Mifflin | Employee Manager
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse d-flex justify-content-between"
        id="navbarColor02"
      >
        <div className="d-flex mx-auto">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a
                className="nav-link"
                href="#"
                onClick={() => handleOpenModal("Add Employee")}
              >
                Add Employee
              </a>
            </li>
          </ul>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input
            type="search"
            className="form-control mr-sm-2"
            placeholder="Search employees..."
            required
            onChange={handleInputChange}
          />
        </form>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
