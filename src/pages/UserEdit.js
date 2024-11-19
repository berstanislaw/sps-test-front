import React from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import Protected from "../components/Protected";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import UserService from "../services/UserService";

function EditUser() {
  const { userId } = useParams();
  const { data } = useLoaderData();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data.user.name,
      email: data.user.email,
      password: data.user.password,
      type: data.user.type,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (userData) => {
      UserService.update(userId, userData);
    },
  });

  async function updateUser(userData) {
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
        <form onSubmit={handleSubmit(updateUser)}>
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

export default EditUser;
