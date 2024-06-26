import "bootstrap/dist/css/bootstrap.min.css";
import React, { ChangeEvent } from "react";
import "../../index.css";
import SearchEmployeeForm from "../SearchEmployeeForm/SearchEmployeeForm";

interface NavbarProps {
  handleSearchEmployeeInput: (name: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleSearchEmployeeInput }) => {
  console.log("Navbar rendered");

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-navbar">
        <div className="container-fluid">
          <a
            className="navbar-brand ml-3"
            style={{ fontFamily: "Typist", color: "white", fontSize: "25px" }}
          >
            Dunder Mifflin | Employee Manager
          </a>
          <div className="ml-auto">
            <SearchEmployeeForm
              handleSearchEmployeeInput={handleSearchEmployeeInput}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default React.memo(Navbar);
