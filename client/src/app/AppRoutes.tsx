import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "@/features/auth/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import Drive from "@/pages/Drive";
import Trash from "@/pages/Trash";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/drive" replace />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="forget-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="/drive" element={<Drive />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="*" element={<Navigate to="/drive" replace />} />
    </Routes>
  );
};

export default AppRoutes;
