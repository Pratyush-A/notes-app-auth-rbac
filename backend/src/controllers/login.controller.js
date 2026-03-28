const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { loginSchema } = require("../validators/auth.validator");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

   
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    
    return res.status(200).json({
      message: "Login successful",
      role: user.role
    });

  } catch (err) {
    console.error("Error logging in:", err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = { loginUser };