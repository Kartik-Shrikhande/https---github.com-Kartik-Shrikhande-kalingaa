const { body } = require("express-validator");

exports.createFranchiseValidator = () => [
  body("name").notEmpty().withMessage("Franchise name required"),
  body("location").notEmpty().withMessage("Location required"),
];

exports.updateFranchiseValidator = () => [
  body("name").optional().notEmpty(),
  body("location").optional().notEmpty(),
];
