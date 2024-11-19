import React from "react";
import Protected from "../components/Protected";

function Home() {
  return (
    <Protected>
      <h1>SPS REACT TEST</h1>

      <a href="/users">Usuários</a>
    </Protected>
  );
}

export default Home;
