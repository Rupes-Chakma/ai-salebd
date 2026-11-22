import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();

    if (!email || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // Authentication will be connected with Supabase later.
    setTimeout(() => {
      setLoading(false);

      toast("Login will be available after backend integration.", {
        icon: "🔐",
      });
    }, 700);
  };

  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-3 py-8 sm:px-4 sm:py-12">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#38BDF8]/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-2xl border border-white/10 bg-[#211B3B]/95 p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">
          {/* Logo & Heading */}
          <div className="mb-7 text-center sm:mb-8">
            <Link
              to="/"
              aria-label="AI-SaleBD Home"
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#2563EB] shadow-lg shadow-purple-500/20 transition hover:scale-105 sm:h-16 sm:w-16"
            >
              <Zap size={31} className="fill-white text-white sm:size-[34px]" />
            </Link>

            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Welcome Back!
            </h1>

            <p className="mx-auto mt-2 max-w-[280px] text-xs leading-6 text-[#AAA3C1] sm:max-w-none sm:text-sm">
              Login to continue your AI-SaleBD experience.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-xs font-semibold text-white sm:text-sm"
              >
                Email Address
              </label>

              <div className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] px-3.5 transition focus-within:border-[#8B5CF6] focus-within:ring-2 focus-within:ring-[#8B5CF6]/10 sm:px-4">
                <Mail size={18} className="shrink-0 text-[#AAA3C1]" />

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="h-12 min-w-0 w-full bg-transparent text-sm text-white outline-none placeholder:text-[#77718D]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-xs font-semibold text-white sm:text-sm"
              >
                Password
              </label>

              <div className="flex min-h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#11101C] px-3.5 transition focus-within:border-[#8B5CF6] focus-within:ring-2 focus-within:ring-[#8B5CF6]/10 sm:gap-3 sm:px-4">
                <LockKeyhole size={18} className="shrink-0 text-[#AAA3C1]" />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  minLength={6}
                  required
                  className="h-12 min-w-0 w-full bg-transparent text-sm text-white outline-none placeholder:text-[#77718D]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#AAA3C1] transition hover:bg-white/5 hover:text-white active:bg-white/10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex min-h-10 cursor-pointer items-center gap-2.5 text-xs text-[#AAA3C1] sm:text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-[#8B5CF6]"
                />
                Remember Me
              </label>

              <Link
                to="/forgot-password"
                className="flex min-h-10 items-center text-xs font-semibold text-[#B99AFF] transition hover:text-white sm:text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/10 transition hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Please wait...
                </>
              ) : (
                <>
                  Login to Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 border-t border-white/10 pt-5 text-center sm:mt-7 sm:pt-6">
            <p className="text-xs leading-6 text-[#AAA3C1] sm:text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-[#B99AFF] transition hover:text-white"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] text-[#77718D] sm:mt-6 sm:text-xs">
            <ShieldCheck size={15} className="shrink-0 text-green-400" />
            Secure account access with AI-SaleBD
          </div>
        </div>

        <p className="mt-5 text-center text-[10px] text-[#77718D] sm:text-xs">
          Your Digital World, One Marketplace.
        </p>
      </div>
    </section>
  );
};

export default Login;
