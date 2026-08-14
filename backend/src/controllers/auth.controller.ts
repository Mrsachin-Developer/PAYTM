import { Request, Response, NextFunction } from "express";
import { loginSchema, signupSchema } from "../validators/auth.validator.js";
import {
  getCurrentUserService,
  loginService,
  signupService,
} from "../services/auth.services.js";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const user = await signupService(
      validatedData.firstName,
      validatedData.lastName,
      validatedData.email,
      validatedData.phone,
      validatedData.password,
    );

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginService(
      validatedData.email,
      validatedData.password,
    );

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const meController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getCurrentUserService(req.userId!);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
