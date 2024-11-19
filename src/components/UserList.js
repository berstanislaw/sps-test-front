import React from "react";
import { Link } from "react-router-dom";

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
            <Link to={`/users/${user.id}`}>Editar</Link>
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
