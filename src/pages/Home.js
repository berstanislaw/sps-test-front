import React from "react";
import Protected from "../components/Protected";

function Home() {
  return (
    <Protected>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingLeft: "30px",
        }}
      >
        <h1>SPS REACT TEST</h1>

        <a href="/users">Usuários</a>
      </div>
    </Protected>
  );
}

export default Home;
