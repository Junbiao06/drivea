import { useState } from "react";
import type { RegisterInput } from "../schemas/registerSchema";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOff, Mail, UserIcon } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import authService from "@/features/auth/authService";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "../AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form, setForm] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (key: keyof RegisterInput, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    navigate(`/verify-email?email=${encodeURIComponent(form.email)}`);
    try {
      await authService.register(form);
      toast.success("Registration successful! Check your email for the code.");
    } catch {
      toast.error(
        "Registration failed. Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 animate-fade-in">
      <div className="">
        <h3 className="text-2xl font-medium text-zinc-900">
          Creating an account
        </h3>
        <p className="text-sm text-zinc-500 mt-1">
          Enter your details below to get started with 1 GB free storage.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <FieldGroup className="grid w-full grid-cols-2">
          <Field>
            <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="full-name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
              <InputGroupAddon align="inline-start">
                <UserIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="email"
                type="email"
                placeholder="John@example.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
              <InputGroupAddon align="inline-start">
                <Mail />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              required
            />
            <Button
              render={
                <InputGroupAddon align="inline-end">
                  {passwordVisible ? <EyeOff /> : <EyeIcon />}
                </InputGroupAddon>
              }
              onClick={() => setPasswordVisible((visible) => !visible)}
              variant={"ghost"}
            />
          </InputGroup>
          <FieldDescription>
            At least 8 characters, with a letter and a number.
          </FieldDescription>
        </Field>

        {/* Confirm Password */}
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="confirm-password"
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              required
            />
            <Button
              render={
                <InputGroupAddon align="inline-end">
                  {passwordVisible ? <EyeOff /> : <EyeIcon />}
                </InputGroupAddon>
              }
              onClick={() => setPasswordVisible((visible) => !visible)}
              variant={"ghost"}
            />
          </InputGroup>
        </Field>

        {/* Submit Button */}
        <Button type="submit" className="w-full py-4" disabled={loading}>
          Register account
        </Button>
      </form>

      <div className="text-center pt-2">
        <p className="text-sm text-zinc-500">
          Already have an account?{" "}
          <Link to="/login" className="text-primary  hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
