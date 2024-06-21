import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Employee } from "@serv/Employee";

interface AddButtonProps {
  show: boolean;
  handleOpenModal: (modalTitle: string) => void;
}

const FloatingAddButton: React.FC<AddButtonProps> = ({
  show,
  handleOpenModal,
}) => {
  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpenModal("Add Employee")}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          width: 80, // custom width
          height: 80, // custom height
          backgroundColor: "#212529",
          ":hover": {
            backgroundColor: "grey",
          },
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default FloatingAddButton;
