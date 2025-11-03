/**
 * Controller de Autenticação
 * Gerencia operações HTTP para registro, login e renovação de tokens
 * @module controllers/authController
 */
import { Request, Response } from "express";
import authService from "../services/authService.js";

class AuthController {
  /**
   * Registra um novo usuário
   * @async
   * @function register
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>} 201 - Usuário registrado
   * @throws {Error} 400 - Erro ao registrar usuário
   */
  async register(req: Request, res: Response) {
    const { email, password, name } = req.body;
    try {
      const user = await authService.register({ email, password, name });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  /**
   * Realiza o login do usuário
   * @async
   * @function login
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>} 200 - Token de autenticação
   * @throws {Error} 401 - Erro ao realizar login
   */
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await authService.login({ email, password });
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  }

  /**
   * Renova o token de acesso usando o refresh token
   * @async
   * @function refresh
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>} 200 - Novo token de autenticação
   * @throws {Error} 401 - Erro ao renovar token
   */
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
