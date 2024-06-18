import React from "react";

interface ErrorProp {
  error: string;
}

const Error: React.FC<ErrorProp> = ({ error }) => {
  return (
    <div
      style={{
        color: "red",
        fontWeight: "bold",
        padding: "10px",
        border: "1px solid red",
        borderRadius: "5px",
        backgroundColor: "#ffe6e6",
        margin: "10px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
      }}
    >
      <h3>{error}</h3>
    </div>
  );
};

export default Error;
