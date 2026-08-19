import {
  AlertTriangle,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";

const initialData = {
  reason: "",
  feedback: "",
  confirmPassword: "",
  confirmDeactivation: false,
};

const AccountDeactivateModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { setUser, setIsLogin, setIsAdmin } = useAuth();
  const [deactivationData, setDeactivationData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setDeactivationData(initialData);
    setShowPassword(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, loading, onClose]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setDeactivationData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeactivateAccount = async (event) => {
    event.preventDefault();

    if (!deactivationData.confirmDeactivation) {
      toast.error("Confirm that you understand the account will be inactive");
      return;
    }

    if (!deactivationData.confirmPassword) {
      toast.error("Enter your password to confirm deactivation");
      return;
    }

    setLoading(true);

    try {
      const response = await api.put("/user/deactivate", deactivationData);

      setUser("");
      sessionStorage.removeItem("EventUser");
      setIsLogin(false);
      setIsAdmin(false);
      toast.success(response.data?.message || "Account deactivated");
      onClose();
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to deactivate your account",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onClose();
      }}
    >
      <section
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deactivate-modal-title"
        aria-describedby="deactivate-modal-description"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-red-100 bg-white p-5 sm:p-6">
          <div>
            <p className="text-sm font-semibold text-red-700">
              Account security
            </p>
            <h2
              id="deactivate-modal-title"
              className="mt-1 text-2xl font-semibold text-[var(--ink)]"
            >
              Deactivate your account
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper)] disabled:opacity-50"
            aria-label="Close account deactivation"
            title="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="p-5 sm:p-6">
          <div className="flex gap-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-red-700"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-semibold text-red-900">
                This changes your account status
              </h3>
              <p
                id="deactivate-modal-description"
                className="mt-1 text-sm leading-6 text-red-800"
              >
                Deactivation marks the account inactive and signs you out of
                this workspace. Contact support if you need help restoring
                access later.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleDeactivateAccount}
            className="mt-6 space-y-5"
          >
            <div>
              <label htmlFor="deactivation-reason" className="field-label">
                Why are you deactivating?
              </label>
              <select
                id="deactivation-reason"
                name="reason"
                value={deactivationData.reason}
                onChange={handleInputChange}
                className="field-control"
                required
              >
                <option value="">Select a reason</option>
                <option value="not-using">
                  I am not using the service anymore
                </option>
                <option value="privacy-concerns">Privacy concerns</option>
                <option value="found-alternative">
                  I found another service
                </option>
                <option value="technical-issues">Technical issues</option>
                <option value="temporary-break">
                  I am taking a temporary break
                </option>
                <option value="other">Another reason</option>
              </select>
            </div>

            <div>
              <label htmlFor="deactivation-feedback" className="field-label">
                Additional feedback
                <span className="ml-1 font-normal text-[var(--muted)]">
                  (optional)
                </span>
              </label>
              <textarea
                id="deactivation-feedback"
                name="feedback"
                value={deactivationData.feedback}
                onChange={handleInputChange}
                className="field-control min-h-28 resize-y"
                placeholder="Share anything the team should understand about your decision."
                maxLength="1000"
              />
            </div>

            <div>
              <label htmlFor="deactivation-password" className="field-label">
                Current password
              </label>
              <div className="relative">
                <LockKeyhole
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
                  aria-hidden="true"
                />
                <input
                  id="deactivation-password"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={deactivationData.confirmPassword}
                  onChange={handleInputChange}
                  className="field-control px-10"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-4">
              <input
                type="checkbox"
                name="confirmDeactivation"
                checked={deactivationData.confirmDeactivation}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 shrink-0 accent-red-700"
              />
              <span className="text-sm leading-6 text-[var(--muted)]">
                I understand that this account will be marked inactive and my
                current session will end.
              </span>
            </label>

            <div className="flex flex-col-reverse gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="button-secondary"
              >
                Keep my account
              </button>
              <button
                type="submit"
                disabled={loading || !deactivationData.confirmDeactivation}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-red-700 bg-red-700 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300"
              >
                {loading && (
                  <LoaderCircle
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {loading ? "Deactivating..." : "Deactivate account"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AccountDeactivateModal;
