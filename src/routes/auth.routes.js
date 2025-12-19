// const router = require("express").Router();
// const { login } = require("../controllers/auth.controller");
// const { loginValidator } = require("../validators/auth.validator");
// const { validationResult } = require("express-validator");

// router.post("/login", loginValidator, (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty())
//     return res.status(400).json({ errors: errors.array() });
//   next();
// }, login);

// module.exports = router;
