const { body, param, validationResult } = require("express-validator");

// Helper function to validate requests
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Transaction validation rules
const transactionValidationRules = [
  body("name").notEmpty().withMessage("Transaction name is required"),
  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be either income or expense"),
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .notEmpty()
    .withMessage("Amount is required"),
  body("date").isDate().withMessage("Invalid date format"),
];

// Transaction ID validation
const transactionIdValidation = [
  param("id").isMongoId().withMessage("Invalid transaction ID format"),
];

// Multiple transactions IDs validation
const multipleTransactionIdsValidation = [
  body("ids").isArray().withMessage("IDs must be an array"),
  body("ids.*")
    .isMongoId()
    .withMessage("Invalid transaction ID format in array"),
];

module.exports = {
  validateRequest,
  transactionValidationRules,
  transactionIdValidation,
  multipleTransactionIdsValidation,
};
