import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, EyeIcon, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import authService from "../authService";
import { forgotPasswordSchema } from "../schemas/forgotPasswordSchema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import type { ForgotPasswordInput } from "../schemas/forgotPasswordSchema";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<ForgotPasswordInput>({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [sendingCode, setSendingCode] = useState(false);

  const handleVerify = async () => {
    const email = form.email.trim();
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSendingCode(true);
    try {
      await authService.sendResetPasswordEmail(email);
      toast.success("Verification code sent to your email.");
    } catch {
      toast.error(
        "Could not send the code. Please check your email and try again.",
      );
    } finally {
      setSendingCode(false);
    }
  };

  const updateField = (key: keyof ForgotPasswordInput, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = forgotPasswordSchema.safeParse({
      ...form,
      email: form.email.trim(),
    });
    if (!result.success) {
      toast.error(
        result.error.issues[0]?.message ?? "Please check the entered information.",
      );
      return;
    }

    setSubmitting(true);
    try {
      await authService.resetPassword(result.data);
      toast.success("Password reset successfully. Please sign in.");
      navigate("/login", { replace: true });
    } catch {
      toast.error("Password reset failed. Check the code and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 animate-fade-in">
      <Link
        to="/login"
        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>

      <div>
        <h3 className="text-2xl font-medium text-zinc-900">Reset password</h3>
        <p className="mt-1 text-sm text-zinc-500">
          Enter your email address and verify it to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Field orientation="horizontal">
            <Input
              id="email"
              type="email"
              placeholder="John@example.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
            <Button type="button" onClick={handleVerify} disabled={sendingCode}>
              {sendingCode ? "Sending..." : "Verify"}
            </Button>
          </Field>
        </Field>

        <Field>
          <FieldLabel htmlFor="otp">OTP</FieldLabel>
          <InputOTP
            id="otp"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={form.otp}
            onChange={(value) => updateField("otp", value)}
            required
            aria-label="One-time password"
            containerClassName="justify-center"
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot
                index={0}
                className="size-12 rounded-lg border text-lg"
              />
              <InputOTPSlot
                index={1}
                className="size-12 rounded-lg border text-lg"
              />
              <InputOTPSlot
                index={2}
                className="size-12 rounded-lg border text-lg"
              />
              <InputOTPSlot
                index={3}
                className="size-12 rounded-lg border text-lg"
              />
              <InputOTPSlot
                index={4}
                className="size-12 rounded-lg border text-lg"
              />
              <InputOTPSlot
                index={5}
                className="size-12 rounded-lg border text-lg"
              />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription className="text-center">
            Enter the 6-digit OTP sent to your email address.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">New password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              required
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                size="icon-xs"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
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

        <Field>
          <FieldLabel htmlFor="confirm-password">
            Confirm new password
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="confirm-password"
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              required
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                size="icon-xs"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
                onClick={() => setPasswordVisible((visible) => !visible)}
              >
                {passwordVisible ? <EyeOff /> : <EyeIcon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Button type="submit" className="w-full py-4" disabled={submitting}>
          {submitting ? "Resetting..." : "Reset password"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
