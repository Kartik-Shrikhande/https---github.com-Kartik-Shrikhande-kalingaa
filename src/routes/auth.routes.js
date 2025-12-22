const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { authenticateUser } = require("../middlewares/auth.middleware");
const { validationResult } = require("express-validator");


router.post("/login", authController.login);
router.post("/refresh-token", authMiddleware.refreshToken);
router.get("/verify",authMiddleware.verifyToken);

module.exports = router;

