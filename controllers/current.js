const decodeToken = require("../middlewares/decodeToken");
const User = require("../models/userModel.js");

const getCurrentUser = async (req, res) => {
  try {
    const userId = decodeToken(req);
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.json(user.user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { getCurrentUser };
