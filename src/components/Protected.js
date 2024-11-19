import React from "react";
import { Link, Navigate } from "react-router-dom";

function Protected({ children }) {
  const session = window.sessionStorage.getItem("session");

  return (
    <div>
      {!session && <Navigate to="/signin" replace={true} />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div
          style={{ width: "95%", display: "flex", justifyContent: "center" }}
        >
          <Link to="/">
            <h2>Home</h2>
          </Link>
        </div>
        <button
          onClick={() => {
            window.sessionStorage.removeItem("session");
            window.location.reload();
          }}
          style={{
            width: "5%",
            backgroundColor: "#f44336",
          }}
        >
          Sair
        </button>
      </div>
      {children}
    </div>
  );
}

export default Protected;
