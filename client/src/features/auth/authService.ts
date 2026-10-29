import type { ForgotPasswordInput } from "./schemas/forgotPasswordSchema";
import type { LoginInput } from "./schemas/loginSchema";
import type { RegisterInput } from "./schemas/registerSchema";
import api from "@/lib/api";

const authService = {
  login: (input: LoginInput) => api.post("/auth/login", input),
  register: (input: RegisterInput) => api.post("/auth/register", input),
  logout: () => api.post("/auth/logout"),
  sendVerificationEmail: () => api.post("/auth/send-verification-email"),
  verifyAccount: (otp: string) => api.post("/auth/verify-account", { otp }),
  isVerified: () => api.get("/auth/is-verified"),
  sendResetPasswordEmail: (email: string) =>
    api.post("/auth/send-reset-password-email", { email }),
  resetPassword: (input: ForgotPasswordInput) =>
    api.post("/auth/reset-password", input),
  getMe: () => api.get("/auth/me"),
};

export default authService;
