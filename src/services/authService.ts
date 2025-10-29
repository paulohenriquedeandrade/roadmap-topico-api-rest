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
