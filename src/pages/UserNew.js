import React from "react";
import { Link } from "react-router-dom";
import Protected from "../components/Protected";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import UserService from "../services/UserService";

function UserNew() {
  const { register, handleSubmit } = useForm({});

  const { mutate } = useMutation({
    mutationFn: async (userData) => {
      UserService.create(userData);
    },
  });

  async function createUser(userData) {
    try {
      await mutate(userData, {
        onSuccess: async () => {
          window.location.href = "/users";
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Protected>
      <p>Edição de Usuário</p>

      <div>
        <form onSubmit={handleSubmit(createUser)}>
          <label>Nome:</label>
          <input type="text" {...register("name")} />
          <br />
          <label>Email:</label>
          <input type="text" {...register("email")} />
          <br />
          <label>Senha:</label>
          <input type="password" {...register("password")} />
          <br />
          <label>Tipo:</label>
          <select {...register("type")}>
            <option value="admin">Admin</option>
            <option value="user">Usuario</option>
          </select>
          <br />
          <button type="submit" style={{ backgroundColor: "#4CAF50" }}>
            Salvar
          </button>
        </form>

        <Link to="/users">Voltar</Link>
      </div>
    </Protected>
  );
}

export default UserNew;
