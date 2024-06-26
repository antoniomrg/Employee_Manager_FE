import React, { ChangeEvent } from "react";

interface SearchEmployeeFormProps {
  handleSearchEmployeeInput: (name: string) => void;
}

const SearchEmployeeForm: React.FC<SearchEmployeeFormProps> = ({
  handleSearchEmployeeInput,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleSearchEmployeeInput(value);
  };
  return (
    <div>
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
  );
};

export default React.memo(SearchEmployeeForm);
