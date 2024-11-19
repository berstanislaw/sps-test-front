import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "../services/UserService";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function UserList({ users, isLoading }) {
  const { mutate } = useMutation({
    mutationKey: ["users"],
    mutationFn: async (id) => {
      UserService.deleteUser(id);
    },
    onSuccess: async () => {
      closeModal();
      window.location.reload();
    },
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <div>Tem certeza que quer deletar o usuario {user.name}</div>
        <button onClick={() => mutate(user.id)}>Deletar</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>

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
                setUser(user);
                openModal();
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
