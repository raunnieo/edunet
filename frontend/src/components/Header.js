import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Dropdown,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Person, ExitToApp, AccountCircle } from "@mui/icons-material";
import "./MunshiNavbar.css";
import munshiLogo from "../assets/munshi.jpg"; // Import logo image

const MunshiNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getUserInitial = () => {
    if (user && user.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`munshi-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <Container>
        <div className="logo-container">
          <div className="logo-icon">
            <img src={munshiLogo} alt="Munshi Logo" className="munshi-logo" />
          </div>
          <Navbar.Brand href="/" className="brand-text">
            MUNSHI
            <span className="brand-tagline">Your Personal Finance Manager</span>
          </Navbar.Brand>
        </div>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="nav-link">
              Dashboard
            </Nav.Link>

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="success"
                  id="user-dropdown"
                  className="user-menu-button"
                >
                  <div className="user-avatar-container">
                    {user.isAvatarImageSet && user.avatarImage ? (
                      <Image
                        src={user.avatarImage}
                        alt={getUserInitial()}
                        roundedCircle
                        className="user-avatar-image"
                      />
                    ) : (
                      <div className="user-initial-container">
                        <span className="user-initial">{getUserInitial()}</span>
                      </div>
                    )}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  <div className="dropdown-header-info">
                    <div className="dropdown-user-avatar">
                      {user.isAvatarImageSet && user.avatarImage ? (
                        <Image
                          src={user.avatarImage}
                          alt={getUserInitial()}
                          roundedCircle
                        />
                      ) : (
                        <AccountCircle
                          sx={{ fontSize: 40, color: "#7f85d5" }}
                        />
                      )}
                    </div>
                    <div className="dropdown-user-name">{user.username}</div>
                    <div className="dropdown-user-email">{user.email}</div>
                  </div>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/profile">
                    <Person className="dropdown-icon" /> Profile
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <ExitToApp className="dropdown-icon" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button onClick={handleLogin} className="login-button">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MunshiNavbar;
