const router = require("express").Router();
const { authenticateUser } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
const { validationResult } = require("express-validator");

const controller = require("../controllers/test.controller");
const validator = require("../validators/test.validator");

router.use(
  authenticateUser,
  authorizeRoles(["FranchiseAdmin", "FrontOffice"])
);

// CREATE (FranchiseAdmin only)
router.post(
  "/create",
  authorizeRoles(["FranchiseAdmin"]),
  validator.createTestValidator(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  controller.create
);

// GET ALL
router.get("/all", controller.getAll);

// GET BY ID
router.get("/get/:id", controller.getById);

// UPDATE (FranchiseAdmin only)
router.put(
  "/update/:id",
  authorizeRoles(["FranchiseAdmin"]),
  validator.updateTestValidator(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  controller.update
);

// ACTIVATE / DEACTIVATE
router.patch(
  "/toggle-status/:id",
  authorizeRoles(["FranchiseAdmin"]),
  controller.toggleStatus
);

// PERMANENT DELETE (FranchiseAdmin only)
router.delete(
  "/delete/:id",
  authorizeRoles(["FranchiseAdmin"]),
  controller.remove
);



module.exports = router;
