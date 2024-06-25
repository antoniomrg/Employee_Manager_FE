import "bootstrap/dist/css/bootstrap.min.css";
import React, { ChangeEvent } from "react";
import "../../index.css";

interface NavbarProps {
  handleSearchEmployeeInput: (name: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleSearchEmployeeInput }) => {
  console.log("Navbar rendered");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleSearchEmployeeInput(value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-navbar">
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
        className="collapse navbar-collapse d-flex justify-content-between "
        id="navbarColor02"
      >
        <form className="form-inline my-2 my-lg-0 ml-auto mr-3">
          <input
            type="search"
            className="form-control mr-sm-2 "
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
