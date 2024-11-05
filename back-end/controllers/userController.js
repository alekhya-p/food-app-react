import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  createNewUser,
  getUserByEmail,
} from "../repositories/userRepositories.js";
import {
  validateUserLogin,
  validateUserRegisteration,
} from "../services/userServices.js";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    await validateUserLogin(email, password, res);

    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

//create token for user
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checking is user already exists
    await validateUserRegisteration(email, password, res);

    // hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = createNewUser(name, email, hashedPassword);

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error during account creation:", error); // Log the error
    res.status(500).json({ success: false, message: "Account is not created" });
  }
};

export { loginUser, registerUser };
