import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";

function SignIn() {
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, "E-mail invalido")
      .email({ message: "E-mail invalido" })
      .trim(),
    password: z.string().trim(),
  });

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (credentials) => {
      return axios.post("http://localhost:8080/login", credentials);
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(loginData) {
    try {
      await mutate(loginData, {
        onSuccess: (data) => {
          window.sessionStorage.setItem("session", data.data.user.token);
        },
        onError: (error) => {
          setError("root", { message: error.response.data.message });
        },
      });
    } catch (error) {
      setError("root", { message: error });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(handleLogin)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 style={{ textAlign: "center", marginTop: "40%" }}>Login</h3>
        {isSuccess && <Navigate to="/" replace={true} />}
        <div>
          <input id="email" placeholder="E-mail" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <input
            id="password"
            type="password"
            placeholder="Senha"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        {errors.root && <span>{errors.root.message}</span>}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ backgroundColor: "#4CAF50", width: "60%" }}
        >
          {isSubmitting ? "Carregando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
