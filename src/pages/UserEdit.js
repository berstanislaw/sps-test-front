import React from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import Protected from "../components/Protected";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import UserService from "../services/UserService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function EditUser() {
  const { userId } = useParams();
  const { data } = useLoaderData();

  let updateUserSchema = z.object({
    email: z
      .string()
      .email({ message: "Insira um e-mail valido" })
      .trim()
      .optional(),
    name: z.string().trim().optional(),
    password: z.string().trim().optional(),
    type: z.enum(["admin", "user"]).optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "300px",
          }}
        >
          <h3>Edição de Usuário</h3>
          <Link to="/users">Voltar</Link>
        </div>

        <div>
          <form
            onSubmit={handleSubmit(updateUser)}
            style={{
              width: "300px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ width: "20%" }}>Nome:</label>
              <input
                type="text"
                {...register("name")}
                style={{ width: "80%" }}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ width: "20%" }}>Email:</label>
              <input
                type="text"
                {...register("email")}
                style={{ width: "80%" }}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ width: "20%" }}>Senha:</label>
              <input
                type="password"
                {...register("password")}
                style={{ width: "80%" }}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ width: "20%" }}>Tipo:</label>
              <select {...register("type")} style={{ width: "80%" }}>
                <option value="admin">Admin</option>
                <option value="user">Usuario</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                style={{ backgroundColor: "#4CAF50", width: "60%" }}
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Protected>
  );
}

export default EditUser;
