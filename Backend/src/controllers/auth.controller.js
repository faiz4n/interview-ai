const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @name registerUserController
 * @description register a user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide username, email and password" });
  }

  const userAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExists) {
    return res
      .status(400)
      .json({ msg: "User already exists with this username or email" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: username,
    email: email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    msg: "User created successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name loginUserController
 * @description login a user, expects  email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ msg: "Invalid email or password " });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    msg: "User logged in successfully",
    user: { id: user._id, username: user.username, email: user.email },
  });
}

/**
 * @name logoutUserController
 * @description clear token from cookies and blacklist the token
 * @access Public
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await blacklistTokenModel.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({ msg: "User logged out successfully" });
}

/**
 * @name getMeController
 * @description get the details of the logged in user
 * @access Private
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({
    msg: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.username,
    },
  });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
