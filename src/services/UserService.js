import axios from "axios";

const list = async () => {
  return await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem("session")}`,
    },
  });
};

const get = async (id) => {
  throw new Error("Not implemented");
};

const create = async (data) => {
  throw new Error("Not implemented");
};

const deleteUser = async (id) => {
  throw new Error("Not implemented");
};

const update = async (id, data) => {
  throw new Error("Not implemented");
};

const UserService = { list, get, create, deleteUser, update };
export default UserService;
