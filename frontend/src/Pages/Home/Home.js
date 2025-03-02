import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormatListBulleted,
  BarChart,
  Add,
  FilterList,
  Refresh,
} from "@mui/icons-material";

import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import TableData from "./TableData";
import Analytics from "./Analytics";
import { addTransaction, getTransactions } from "../../utils/ApiRequest";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

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

  const [cUser, setcUser] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");
  const [showFilters, setShowFilters] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleFilters = () => setShowFilters(!showFilters);

  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  useEffect(() => {
    const avatarFunc = async () => {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user.isAvatarImageSet === false || user.avatarImage === "") {
          navigate("/setAvatar");
        }
        setcUser(user);
        setRefresh(true);
      } else {
        navigate("/login");
      }
    };

    avatarFunc();
  }, [navigate]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFrequency = (e) => {
    setFrequency(e.target.value);
  };

  const handleSetType = (e) => {
    setType(e.target.value);
  };

  const handleStartChange = (date) => {
    setStartDate(date);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, amount, description, category, date, transactionType } =
      values;

    if (
      !title ||
      !amount ||
      !description ||
      !category ||
      !date ||
      !transactionType
    ) {
      toast.error("Please enter all the fields", toastOptions);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(addTransaction, {
        title,
        amount,
        description,
        category,
        date,
        transactionType,
        userId: cUser._id,
      });

      if (data.success === true) {
        toast.success(data.message, toastOptions);
        handleClose();
        setRefresh(!refresh);
        // Reset form
        setValues({
          title: "",
          amount: "",
          description: "",
          category: "",
          date: "",
          transactionType: "",
        });
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setType("all");
    setStartDate(null);
    setEndDate(null);
    setFrequency("7");
  };

  useEffect(() => {
    const fetchAllTransactions = async () => {
      if (!cUser) return;

      try {
        setLoading(true);

        const { data } = await axios.post(getTransactions, {
          userId: cUser._id,
          frequency,
          startDate,
          endDate,
          type,
        });

        setTransactions(data.transactions);
      } catch (err) {
        toast.error(
          "Error fetching transactions. Please try again.",
          toastOptions
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllTransactions();
  }, [refresh, frequency, endDate, type, startDate, cUser]);

  const handleTableClick = () => setView("table");
  const handleChartClick = () => setView("chart");

  if (loading && !cUser) {
    return <Spinner />;
  }

  return (
    <>
      <Header />

      <Container className="mt-4 mb-5">
        <Card className="munshi-card main-card">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="m-0">Financial Summary</h5>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                className="btn-icon"
                onClick={toggleFilters}
                title="Toggle Filters"
              >
                <FilterList />
              </Button>
              <div className="view-toggle">
                <Button
                  variant={view === "table" ? "primary" : "outline-primary"}
                  className="btn-icon"
                  onClick={handleTableClick}
                  title="Table View"
                >
                  <FormatListBulleted />
                </Button>
                <Button
                  variant={view === "chart" ? "primary" : "outline-primary"}
                  className="btn-icon"
                  onClick={handleChartClick}
                  title="Chart View"
                >
                  <BarChart />
                </Button>
              </div>
              <Button
                variant="primary"
                className="add-transaction-btn"
                onClick={handleShow}
              >
                <span className="d-none d-md-inline">Add Transaction</span>
                <Add className="d-md-none" />
              </Button>
            </div>
          </Card.Header>

          {showFilters && (
            <Card.Body className="filter-section">
              <Row className="g-3">
                <Col xs={12} md={3}>
                  <Form.Group controlId="formSelectFrequency">
                    <Form.Label>Time Period</Form.Label>
                    <Form.Select
                      name="frequency"
                      value={frequency}
                      onChange={handleChangeFrequency}
                      className="form-select-sm"
                    >
                      <option value="7">Last Week</option>
                      <option value="30">Last Month</option>
                      <option value="365">Last Year</option>
                      <option value="custom">Custom Range</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xs={12} md={3}>
                  <Form.Group controlId="formSelectType">
                    <Form.Label>Transaction Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={type}
                      onChange={handleSetType}
                      className="form-select-sm"
                    >
                      <option value="all">All Transactions</option>
                      <option value="expense">Expenses Only</option>
                      <option value="credit">Income Only</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {frequency === "custom" && (
                  <>
                    <Col xs={12} md={3}>
                      <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <DatePicker
                          selected={startDate}
                          onChange={handleStartChange}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          dateFormat="MM/dd/yyyy"
                          className="form-control form-control-sm"
                          placeholderText="Select start date"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                      <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <DatePicker
                          selected={endDate}
                          onChange={handleEndChange}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          dateFormat="MM/dd/yyyy"
                          className="form-control form-control-sm"
                          placeholderText="Select end date"
                        />
                      </Form.Group>
                    </Col>
                  </>
                )}

                <Col xs={12} className="d-flex justify-content-end mt-3">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleReset}
                    className="reset-filters-btn"
                  >
                    <Refresh fontSize="small" className="me-1" />
                    Reset Filters
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          )}

          <Card.Body className="data-container">
            {loading ? (
              <div className="text-center py-5">
                <Spinner />
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-5 empty-state">
                <div className="empty-icon mb-3">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16H12.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h5>No transactions found</h5>
                <p className="text-muted">
                  Try adjusting your filters or add a new transaction to get
                  started.
                </p>
                <Button variant="primary" onClick={handleShow}>
                  Add Your First Transaction
                </Button>
              </div>
            ) : view === "table" ? (
              <TableData data={transactions} user={cUser} />
            ) : (
              <Analytics transactions={transactions} user={cUser} />
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Add Transaction Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col xs={12} md={8}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    type="text"
                    placeholder="Enter transaction title"
                    value={values.title}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="formAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    value={values.amount}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="formTransactionType">
                  <Form.Label>Transaction Type</Form.Label>
                  <Form.Select
                    name="transactionType"
                    value={values.transactionType}
                    onChange={handleChange}
                  >
                    <option value="">Select type...</option>
                    <option value="credit">Income</option>
                    <option value="expense">Expense</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                  >
                    <option value="">Select category...</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Rent">Rent</option>
                    <option value="Salary">Salary</option>
                    <option value="Tip">Tip</option>
                    <option value="Food">Food</option>
                    <option value="Medical">Medical</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                placeholder="Add transaction details..."
                value={values.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Transaction"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Home;
