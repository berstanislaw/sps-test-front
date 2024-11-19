import axios from "axios";

const list = async () => {
  return await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem("session")}`,
    },
  });
};

const get = async ({ params }) => {
  return await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/users/${params.userId}`,
    {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("session")}`,
      },
    }
  );
};

const create = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/users`,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("session")}`,
      },
    }
  );
};

const deleteUser = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem("session")}`,
    },
  });
};

const update = async (id, data) => {
  return await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/users/${id}`,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("session")}`,
      },
    }
  );
};

const UserService = { list, get, create, deleteUser, update };
export default UserService;
