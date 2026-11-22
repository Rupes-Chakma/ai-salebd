import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send, ShieldCheck, Zap, X } from "lucide-react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);

    // Password reset will be connected with Supabase later.
    setTimeout(() => {
      setLoading(false);

      toast("Password reset will be available after backend integration.", {
        icon: "🔐",
        duration: 4000,
      });
    }, 700);
  };

  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-4 py-8 sm:py-12">
      {/* Background Effects */}
      <div className="pointer-events-none absolute left-0 top-10 h-56 w-56 rounded-full bg-[#8B5CF6]/10 blur-[100px] sm:h-64 sm:w-64" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#38BDF8]/10 blur-[100px] sm:h-64 sm:w-64" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-[#211B3B]/95 p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">
          {/* Logo */}
          <div className="mb-7 text-center">
            <Link
              to="/"
              aria-label="Go to homepage"
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#2563EB] shadow-lg shadow-purple-500/20 transition hover:scale-105 sm:h-16 sm:w-16"
            >
              <Zap
                size={32}
                className="fill-white text-white sm:h-[34px] sm:w-[34px]"
              />
            </Link>

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/10 sm:h-14 sm:w-14 sm:rounded-2xl">
              <Mail size={25} className="text-[#B99AFF]" />
            </div>

            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
              Forgot Password?
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#AAA3C1]">
              Don't worry! Enter your registered email address and we'll help
              you reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="forgot-email"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Email Address
              </label>

              <div className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] px-3.5 transition focus-within:border-[#8B5CF6] focus-within:ring-2 focus-within:ring-[#8B5CF6]/10 sm:px-4">
                <Mail size={18} className="shrink-0 text-[#AAA3C1]" />

                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  autoComplete="email"
                  maxLength={120}
                  required
                  className="min-w-0 w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#77718D]"
                />

                {email && (
                  <button
                    type="button"
                    onClick={() => setEmail("")}
                    aria-label="Clear email"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#AAA3C1] transition hover:bg-white/5 hover:text-white"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-4 py-3.5 font-bold text-white shadow-lg shadow-purple-500/10 transition hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Please wait...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Reset Link
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <Link
            to="/login"
            className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-[#B99AFF] transition hover:bg-white/5 hover:text-white sm:mt-7"
          >
            <ArrowLeft size={17} />
            Back to Login
          </Link>

          {/* Security Notice */}
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/10 pt-5 text-center text-xs text-[#77718D] sm:mt-7">
            <ShieldCheck size={15} className="shrink-0 text-green-400" />
            Your account security matters to us.
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-[#77718D]">
          Your Digital World, One Marketplace.
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
