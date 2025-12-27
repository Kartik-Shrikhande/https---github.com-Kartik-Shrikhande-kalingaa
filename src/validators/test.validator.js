const { body } = require("express-validator");

exports.createTestValidator = () => [
  body("name").notEmpty().withMessage("Test name is required"),
  body("price").isNumeric().withMessage("Valid price required"),
  body("sampleType").notEmpty().withMessage("Sample type is required")
];

exports.updateTestValidator = () => [
  body("name").optional().notEmpty(),
  body("price").optional().isNumeric(),
  body("sampleType").optional().notEmpty()
];
