const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const SuperAdmin = require("../models/superAdmin.model");
const FranchiseAdmin = require("../models/franchiseAdmin.model");
const FrontOffice = require("../models/frontOffice.model");
const LabTechnician = require("../models/labTechnician.model");
const Patient = require("../models/patient.model");

exports.login = async (req, res) => {
  const { role, email, mobile, password } = req.body;

  let Model;
  if (role === "SuperAdmin") Model = SuperAdmin;
  if (role === "FranchiseAdmin") Model = FranchiseAdmin;
  if (role === "FrontOffice") Model = FrontOffice;
  if (role === "LabTechnician") Model = LabTechnician;
  if (role === "Patient") Model = Patient;

  if (!Model) return res.status(400).json({ message: "Invalid role" });

  const user = role === "Patient"
    ? await Model.findOne({ mobile })
    : await Model.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  if (role !== "Patient") {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    id: user._id,
    role,
    franchiseId: user.franchiseId || null
  });

  res.json({ token });
};
