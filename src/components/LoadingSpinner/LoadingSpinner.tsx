import React from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner: React.FC = () => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div style={style}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default LoadingSpinner;
