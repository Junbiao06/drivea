import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import authService from "../authService";
import { useAuth } from "../AuthContext";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") ?? "";
  const [otp, setOtp] = useState("");
  const { loading, setLoading } = useAuth();

  const [resending, setResending] = useState(false);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.verifyAccount(otp);
      toast.success("Email verified. You can now sign in.");
      navigate("/login", { replace: true });
    } catch {
      toast.error("Verification failed. Check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await authService.sendVerificationEmail();
      toast.success("A new verification code has been sent.");
    } catch {
      toast.error("Could not resend the verification code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 animate-fade-in">
      <Link
        to="/register"
        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to sign up
      </Link>

      <div>
        <h3 className="text-2xl font-medium text-zinc-900">
          Verify your email
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          Enter the 6-digit code we sent to {email || "your email address"}.
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <Field>
          <FieldLabel htmlFor="verification-code">Verification code</FieldLabel>
          <InputOTP
            id="verification-code"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            onChange={setOtp}
            required
            aria-label="Email verification code"
            containerClassName="justify-center"
          >
            <InputOTPGroup className="gap-2">
              {Array.from({ length: 6 }, (_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="size-12 rounded-lg border text-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription className="text-center">
            Check your inbox, including the spam folder.
          </FieldDescription>
        </Field>

        <Button
          type="submit"
          className="w-full py-4"
          disabled={loading || otp.length !== 6}
        >
          {loading ? "Verifying..." : "Verify email"}
        </Button>
      </form>

      <div className="text-center text-sm text-zinc-500">
        Didn&apos;t receive a code?{" "}
        <button
          type="button"
          className="text-primary hover:underline disabled:opacity-50"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? "Sending..." : "Resend code"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
