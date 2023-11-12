import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const AppRouter = () => {
  const { user } = useContext(Context);

  console.log(user.isAuth);
  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))
      }
      {!user.isAuth &&
        publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      <Route path="*" element={<Navigate to="/main" replace />} />
    </Routes>
  );
};

export default observer(AppRouter);
