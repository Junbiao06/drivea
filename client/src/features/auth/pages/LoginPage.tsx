import { useState } from "react";
import type { LoginInput } from "@/features/auth/schemas/loginSchema";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOff, Mail } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import authService from "@/features/auth/authService";
import toast from "react-hot-toast";
import { useAuth } from "../AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { loading, setLoading } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form, setForm] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const updateField = (key: keyof LoginInput, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      authService.login(form);
      toast.success("Login successful!");
      navigate("/drive");
    } catch {
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 animate-fade-in">
      <div className="">
        <h3 className="text-2xl font-medium text-zinc-900">Welcome back!</h3>
        <p className="mt-1 text-sm text-zinc-500">
          Enter your credentials to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="email"
              type="email"
              placeholder="John@example.com"
              value={form.email}
              onChange={(e) => {
                updateField("email", e.target.value);
              }}
            />
            <InputGroupAddon align="inline-start">
              <Mail />
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              to="/forget-password"
              className="text-sm text-zinc-500 hover:text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <InputGroup>
            <InputGroupInput
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
              value={form.password}
              onChange={(e) => {
                updateField("password", e.target.value);
              }}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                size="icon-xs"
                onClick={() => setPasswordVisible((visible) => !visible)}
              >
                {passwordVisible ? <EyeOff /> : <EyeIcon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            At least 8 characters, with a letter and a number.
          </FieldDescription>
        </Field>

        <Button type="submit" className="w-full py-4" disabled={loading}>
          Sign in
        </Button>
      </form>

      <div className="pt-2 text-center">
        <p className="text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
