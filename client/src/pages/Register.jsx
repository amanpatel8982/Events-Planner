import { useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Phone,
  User,
  UserPlus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api";
import AuthLayout from "../components/AuthLayout";
import flower from "../assets/flower.jpg";
import { getAuthErrorMessage } from "../utils/authErrors";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const fieldConfig = [
  {
    id: "register-name",
    name: "fullName",
    label: "Full name",
    type: "text",
    placeholder: "Your full name",
    autoComplete: "name",
    icon: User,
  },
  {
    id: "register-email",
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    icon: Mail,
  },
  {
    id: "register-phone",
    name: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "+91 98765 43210",
    autoComplete: "tel",
    inputMode: "tel",
    icon: Phone,
  },
];

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordChecks = useMemo(
    () => [
      { label: "8+ characters", met: form.password.length >= 8 },
      { label: "One letter", met: /[A-Za-z]/.test(form.password) },
      { label: "One number", met: /\d/.test(form.password) },
    ],
    [form.password],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitError("");
  };

  const validate = () => {
    const nextErrors = {};
    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const phoneDigits = form.phone.replace(/\D/g, "");

    if (fullName.length < 2) {
      nextErrors.fullName = "Enter your full name.";
    }

    if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (
      form.password.length < 8 ||
      !/[A-Za-z]/.test(form.password) ||
      !/\d/.test(form.password)
    ) {
      nextErrors.password = "Use at least 8 characters with a letter and number.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "The passwords do not match.";
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
    const payload = {
      fullName: form.fullName.trim().replace(/\s+/g, " "),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
    };

    try {
      const response = await api.post("/auth/register", payload);
      navigate("/login", {
        replace: true,
        state: {
          registrationComplete: true,
          email: payload.email,
          message: response.data?.message,
        },
      });
    } catch (error) {
      setSubmitError(
        getAuthErrorMessage(
          error,
          "We could not create your account. Please try again.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      image={flower}
      imageAlt="Refined floral details at a wedding celebration"
      eyebrow="Join EverAfter"
      title="Create your planning account"
      description="Bring your event profile, planning details, and team conversations together in one secure workspace."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-[var(--rose)] hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      {submitError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-lg border border-[#efc1bd] bg-[#fff1f0] p-3.5 text-sm text-[#8d211a]"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
        {fieldConfig.map((field, index) => {
          const Icon = field.icon;
          const errorId = `${field.id}-error`;

          return (
            <div key={field.name}>
              <label htmlFor={field.id} className="field-label">
                {field.label}
              </label>
              <div className="relative">
                <Icon
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#89918c]"
                />
                <input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  inputMode={field.inputMode}
                  value={form[field.name]}
                  onChange={handleChange}
                  className={`field-control pl-10 ${
                    errors[field.name] ? "!border-[#c94b42]" : ""
                  }`}
                  autoFocus={index === 0}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={
                    errors[field.name] ? errorId : undefined
                  }
                />
              </div>
              {errors[field.name] && (
                <p
                  id={errorId}
                  className="mt-1.5 text-xs font-semibold text-[#a32d26]"
                >
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}

        <div>
          <label htmlFor="register-password" className="field-label">
            Password
          </label>
          <div className="relative">
            <LockKeyhole
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#89918c]"
            />
            <input
              id="register-password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className={`field-control px-10 ${
                errors.password ? "!border-[#c94b42]" : ""
              }`}
              placeholder="Create a secure password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby="register-password-help"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-[var(--muted)] transition hover:bg-black/5 hover:text-[var(--ink)]"
              aria-label={showPassword ? "Hide passwords" : "Show passwords"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div
            id="register-password-help"
            className="mt-2 flex flex-wrap gap-x-4 gap-y-1"
          >
            {passwordChecks.map((check) => (
              <span
                key={check.label}
                className={`flex items-center gap-1 text-xs font-semibold ${
                  check.met ? "text-[#34704a]" : "text-[#7c837f]"
                }`}
              >
                <Check size={13} />
                {check.label}
              </span>
            ))}
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs font-semibold text-[#a32d26]">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="register-confirm-password" className="field-label">
            Confirm password
          </label>
          <div className="relative">
            <LockKeyhole
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#89918c]"
            />
            <input
              id="register-confirm-password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              className={`field-control pl-10 ${
                errors.confirmPassword ? "!border-[#c94b42]" : ""
              }`}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword
                  ? "register-confirm-password-error"
                  : undefined
              }
            />
          </div>
          {errors.confirmPassword && (
            <p
              id="register-confirm-password-error"
              className="mt-1.5 text-xs font-semibold text-[#a32d26]"
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="button-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Create account
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
