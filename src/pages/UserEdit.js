import React from "react";
import { useLoaderData } from "react-router-dom";
import Protected from "../components/Protected";

export function userLoader({ params }) {
  const user = {
    id: params.userId,
    name: "teste",
    email: "teste@gmail.com",
  };

  return { user };
}

function EditUser() {
  const { user } = useLoaderData();

  return (
    <Protected>
      <p>Edição de Usuário</p>
      <div>
        <form>
          <label>Nome:</label>
          <input type="text" value={user.name} />
          <br />
          <br />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </Protected>
  );
}

export default EditUser;
