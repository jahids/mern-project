import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateModarator = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  // console.log(cookies.info.role)

  const auth = cookies.info.role;

  return auth === "MODERATOR" || "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/secret" />
  );
};

export default PrivateModarator;
