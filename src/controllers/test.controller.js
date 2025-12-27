const Test = require("../models/test.model");

exports.create = async (req, res) => {
  try {
    const test = await Test.create({
      ...req.body,
      franchiseId: req.user.franchiseId
    });

    return res.status(201).json({
      message: "Test created successfully",
      data: test
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create test",
      error: error.message
    });
  }
};

exports.getAll = async (req, res) => {
  const tests = await Test.find({
    franchiseId: req.user.franchiseId
  });

  return res.status(200).json({
    total: tests.length,
    data: tests
  });
};

exports.getById = async (req, res) => {
  const test = await Test.findOne({
    _id: req.params.id,
    franchiseId: req.user.franchiseId
  });

  if (!test) {
    return res.status(404).json({
      message: "Test not found"
    });
  }

  return res.status(200).json(test);
};

exports.update = async (req, res) => {
  const test = await Test.findOneAndUpdate(
    {
      _id: req.params.id,
      franchiseId: req.user.franchiseId
    },
    req.body,
    { new: true }
  );

  if (!test) {
    return res.status(404).json({
      message: "Test not found"
    });
  }

  return res.status(200).json({
    message: "Test updated successfully",
    data: test
  });
};

exports.toggleStatus = async (req, res) => {
  const test = await Test.findOne({
    _id: req.params.id,
    franchiseId: req.user.franchiseId
  });

  if (!test) {
    return res.status(404).json({
      message: "Test not found"
    });
  }

  test.isActive = !test.isActive;
  await test.save();

  return res.status(200).json({
    message: `Test ${test.isActive ? "activated" : "deactivated"} successfully`,
    data: test
  });
};




exports.remove = async (req, res) => {
  try {
    const test = await Test.findOneAndDelete({
      _id: req.params.id,
      franchiseId: req.user.franchiseId
    });

    if (!test) {
      return res.status(404).json({
        message: "Test not found"
      });
    }

    return res.status(200).json({
      message: "Test deleted permanently"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete test",
      error: error.message
    });
  }
};
