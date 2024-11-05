import validator from "validator";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../repositories/userRepositories.js";

const validateUserRegisteration = async (email, password, response) => {
  const user = await getUserByEmail(email);

  if (user) {
    return response
      .status(409)
      .json({ success: "false", message: "User already exists" });
  }

  //validating email format & strong password

  if (!validator.isEmail(email)) {
    return response.status(400).json({
      success: "false",
      message: "Please enter a valid email",
    });
  }

  if (password.length < 8) {
    return response.status(404).json({
      success: false,
      message: "Please enter a strong password",
    });
  }
};

const validateUserLogin = async (email, password, res) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User doesn't exist" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid credentials" });
  }
};

export { validateUserRegisteration, validateUserLogin };
