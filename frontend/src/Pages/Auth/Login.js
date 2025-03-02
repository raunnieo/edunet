import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";
import munshiLogo from "../../assets/munshi.jpg";
import {
  AccountBalance,
  Security,
  BarChart,
  Timeline,
} from "@mui/icons-material";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    if (!email || !password) {
      toast.error("Please fill all fields", toastOptions);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(loginAPI, {
        email,
        password,
      });

      if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/");
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-landing-page">
      <div className="login-navbar">
        <Container>
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center">
              <img
                src={munshiLogo}
                alt="Munshi"
                className="munshi-logo-small me-2"
              />
              <span className="munshi-brand">MUNSHI</span>
            </div>
            <div>
              <Link to="/register">
                <Button variant="outline-light" className="register-button">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="hero-content">
              <h1 className="hero-title">
                Your Personal{" "}
                <span className="text-highlight">Finance Manager</span>
              </h1>
              <p className="hero-subtitle">
                Track expenses, manage budgets, and gain insights into your
                spending habits with our intuitive finance management tool.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">
                    <AccountBalance />
                  </span>
                  <span>Track Finances</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">
                    <BarChart />
                  </span>
                  <span>Analyze Spending</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">
                    <Timeline />
                  </span>
                  <span>Plan Budgets</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">
                    <Security />
                  </span>
                  <span>Secure Data</span>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <Card className="login-card">
                <Card.Body>
                  <div className="text-center mb-4">
                    <img
                      src={munshiLogo}
                      alt="Munshi"
                      className="munshi-login-logo"
                    />
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="text-muted">Log in to manage your finances</p>
                  </div>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        className="login-input"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        value={values.password}
                        className="login-input"
                      />
                    </Form.Group>
                    <div className="mb-3 text-end">
                      <Link to="/forgotPassword" className="forgot-link">
                        Forgot Password?
                      </Link>
                    </div>
                    <Button
                      type="submit"
                      className="login-button w-100"
                      onClick={!loading ? handleSubmit : null}
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Log In"}
                    </Button>
                  </Form>
                  <div className="text-center mt-4">
                    <p className="text-muted">
                      Don't have an account?{" "}
                      <Link to="/register" className="signup-link">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
