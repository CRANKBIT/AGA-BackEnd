import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  //TODO: customize errors with error message and status code
  if (!name || !email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Missing required fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide another valid email address" });
  }

  const user = await User.create({ name, email, password });
  const token = user.createJwt();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Missing required fields" });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid credentials" });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid credentials" });
  }

  const token = user.createJwt();
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};
