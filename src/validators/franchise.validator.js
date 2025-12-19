const { body, param } = require("express-validator");

exports.createFranchiseValidator = [
  body("name").notEmpty().withMessage("Franchise name is required"),
  body("contactNumber").optional().isMobilePhone(),
];

exports.updateFranchiseValidator = [
  param("id").isMongoId(),
  body("name").optional().notEmpty(),
  body("contactNumber").optional().isMobilePhone(),
];
