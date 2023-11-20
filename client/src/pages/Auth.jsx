import React, { useContext, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { registration, login } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { jwtDecode } from 'jwt-decode';


const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const emailValidator = (email) =>
    !["gmail", "hotmail", "yahoo", "outlook", "mail"].includes(
      email.split("@")[1].split(".")[0]
    );

  const click = async (e) => {
    try {
      let response;
      if (isLogin) {
        response = await login(username, password);
        user.setAccessToken(response);
        let userData = jwtDecode(response);
        user.setUser(userData);
        user.setIsAuth(true);
        navigate(MAIN_ROUTE);
      } else {
        if (
          !email ||
          emailValidator(email) ||
          !password ||
          password.length === 0 ||
          password === " " ||
          !username ||
          username.length === 0 ||
          username === " "
        ) {
          alert(
            "please fill in the fields with non-empty and non-space characters"
          );
          return;
        }
        response = await registration(
          email,
          password,
          firstName,
          lastName,
          username
        );
        navigate(LOGIN_ROUTE);
      }
    } catch (e) {
      if (e.response?.data?.message) {
        alert(e.response.data.message);
      } else {
        console.log(e);
      }
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <Form>
        <h2>{isLogin ? "Login" : "Registration"}</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {isLogin ? (
          <span></span>
        ) : (
          <div>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </div>
        )}

        <Button variant="primary" onClick={click}>
          {isLogin ? "Login" : "Register"}
        </Button>
        {isLogin ? (
          <Form.Text className="text-muted d-block">
            No account?{" "}
            <NavLink
              className="d-inline"
              style={{ textDecoration: "underlined" }}
              to={REGISTRATION_ROUTE}
            >
              Register
            </NavLink>
          </Form.Text>
        ) : (
          <Form.Text className="text-muted d-block">
            Already have an account?{" "}
            <NavLink
              className="d-inline"
              style={{ textDecoration: "underlined" }}
              to={LOGIN_ROUTE}
            >
              Login
            </NavLink>
          </Form.Text>
        )}
      </Form>
    </Container>
  );
});

export default Auth;
