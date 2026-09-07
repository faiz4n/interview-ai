const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

//routes

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear token from cookies and blacklist the token
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the details of the logged in user
 * @access Private
 */
authRouter.get(
  "/get-me",
  authMiddleware.authUser,
  authController.getMeController,
);

/**
 * @route GET /api/auth/health
 * @description Health check endpoint
 * @access Public
 */
authRouter.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "OK",
  });
});

module.exports = authRouter;
