import React, { useContext } from "react";
import { Context } from "../main";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { logout } from "../http/userApi";

const NavbarTop = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logout();
    user.setUser({});
    user.setIsAuth(false);
    user.setAccessToken(null);
    return response;
  };
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      {user.isAuth ? (
        <Container>
          <Navbar.Brand>
            <NavLink className="navbrand-link" to="/main">
              justtext
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <NavLink to="/main">Home</NavLink>
              <NavLink to="/profile">My posts</NavLink>
              <NavLink to="/chat">Chat</NavLink>
              {/* <NavLink to="/friends">Friends</NavLink> */}
              <Button variant="dark" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      ) : (
        <Container>
          <Navbar.Brand>justtext</Navbar.Brand>
          <Button variant="dark" onClick={() => navigate("/login")}>
            Login/Register
          </Button>
        </Container>
      )}
    </Navbar>
  );
});

export default NavbarTop;
