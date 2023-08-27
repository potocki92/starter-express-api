const decodeToken = require("../middlewares/decodeToken.js");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ "user.email": email });

    console.log(user.user.password, email, password);
    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Incorrect login or password",
        data: "Unauthorized",
      });
    }

    if (password !== user.user.password) {
      console.log("Incorrect login or password");
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Incorrect login or password",
        data: "Unauthorized",
      });
    }
    const token = jwt.sign(
      { email: user.user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      status: "success",
      code: 200,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      data: "Internal Server Error",
    });
  }
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ "user.email": email });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "User already registered",
        data: "Bad Request",
      });
    }

    const newUser = new User({
      user: {
        name,
        email,
        password,
        NIP: "",
        REGON: "",
        address: {
          city: "",
          postalCode: "",
          street: "",
        },
        phone: "",
      },
    });

    await newUser.save();

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Successfully Registered",
      data: "Created",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
      data: "Internal Server Error",
    });
  }
};

module.exports = {
  registerUser,
};

// GET
const getUser = async (req, res) => {
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

// PUT
const putUser = async (req, res) => {
  const userId = decodeToken(req);
  const updateUser = { ...req.body };
  console.log(userId, updateUser);
  try {
    const user = await User.updateOne(
      {
        _id: userId,
      },
      {
        $set: { user: updateUser },
      }
    );
    if (user.nModified === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
module.exports = { loginUser, registerUser, getUser, putUser };
