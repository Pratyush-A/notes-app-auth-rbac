const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerSchema } = require("../validators/auth.validator");

async function registerUser(req, res) {
  try {
    const { username, email, password, role } = req.body;

    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const userEmailAlreadyExists = await userModel.findOne({ email });
    if (userEmailAlreadyExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    
    const userNameAlreadyExists = await userModel.findOne({ username });
    if (userNameAlreadyExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.status(201).json({
      message: "User registered successfully"
    });

  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = { registerUser };