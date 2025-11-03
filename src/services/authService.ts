/**
 * Service de autenticação
 * Contém a lógica de negócio para registro, login e renovação de tokens
 * @module services/authService
 */
import bcrypt from "bcryptjs";
import userRepository from "../repositories/userRepository.js";
import {
  RegisterInput,
  LoginInput,
  AuthResponse,
  TokenPayload,
} from "../types/auth.types.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

class AuthService {
  /**
   * @async
   * @function register
   * @param {RegisterInput} data - Dados para registro
   * @returns {Promise<AuthResponse>} Resposta de autenticação com tokens e dados do usuário
   */
  async register(data: RegisterInput): Promise<AuthResponse> {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
    });

    const payload: TokenPayload = { userId: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await userRepository.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  /**
   * Realiza o login do usuário
   * @async
   * @function login
   * @param {LoginInput} data - Dados para login
   * @returns {Promise<AuthResponse>} Resposta de autenticação com tokens e dados do usuário
   */
  async login(data: LoginInput): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    const payload: TokenPayload = { userId: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await userRepository.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  /**
   * Renova o token de acesso usando o token de refresh
   * @async
   * @function refreshAccessToken
   * @param {string} token - Token de refresh
   * @returns {Promise<{ accessToken: string }>} Novo token de acesso
   */
  async refreshAccessToken(token: string): Promise<{ accessToken: string }> {
    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      throw new Error("Invalid refresh token.");
    }

    const user = await userRepository.findById(decoded.userId);
    if (!user || user.refreshToken !== token) {
      throw new Error("Invalid refresh token.");
    }

    const payload: TokenPayload = { userId: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);

    return { accessToken };
  }
}

export default new AuthService();
