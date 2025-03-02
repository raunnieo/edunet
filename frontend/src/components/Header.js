import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
            <Nav.Link href="/transactions" className="nav-link">
              Transactions
            </Nav.Link>
            <Nav.Link href="/budget" className="nav-link">
              Budget
            </Nav.Link>
            <Nav.Link href="/reports" className="nav-link">
              Reports
            </Nav.Link>

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="success"
                  id="user-dropdown"
                  className="user-menu-button"
                >
                  <span className="user-initial">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
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
