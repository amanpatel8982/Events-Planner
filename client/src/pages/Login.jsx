import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  Mail,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/api";
import AuthLayout from "../components/AuthLayout";
import rose from "../assets/rose.jpg";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/authErrors";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setIsLogin, setIsAdmin } = useAuth();
  const [form, setForm] = useState(() => ({
    email: location.state?.email || "",
    password: "",
  }));
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitError("");
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim();

    if (!email) {
      nextErrors.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Enter your password.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      const loggedInUser = response.data?.data
        ? { ...response.data.data }
        : null;

      if (!loggedInUser || typeof loggedInUser !== "object") {
        setSubmitError(
          "Your account response was incomplete. Please try signing in again.",
        );
        return;
      }

      delete loggedInUser.password;
      setUser(loggedInUser);
      setIsLogin(true);
      setIsAdmin(loggedInUser.role === "Admin");
      sessionStorage.setItem("EventUser", JSON.stringify(loggedInUser));
      toast.success(response.data?.message || "Welcome back.");
      navigate(loggedInUser.role === "Admin" ? "/adminpanel" : "/dashboard", {
        replace: true,
      });
    } catch (error) {
      setSubmitError(
        getAuthErrorMessage(
          error,
          "Sign in failed. Check your email and password.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      image={rose}
      imageAlt="Elegant rose-toned event table styling"
      eyebrow="Welcome back"
      title="Continue planning your celebration"
      description="Sign in to review your profile, planning updates, and conversations with the EverAfter team."
      footer={
        <>
          New to EverAfter?{" "}
          <Link
            to="/register"
            className="font-bold text-[var(--rose)] hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      {location.state?.registrationComplete && (
        <div
          role="status"
          className="mb-5 flex items-start gap-3 rounded-lg border border-[#bad7c4] bg-[#edf7f0] p-3.5 text-sm text-[#245737]"
        >
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          <span>Your account is ready. Sign in with your new credentials.</span>
        </div>
      )}

      {submitError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-lg border border-[#efc1bd] bg-[#fff1f0] p-3.5 text-sm text-[#8d211a]"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
        <div>
          <label htmlFor="login-email" className="field-label">
            Email address
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#89918c]"
            />
            <input
              id="login-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`field-control pl-10 ${
                errors.email ? "!border-[#c94b42]" : ""
              }`}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p
              id="login-email-error"
              className="mt-1.5 text-xs font-semibold text-[#a32d26]"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="login-password" className="field-label">
            Password
          </label>
          <div className="relative">
            <LockKeyhole
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#89918c]"
            />
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className={`field-control px-10 ${
                errors.password ? "!border-[#c94b42]" : ""
              }`}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "login-password-error" : undefined
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-[var(--muted)] transition hover:bg-black/5 hover:text-[var(--ink)]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p
              id="login-password-error"
              className="mt-1.5 text-xs font-semibold text-[#a32d26]"
            >
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="button-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn size={18} />
              Sign in
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
