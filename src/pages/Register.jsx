import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Check,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const passwordChecks = [
    {
      label: "At least 6 characters",
      valid: formData.password.length >= 6,
    },
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(formData.password),
    },
    {
      label: "At least one number",
      valid: /[0-9]/.test(formData.password),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();

    if (fullName.length < 2) {
      toast.error("Please enter your full name.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    // Supabase registration will be connected later.
    setTimeout(() => {
      setLoading(false);

      toast("Registration will be available after backend integration.", {
        icon: "🔐",
      });
    }, 700);
  };

  const PasswordInput = ({
    id,
    name,
    label,
    placeholder,
    show,
    toggle,
    value,
  }) => (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-white"
      >
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] px-4 transition focus-within:border-[#8B5CF6] focus-within:ring-2 focus-within:ring-[#8B5CF6]/10">
        <LockKeyhole size={18} className="shrink-0 text-[#AAA3C1]" />

        <input
          id={id}
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={name === "password" ? "new-password" : "new-password"}
          required
          minLength={6}
          className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#77718D]"
        />

        <button
          type="button"
          onClick={toggle}
          className="shrink-0 text-[#AAA3C1] transition hover:text-white"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-4 py-12">
      {/* Background Effects */}
      <div className="pointer-events-none absolute left-0 top-10 h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#38BDF8]/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-[#211B3B]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          {/* Header */}
          <div className="mb-7 text-center">
            <Link
              to="/"
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#2563EB] shadow-lg shadow-purple-500/20"
            >
              <Zap size={34} className="fill-white text-white" />
            </Link>

            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-[#AAA3C1]">
              Join AI-SaleBD and explore your digital world.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Full Name
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] px-4 transition focus-within:border-[#8B5CF6]">
                <UserRound size={18} className="shrink-0 text-[#AAA3C1]" />

                <input
                  id="register-name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  minLength={2}
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#77718D]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] px-4 transition focus-within:border-[#8B5CF6]">
                <Mail size={18} className="shrink-0 text-[#AAA3C1]" />

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#77718D]"
                />
              </div>
            </div>

            {/* Password */}
            <PasswordInput
              id="register-password"
              name="password"
              label="Password"
              placeholder="Create a password"
              show={showPassword}
              toggle={() => setShowPassword((prev) => !prev)}
              value={formData.password}
            />

            {/* Password Strength */}
            {formData.password.length > 0 && (
              <div className="rounded-xl border border-white/5 bg-[#11101C] p-3">
                <p className="mb-2 text-xs font-semibold text-[#AAA3C1]">
                  Password Requirements
                </p>

                <div className="space-y-2">
                  {passwordChecks.map((check) => (
                    <div
                      key={check.label}
                      className="flex items-center gap-2 text-xs"
                    >
                      {check.valid ? (
                        <Check size={14} className="text-green-400" />
                      ) : (
                        <X size={14} className="text-[#77718D]" />
                      )}

                      <span
                        className={
                          check.valid ? "text-green-400" : "text-[#AAA3C1]"
                        }
                      >
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <PasswordInput
              id="register-confirm-password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword((prev) => !prev)}
              value={formData.confirmPassword}
            />

            {formData.confirmPassword.length > 0 && (
              <p
                className={`flex items-center gap-2 text-xs ${
                  formData.password === formData.confirmPassword
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {formData.password === formData.confirmPassword ? (
                  <>
                    <Check size={14} /> Passwords match
                  </>
                ) : (
                  <>
                    <X size={14} /> Passwords do not match
                  </>
                )}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] py-3.5 font-bold text-white shadow-lg shadow-purple-500/10 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Please wait...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-7 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-[#AAA3C1]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#B99AFF] transition hover:text-white"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Security */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#77718D]">
            <ShieldCheck size={15} className="text-green-400" />
            Secure account experience with AI-SaleBD
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-[#77718D]">
          Your Digital World, One Marketplace.
        </p>
      </div>
    </section>
  );
};

export default Register;
