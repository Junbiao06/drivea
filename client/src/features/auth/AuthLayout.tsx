import { Outlet } from "react-router-dom";
import LeftSideBranding from "./components/LeftSideBranding";

const AuthLayout = () => {
  return (
    <main className="min-h-screen text-zinc-900 flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <LeftSideBranding />
      {/* Right side - Content */}
      <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-zinc-50">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
