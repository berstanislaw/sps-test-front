import React from "react";
import { Navigate } from "react-router-dom";

function UserList({ users, isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <table>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Tipo</th>
        <th>Acoes</th>
      </tr>
      {users?.map((user) => (
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.type}</td>
          <td>
            <button
              onClick={() => {
                window.location.href = `/users/${user.id}`;
              }}
            >
              Editar
            </button>
            <button
              onClick={() => {
                window.location.href = `/users/${user.id}/delete`;
              }}
            >
              Deletar
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default UserList;
