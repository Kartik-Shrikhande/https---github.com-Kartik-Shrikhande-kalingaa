const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwt");
const SuperAdmin = require("../models/superAdmin.model");
const FranchiseAdmin = require("../models/franchiseAdmin.model");
const FrontOffice = require("../models/frontOffice.model");
const LabTechnician = require("../models/labTechnician.model");



exports.authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies?.refreshtoken;

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      franchiseId: decoded.franchiseId || null
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};


// const jwt = require("jsonwebtoken");



// const jwt = require("jsonwebtoken");
// const { generateToken } = require("../utils/jwt");

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies?.refreshtoken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "No refresh token provided"
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const accessToken = generateToken({
      id: decoded.id,
      role: decoded.role,
      franchiseId: decoded.franchiseId
    });

    return res.status(200).json({
      accessToken
    });
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired refresh token"
    });
  }
};


exports.verifyToken = async (req, res) => {
  try {
    const { id, role } = req.user;

    const roleModels = {
      SuperAdmin,
      FranchiseAdmin,
      FrontOffice,
      LabTechnician
    };

    const UserModel = roleModels[role];

    if (!UserModel) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    const user = await UserModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Token is valid",
      role,
      userId: user._id,
      franchiseId: user.franchiseId || null
    });

  } catch (error) {
    return res.status(500).json({
      message: "Token verification failed"
    });
  }
};
