import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetEmail,
} from "../mailtrap/email.js";


// Function to handle user signup
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    // Here you would typically check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token valid for 24 hours
    });

    // Save the user to the database
    await newUser.save();
    //jwt
    generateTokenAndSetCookie(res, newUser._id);

    // Send verification email
    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...newUser._doc, password: undefined }, // Exclude password from response
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
  // Handle signup logic
};
// Function to handle email verification
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    console.log("Verification code received:", code);

    const user = await User.findOne({
      verificationToken: code,
      verificationExpiresAt: { $gt: new Date() }, // Still valid?
    });

    if (!user) {
      console.log("No user found with this code or token expired");
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isverified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { ...user._doc, password: undefined }, // Exclude password from response
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
// Function to handle user login
export const login = async (req, res) => {
  console.log("Body received at login:", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }

    // Generate JWT and set cookie
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { ...user._doc, password: undefined }, // Exclude password from response
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// Function to handle user logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
  // Handle logout logic
};
// Function to handle password reset
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    // Generate a reset token and set its expiration
    const resetToken = crypto.randomBytes(12).toString("hex");
    const resetExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetExpiresAt;
    await user.save();

    // Send reset email
    await sendResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error baby" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: new Date() }, // Still valid?
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid or expired reset token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -resetPasswordToken"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "Authorized", user });
  } catch (error) {
    console.error("Check auth error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
