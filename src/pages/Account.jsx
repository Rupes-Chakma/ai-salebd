import { Link } from "react-router-dom";
import {
  UserRound,
  Package,
  ShoppingBag,
  MapPin,
  LockKeyhole,
  LogIn,
  UserPlus,
  ChevronRight,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const Account = () => {
  const menuItems = [
    {
      label: "My Orders",
      description: "View your order history and status",
      path: "/my-orders",
      icon: Package,
    },
    {
      label: "Shop Products",
      description: "Explore digital products",
      path: "/shop",
      icon: ShoppingBag,
    },
    {
      label: "My Addresses",
      description: "Manage your delivery addresses",
      path: "/addresses",
      icon: MapPin,
    },
    {
      label: "Forgot Password",
      description: "Reset your account password",
      path: "/forgot-password",
      icon: LockKeyhole,
    },
  ];

  return (
    <section className="relative min-h-[75vh] overflow-hidden px-4 py-10 sm:py-12">
      {/* Background Effects */}
      <div className="pointer-events-none absolute left-0 top-10 h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#38BDF8]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Page Heading */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            My <span className="gradient-text">Account</span>
          </h1>

          <p className="mt-3 text-sm text-[#AAA3C1] sm:text-base">
            Manage your AI-SaleBD account and digital purchases.
          </p>
        </div>

        {/* Guest Profile Card */}
        <div className="mb-6 rounded-3xl border border-white/10 bg-[#211B3B]/95 p-5 shadow-xl sm:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#2563EB] shadow-lg shadow-purple-500/20 sm:h-20 sm:w-20">
              <UserRound size={34} className="text-white sm:h-10 sm:w-10" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Welcome to AI-SaleBD
              </h2>

              <p className="mt-1 text-sm text-[#AAA3C1]">
                You are browsing as a guest.
              </p>

              <span className="mt-2 inline-flex rounded-full border border-[#38BDF8]/20 bg-[#38BDF8]/10 px-3 py-1 text-xs font-medium text-[#38BDF8]">
                Guest Account
              </span>
            </div>
          </div>

          {/* Authentication Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-3 py-3.5 text-sm font-bold text-white transition hover:opacity-90"
            >
              <LogIn size={17} />
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3.5 text-sm font-semibold text-white transition hover:border-[#8B5CF6]/50 hover:bg-white/10"
            >
              <UserPlus size={17} />
              Create Account
            </Link>
          </div>
        </div>

        {/* Account Menu */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-bold text-white">
            Account Overview
          </h3>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#211B3B]/95">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center gap-4 p-4 transition hover:bg-white/5 sm:p-5 ${
                    index !== menuItems.length - 1
                      ? "border-b border-white/10"
                      : ""
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#B99AFF] transition group-hover:bg-[#8B5CF6]/25">
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-white">
                      {item.label}
                    </h4>

                    <p className="mt-1 text-xs text-[#AAA3C1]">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={19}
                    className="shrink-0 text-[#77718D] transition group-hover:translate-x-1 group-hover:text-white"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Support Card */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#211B3B]/80 p-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#38BDF8]">
              <Headphones size={23} />
            </div>

            <div>
              <h4 className="font-semibold text-white">Need Help?</h4>

              <p className="mt-1 text-xs text-[#AAA3C1]">
                Contact our customer support team.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/8801648582639"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366]/10 px-5 py-3 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20 sm:w-auto"
          >
            <Headphones size={17} />
            Contact Support
          </a>
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-start justify-center gap-2 text-center text-xs leading-5 text-[#77718D]">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-green-400" />

          <p>
            Secure account authentication will be activated after backend
            integration.
          </p>
        </div>

        {/* Footer Text */}
        <p className="mt-5 text-center text-xs text-[#77718D]">
          Your Digital World, One Marketplace.
        </p>
      </div>
    </section>
  );
};

export default Account;
