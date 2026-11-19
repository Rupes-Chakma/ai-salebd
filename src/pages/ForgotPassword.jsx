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

    // Password reset email will be connected with Supabase later.
    setTimeout(() => {
      setLoading(false);

      toast("Password reset will be available after backend integration.", {
        icon: "🔐",
        duration: 4000,
      });
    }, 700);
  };

  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-4 py-12">
      {/* Background Effects */}
      <div className="pointer-events-none absolute left-0 top-10 h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#38BDF8]/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-[#211B3B]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          {/* Logo */}
          <div className="mb-7 text-center">
            <Link
              to="/"
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#2563EB] shadow-lg shadow-purple-500/20"
            >
              <Zap size={34} className="fill-white text-white" />
            </Link>

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B5CF6]/10">
              <Mail size={27} className="text-[#B99AFF]" />
            </div>

            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
              Forgot Password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#AAA3C1]">
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

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] px-4 transition focus-within:border-[#8B5CF6] focus-within:ring-2 focus-within:ring-[#8B5CF6]/10">
                <Mail size={18} className="shrink-0 text-[#AAA3C1]" />

                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  autoComplete="email"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#77718D]"
                />

                {email && (
                  <button
                    type="button"
                    onClick={() => setEmail("")}
                    aria-label="Clear email"
                    className="shrink-0 text-[#AAA3C1] transition hover:text-white"
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] py-3.5 font-bold text-white shadow-lg shadow-purple-500/10 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
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
            className="mt-7 flex items-center justify-center gap-2 text-sm font-semibold text-[#B99AFF] transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Login
          </Link>

          {/* Security Notice */}
          <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/10 pt-5 text-xs text-[#77718D]">
            <ShieldCheck size={15} className="text-green-400" />
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
