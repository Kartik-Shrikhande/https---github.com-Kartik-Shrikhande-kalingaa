const { body, param } = require("express-validator");

exports.createFranchiseAdminValidator = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("franchiseId").isMongoId(),
];

exports.updateFranchiseAdminValidator = [
  param("id").isMongoId(),
  body("email").optional().isEmail(),
];
