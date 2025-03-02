const express = require("express");
const router = express.Router();
const Transaction = require("../../server/models/Transaction");
const {
  validateRequest,
  transactionValidationRules,
  transactionIdValidation,
  multipleTransactionIdsValidation,
} = require("../middlewares/validation");

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single transaction
router.get(
  "/:id",
  transactionIdValidation,
  validateRequest,
  async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.json(transaction);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Add new transaction
router.post(
  "/",
  transactionValidationRules,
  validateRequest,
  async (req, res) => {
    try {
      const newTransaction = new Transaction(req.body);
      const savedTransaction = await newTransaction.save();
      res.status(201).json(savedTransaction);
    } catch (error) {
      console.error("Error adding transaction:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete transaction
router.delete(
  "/:id",
  transactionIdValidation,
  validateRequest,
  async (req, res) => {
    try {
      const result = await Transaction.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.json({ message: "Transaction deleted" });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete multiple transactions
router.delete(
  "/",
  multipleTransactionIdsValidation,
  validateRequest,
  async (req, res) => {
    try {
      const { ids } = req.body;
      const result = await Transaction.deleteMany({ _id: { $in: ids } });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "No transactions found to delete" });
      }

      res.json({
        message: `${result.deletedCount} transaction(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      console.error("Error deleting multiple transactions:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Update transaction
router.put(
  "/:id",
  transactionIdValidation,
  transactionValidationRules,
  validateRequest,
  async (req, res) => {
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.json(updatedTransaction);
    } catch (error) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
