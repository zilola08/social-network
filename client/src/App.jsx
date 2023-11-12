import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavbarTop from "./components/NavbarTop";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import { check } from "./http/userApi";

function App() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <NavbarTop />
      <AppRouter />
    </BrowserRouter>
  );
}

export default observer(App);
