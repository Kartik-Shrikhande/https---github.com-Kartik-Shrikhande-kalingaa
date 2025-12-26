const router = require("express").Router();
const { authenticateUser } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
const { validationResult } = require("express-validator");

const controller = require("../controllers/patient.controller");
const validator = require("../validators/patient.validator");

router.use(
  authenticateUser,
  authorizeRoles(["FranchiseAdmin", "FrontOffice"])
);

router.post(
  "/create",
  validator.createPatientValidator(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  controller.create
);

router.get("/all", controller.getAll);
router.get("/get/:id", controller.getById);

router.put(
  "/update/:id",
  validator.updatePatientValidator(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  controller.update
);

router.delete("/delete/:id", controller.remove);

module.exports = router;
