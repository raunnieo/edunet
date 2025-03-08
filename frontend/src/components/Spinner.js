import React from "react";
import logo from "../assets/loader.gif";
import { Container } from "react-bootstrap";
const Spinner = () => {
  return (
    <Container className="mt-5 spinner-container">
      <img
        className="mt-5"
        src={logo}
        alt="loading"
        width="250px"
        height="250px"
      />
    </Container>
  );
};

export default Spinner;
