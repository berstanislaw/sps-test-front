import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const session = window.sessionStorage.getItem("session");

  return (
    <div>
      {!session && <Navigate to="/signin" replace={true} />}
      <button
        onClick={() => {
          window.sessionStorage.removeItem("session");
          window.location.reload();
        }}
      >
        Logout
      </button>
      {children}
    </div>
  );
}

export default Protected;
