import { Request, Response } from "express";
import authService from "../services/authService.js";

class AuthController {
  async register(req: Request, res: Response) {
    const { email, password, name } = req.body;
    try {
      const user = await authService.register({ email, password, name });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await authService.login({ email, password });
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    try {
      const newToken = await authService.refreshAccessToken(refreshToken);
      res.status(200).json({ token: newToken });
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  }
}

export default new AuthController();
