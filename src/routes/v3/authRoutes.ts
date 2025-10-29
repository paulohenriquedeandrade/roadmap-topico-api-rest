import { Router } from "express";
import authController from "../../controllers/authController.js";

const auth: Router = Router();

auth.post("/login", authController.login);
auth.post("/register", authController.register);
auth.post("/refresh-token", authController.refresh);

export default auth;
