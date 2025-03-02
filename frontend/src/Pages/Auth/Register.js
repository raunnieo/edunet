import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerAPI } from "../../utils/ApiRequest";
import munshiLogo from "../../assets/munshi.jpg";
import "./auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    name: "",
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

    const { name, email, password } = values;

    if (!name || !email || !password) {
      toast.error("Please fill all fields", toastOptions);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(registerAPI, {
        name,
        email,
        password,
      });

      if (data.success === true) {
        delete data.user.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/");
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.", toastOptions);
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
              <Link to="/login">
                <Button variant="outline-light" className="register-button">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "calc(100vh - 68px)" }}
      >
        <Row className="w-100 justify-content-center">
          <Col md={8} lg={6}>
            <Card className="login-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <img
                    src={munshiLogo}
                    alt="Munshi"
                    className="munshi-login-logo"
                  />
                  <h2 className="login-title">Create Account</h2>
                  <p className="text-muted">
                    Start managing your finances today
                  </p>
                </div>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      className="login-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="login-input"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create a secure password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className="login-input"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="login-button w-100"
                    onClick={!loading ? handleSubmit : null}
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Register"}
                  </Button>
                </Form>
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="signup-link">
                      Log in
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default Register;
