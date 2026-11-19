import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Actual password update will be connected with Supabase.
    setTimeout(() => {
      setLoading(false);
      toast("Password reset will be available after backend integration.");
    }, 700);
  };

  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute left-0 top-10 h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#38BDF8]/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-[#211B3B]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-7 text-center">
            <Link
              to="/"
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#2563EB] shadow-lg shadow-purple-500/20"
            >
              <Zap size={34} className="fill-white text-white" />
            </Link>

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B5CF6]/10">
              <LockKeyhole size={27} className="text-[#B99AFF]" />
            </div>

            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
              Reset Password
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#AAA3C1]">
              Create a new password for your NEXORA account. Use a strong
              password to keep your account secure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="new-password"
                className="mb-2 block text-sm font-semibold text-white"
              >
                New Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] px-4 transition focus-within:border-[#8B5CF6]">
                <LockKeyhole size={18} className="shrink-0 text-[#AAA3C1]" />

                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#77718D]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-[#AAA3C1] hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <p className="mt-2 text-xs text-[#77718D]">
                Use at least 8 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Confirm New Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] px-4 transition focus-within:border-[#8B5CF6]">
                <LockKeyhole size={18} className="shrink-0 text-[#AAA3C1]" />

                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#77718D]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="shrink-0 text-[#AAA3C1] hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

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
                  <ShieldCheck size={18} />
                  Update Password
                </>
              )}
            </button>
          </form>

          <Link
            to="/login"
            className="mt-7 flex items-center justify-center gap-2 text-sm font-semibold text-[#B99AFF] transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Login
          </Link>
        </div>

        <p className="mt-5 text-center text-xs text-[#77718D]">
          Your Digital World, One Marketplace.
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
