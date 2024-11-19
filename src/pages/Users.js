import React from "react";
// eslint-disable-next-line no-unused-vars
import UserService from "../services/UserService";
import Protected from "../components/Protected";
import { useQuery } from "@tanstack/react-query";
import UserList from "../components/UserList";
import { Link } from "react-router-dom";

function Users() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: UserService.list,
  });

  return (
    <Protected>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h1> Usuários</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "800px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <h3>Lista de usuários</h3>
            <Link to="/users/new">Novo Usuário</Link>
          </div>
          <UserList users={data?.data.users} isLoading={data?.isLoading} />
        </div>
      </div>
    </Protected>
  );
}

export default Users;
