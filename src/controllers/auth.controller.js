const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const SuperAdmin = require("../models/superAdmin.model");
const FranchiseAdmin = require("../models/franchiseAdmin.model");
const FrontOffice = require("../models/frontOffice.model");
const LabTechnician = require("../models/labTechnician.model");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❌ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 🔍 Auto-detect role
    let user = await SuperAdmin.findOne({ email });
    let role = "SuperAdmin";

    if (!user) {
      user = await FranchiseAdmin.findOne({ email });
      role = "FranchiseAdmin";
    }

    if (!user) {
      user = await FrontOffice.findOne({ email });
      role = "FrontOffice";
    }

    if (!user) {
      user = await LabTechnician.findOne({ email });
      role = "LabTechnician";
    }

    // ❌ User not found
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // ❌ Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // ✅ Generate JWT
    const token = generateToken({
      id: user._id,
      role,
      franchiseId: user.franchiseId || null
    });

    // ✅ SET TOKEN IN COOKIE (KEY PART)
    res.cookie("refreshtoken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false // set true in production (HTTPS)
    });

    // ✅ Response (NO TOKEN REQUIRED ON CLIENT)
    return res.status(200).json({
      message: "Login successful",
      role,
      token: token
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Login failed"
    });
  }
};
