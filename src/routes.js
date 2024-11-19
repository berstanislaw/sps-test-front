import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import SignIn from "./pages/SignIn";
import UserService from "./services/UserService";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/users/:userId",
    element: <UserEdit />,
    loader: UserService.get,
  },
]);

export default router;
