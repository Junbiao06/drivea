import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/features/auth/AuthContext";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
