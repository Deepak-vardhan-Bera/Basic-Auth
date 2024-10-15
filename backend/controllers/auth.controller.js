import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.utils.js";
import {
  sendForgotPasswordEmail,
  sendResetPasswordEmail,
  sendVerifyEmail,
  sendWelcomeEmail,
} from "../utils/mailer.utils.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ success: false, message: "All fields Are required" });
    return;  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "Invalid Credentials" });
      return;
    }
    if (!user.isverified) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Email not verified Try with another Email",
        });
    }
    const ispasswordvalid = await bcryptjs.compare(password, user.password);
    if (!ispasswordvalid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    generateTokenAndSetCookie(user._id, res);
    user.lastlogin = Date.now();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Loggedin sucessfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "login failed",
      Error: error,
    });
    console.log("error in login", error);
  }
};
export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  console.log(email, name, password);

  try {
    if (!email || !name || !password){
        res.status(400).json({ success: false, message: "All fields Are required" });
    return
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }
    const hashedpassword = await bcryptjs.hash(password, 10);
    console.log(hashedpassword);
    const verificationToken =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const user = new User({
      email,
      name,
      password: hashedpassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save();
    await generateTokenAndSetCookie(user._id, res);
    const data = {
      subject: "verfication code for basic auth",
      text: `Your verficaiton code for basic auth is ${verificationToken}`,
      token: verificationToken,
    };
    const result = await sendVerifyEmail(user.email, data);

    return res.status(201).json({
      success: true,
      message:
        "user created successfully and verification code sent thorugh email",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfuly" });
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or Expired Verification code" });
    }
    user.isverified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    const data = {
      name: user.name,
      email: user.email,
    };
    await user.save();
    await sendWelcomeEmail(data);
    return res.status(200).json({
      message: "Email successfully verified",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not found" });
    }
    const resetPasswordToken = await crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetPasswordToken;
    user.resetTokenExpiresAt = resetTokenExpiresAt;
    console.log(user.email);
    await user.save();
    const data = {
      name: user.name,
      email: user.email,
      reseturi: `${process.env.CLIENT_URI}/reset-password/${resetPasswordToken}`,
    };
    await sendForgotPasswordEmail(data);
    return res
      .status(200)
      .json({
        success: true,
        message: "Password Reset Link sent to your email",
      });
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Error In sending reset password link error:",
        error,
      });
  }
};
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log(token, password);
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const ispasswordvalid = await bcryptjs.compare(password, user.password);
    if (ispasswordvalid) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Your Last Password is same as new password",
        });
    }

    user.password = await bcryptjs.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetTokenExpiresAt = undefined;

    await user.save();
    const data = {
      name: user.name,
      email: user.email,
    };
    await sendResetPasswordEmail(data);
    res
      .status(200)
      .json({ success: true, message: "Password Reset successfull" });
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Error In resetting password error:",
        error,
      });
  }
};

export const checkAuth = async (req, res) => {
  const { userId } = req.userId;
  try {
    const user = await User.findOne({ userId });
    if (!user)
      return res.status(401).json({ success: false, message: "unauthorized" });
    return res
      .status(200)
      .json({
        success: true,
        message: "user authorized",
        user: { ...user._doc, password: undefined },
      });
  } catch (error) {
    res.status(400).json({ success: false, message: "server error", error });
  }
};
