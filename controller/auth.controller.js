const jwt = require("jsonwebtoken");

require("dotenv").config();

const authController = {};

const secretKey = process.env.JWT_SECRET_KEY;

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("invalid token");
    }
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, secretKey, (error, payload) => {
      if (error) {
        throw new Error("invalid token");
      }
      // res.status(200).json({ status: 'ok', userId: payload._id });
      req.userId = payload._id;
    });
    next();
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
    console.error("Error in :", err);
  }
};

module.exports = authController;
