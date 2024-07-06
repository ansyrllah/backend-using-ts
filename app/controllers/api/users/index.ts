import { Request, Response } from "express";
import UserService from "../../../services/userService";

interface AuthenticatedRequest extends Request {
  user?: {
    nama: any;
  };
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await UserService.login(email, password);
    res.status(200).json({
      message: "Login success",
      data: user,
    });
  } catch (error:any) {
    res.status(401).json({
      message: error.message,
    });
  }
}

async function register(req: AuthenticatedRequest, res: Response) {
  const { email, password, nama, avatar, role } = req.body;
  const createdBy = req.user?.nama;

  try {
    const user = await UserService.register({ email, password, nama, avatar, role }, createdBy);
    res.status(201).json({
      message: "User created successfully",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        nama: user.nama,
        created_at: user.created_at,
      },
    });
  } catch (error:any) {
    res.status(400).json({
      message: error.message,
    });
  }
}

async function registerMember(req: AuthenticatedRequest, res: Response) {
  const { email, password, nama, avatar } = req.body;

  try {
    const user = await UserService.registerMember({ email, password, nama, avatar });
    res.status(201).json({
      message: "User created successfully",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        nama: user.nama,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function whoami(req: any, res: Response) {
  res.status(200).json({
    status: 'OK',
    message: "Who am I",
    data: req.user,
  });
}

export default {
  login,
  register,
  registerMember,
  whoami,
};
