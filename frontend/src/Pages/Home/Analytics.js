import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  ArrowUpward,
  ArrowDownward,
  AccountBalance,
  ShowChart,
  CategoryOutlined,
  Receipt,
} from "@mui/icons-material";

const Analytics = ({ transactions }) => {
  // Calculate basic transaction stats
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (item) => item.transactionType === "credit"
  );
  const totalExpenseTransactions = transactions.filter(
    (item) => item.transactionType === "expense"
  );

  // Calculate percentages
  const totalIncomePercent =
    totalTransactions > 0
      ? (totalIncomeTransactions.length / totalTransactions) * 100
      : 0;
  const totalExpensePercent =
    totalTransactions > 0
      ? (totalExpenseTransactions.length / totalTransactions) * 100
      : 0;

  // Calculate financial totals
  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncome = transactions
    .filter((item) => item.transactionType === "credit")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpense = transactions
    .filter((item) => item.transactionType === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate financial percentages
  const incomePercent =
    totalTurnOver > 0 ? (totalIncome / totalTurnOver) * 100 : 0;
  const expensePercent =
    totalTurnOver > 0 ? (totalExpense / totalTurnOver) * 100 : 0;

  // Net savings calculation
  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  // Categories and colors
  const categories = [
    "Groceries",
    "Rent",
    "Salary",
    "Tip",
    "Food",
    "Medical",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  const colors = {
    Groceries: "#FF6384",
    Rent: "#36A2EB",
    Salary: "#FFCE56",
    Tip: "#4BC0C0",
    Food: "#9966FF",
    Medical: "#FF9F40",
    Utilities: "#8AC926",
    Entertainment: "#6A4C93",
    Transportation: "#1982C4",
    Other: "#F45B69",
  };

  return (
    <div className="analytics-container">
      <Row className="g-4">
        {/* Transactions Summary Card */}
        <Col lg={6} xl={3}>
          <Card className="analytics-card h-100">
            <Card.Header className="d-flex align-items-center">
              <Receipt className="me-2" />
              <span className="card-header-title">Transactions</span>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                <h2 className="total-count">{totalTransactions}</h2>
                <p className="text-muted">Total Transactions</p>
              </div>

              <div className="stat-container">
                <div className="stat-row">
                  <div className="stat-label income">
                    <ArrowUpward fontSize="small" /> Income
                  </div>
                  <div className="stat-value">
                    {totalIncomeTransactions.length}
                    <span className="stat-percent">
                      ({totalIncomePercent.toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <div className="progress-container">
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${totalIncomePercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="stat-container mt-3">
                <div className="stat-row">
                  <div className="stat-label expense">
                    <ArrowDownward fontSize="small" /> Expense
                  </div>
                  <div className="stat-value">
                    {totalExpenseTransactions.length}
                    <span className="stat-percent">
                      ({totalExpensePercent.toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <div className="progress-container">
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: `${totalExpensePercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Financial Summary Card */}
        <Col lg={6} xl={3}>
          <Card className="analytics-card h-100">
            <Card.Header className="d-flex align-items-center">
              <AccountBalance className="me-2" />
              <span className="card-header-title">Financial Summary</span>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                <h2 className="total-amount">
                  ₹{totalTurnOver.toLocaleString()}
                </h2>
                <p className="text-muted">Total Turnover</p>
              </div>

              <div className="stat-container">
                <div className="stat-row">
                  <div className="stat-label income">
                    <ArrowUpward fontSize="small" /> Income
                  </div>
                  <div className="stat-value">
                    ₹{totalIncome.toLocaleString()}
                    <span className="stat-percent">
                      ({incomePercent.toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <div className="progress-container">
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${incomePercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="stat-container mt-3">
                <div className="stat-row">
                  <div className="stat-label expense">
                    <ArrowDownward fontSize="small" /> Expense
                  </div>
                  <div className="stat-value">
                    ₹{totalExpense.toLocaleString()}
                    <span className="stat-percent">
                      ({expensePercent.toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <div className="progress-container">
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: `${expensePercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="stat-container mt-3">
                <div className="stat-row">
                  <div className="stat-label savings">
                    <ShowChart fontSize="small" /> Net Savings
                  </div>
                  <div
                    className={`stat-value ${
                      netSavings >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    ₹{netSavings.toLocaleString()}
                    <span className="stat-percent">
                      ({savingsRate.toFixed(0)}%)
                    </span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Category Income Analysis */}
        <Col lg={6} xl={3}>
          <Card className="analytics-card h-100">
            <Card.Header className="d-flex align-items-center">
              <CategoryOutlined className="me-2" />
              <span className="card-header-title">Income by Category</span>
            </Card.Header>
            <Card.Body className="category-analysis">
              {categories.map((category) => {
                const income = transactions
                  .filter(
                    (transaction) =>
                      transaction.transactionType === "credit" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);

                const incomePercent =
                  totalIncome > 0 ? (income / totalIncome) * 100 : 0;

                return income > 0 ? (
                  <div key={`income-${category}`} className="category-item">
                    <div className="category-header">
                      <div className="category-name">
                        <span
                          className="category-dot"
                          style={{ backgroundColor: colors[category] }}
                        ></span>
                        {category}
                      </div>
                      <div className="category-value">
                        ₹{income.toLocaleString()}
                        <span className="category-percent">
                          ({incomePercent.toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${incomePercent}%`,
                          backgroundColor: colors[category],
                        }}
                      ></div>
                    </div>
                  </div>
                ) : null;
              })}

              {!categories.some((category) =>
                transactions.some(
                  (t) =>
                    t.transactionType === "credit" && t.category === category
                )
              ) && (
                <div className="text-center text-muted py-4">
                  No income data available
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Category Expense Analysis */}
        <Col lg={6} xl={3}>
          <Card className="analytics-card h-100">
            <Card.Header className="d-flex align-items-center">
              <CategoryOutlined className="me-2" />
              <span className="card-header-title">Expense by Category</span>
            </Card.Header>
            <Card.Body className="category-analysis">
              {categories.map((category) => {
                const expense = transactions
                  .filter(
                    (transaction) =>
                      transaction.transactionType === "expense" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);

                const expensePercent =
                  totalExpense > 0 ? (expense / totalExpense) * 100 : 0;

                return expense > 0 ? (
                  <div key={`expense-${category}`} className="category-item">
                    <div className="category-header">
                      <div className="category-name">
                        <span
                          className="category-dot"
                          style={{ backgroundColor: colors[category] }}
                        ></span>
                        {category}
                      </div>
                      <div className="category-value">
                        ₹{expense.toLocaleString()}
                        <span className="category-percent">
                          ({expensePercent.toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${expensePercent}%`,
                          backgroundColor: colors[category],
                        }}
                      ></div>
                    </div>
                  </div>
                ) : null;
              })}

              {!categories.some((category) =>
                transactions.some(
                  (t) =>
                    t.transactionType === "expense" && t.category === category
                )
              ) && (
                <div className="text-center text-muted py-4">
                  No expense data available
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
