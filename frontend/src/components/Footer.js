import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";
import munshiLogo from "../assets/munshi.jpg";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="munshi-footer">
      <Container>
        <Row className="py-4">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <img
                src={munshiLogo}
                alt="Munshi Logo"
                className="footer-logo me-2"
              />
              <span className="footer-brand">MUNSHI</span>
            </div>
            <p className="footer-description">
              Your personal finance manager to track expenses, manage budgets,
              and gain insights into your spending habits with our intuitive
              finance management tool.
            </p>
            <div className="footer-social-icons">
              <a
                href="https://facebook.com"
                className="social-icon"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
              <a
                href="https://twitter.com"
                className="social-icon"
                aria-label="Twitter"
              >
                <Twitter />
              </a>
              <a
                href="https://instagram.com"
                className="social-icon"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
              <a
                href="https://linkedin.com"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </a>
              <a
                href="https://github.com"
                className="social-icon"
                aria-label="GitHub"
              >
                <GitHub />
              </a>
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Links</h5>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/features">Features</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Resources</h5>
            <ul className="footer-links">
              <li>
                <a href="/help">Help Center</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
              <li>
                <a href="/faq">FAQs</a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="footer-heading">Contact Us</h5>
            <address className="footer-contact">
              <p>
                <strong>Email:</strong> info@munshi.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Finance Street, Money City, MC
                12345
              </p>
            </address>
          </Col>
        </Row>

        <div className="footer-divider"></div>

        <Row className="footer-bottom">
          <Col className="text-center py-3">
            <p className="mb-0">
              &copy; {currentYear} Munshi Finance Manager. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
