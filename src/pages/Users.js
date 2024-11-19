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
      <h1> Usuários</h1>
      <Link to="/users/new">Novo Usuário</Link>
      <div>Lista de usuários</div>
      <UserList users={data?.data.users} isLoading={data?.isLoading} />
    </Protected>
  );
}

export default Users;
