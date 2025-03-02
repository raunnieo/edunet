const express = require("express");
const router = express.Router();
const {
  validateRequest,
  transactionValidationRules,
  transactionIdValidation,
  multipleTransactionIdsValidation,
} = require("../../server/middlewares/validation");
const transactionController = require("../controllers/transactionController");

// Get all transactions
router.get("/", transactionController.getAllTransactions);

// Get a single transaction
router.get(
  "/:id",
  transactionIdValidation,
  validateRequest,
  transactionController.getTransactionById
);

// Add new transaction
router.post(
  "/",
  transactionValidationRules,
  validateRequest,
  transactionController.createTransaction
);

// Update transaction
router.put(
  "/:id",
  transactionIdValidation,
  transactionValidationRules,
  validateRequest,
  transactionController.updateTransaction
);

// Delete transaction
router.delete(
  "/:id",
  transactionIdValidation,
  validateRequest,
  transactionController.deleteTransaction
);

// Delete multiple transactions
router.delete(
  "/",
  multipleTransactionIdsValidation,
  validateRequest,
  transactionController.deleteMultipleTransactions
);

module.exports = router;
