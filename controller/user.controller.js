const User = require("../model/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 가입한 유저입니다.");
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    res.status(200).json({ status: "ok", data: newUser });
  } catch (err) {
    console.error("Error in createUser:", err);

    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = userController;
