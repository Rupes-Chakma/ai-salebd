import { Link } from "react-router-dom";
import {
  Sparkles,
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
  Headphones,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const categories = [
  { name: "AI Tools", path: "/category/ai-tools" },
  { name: "Gaming & Top-up", path: "/category/gaming" },
  { name: "Subscriptions", path: "/category/subscriptions" },
  { name: "Software & Licenses", path: "/category/software" },
  { name: "Gift Cards", path: "/category/gift-cards" },
  { name: "Entertainment", path: "/category/entertainment" },
];

const usefulLinks = [
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "FAQ", path: "/faq" },
  { name: "My Orders", path: "/my-orders" },
];

const legalLinks = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Refund Policy", path: "/refund-policy" },
  { name: "Terms & Conditions", path: "/terms" },
];

const WHATSAPP_URL = "https://wa.me/8801648582639";

function Footer() {
  return (
    <footer className="relative mt-5 overflow-hidden border-t border-white/[0.08] bg-[#080B16] text-gray-400 sm:mt-8">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-0 h-72 w-72 rounded-full bg-purple-600/[0.08] blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-600/[0.08] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 py-9 sm:grid-cols-2 sm:gap-10 sm:py-12 lg:grid-cols-4 lg:gap-12 lg:py-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="group inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 sm:rounded-2xl">
                <Sparkles className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  AI-Sale<span className="text-purple-400">BD</span>
                </h2>
                <p className="text-[9px] font-semibold uppercase tracking-[1.7px] text-gray-500">
                  Premium Digital Marketplace
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-6 text-gray-400 sm:mt-5 sm:text-sm sm:leading-7">
              Discover premium AI tools, digital subscriptions, software and
              more. Your trusted destination for digital products.
            </p>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-2.5 sm:mt-6 sm:gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400 sm:h-10 sm:w-10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-pink-400 sm:h-10 sm:w-10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-400 sm:h-10 sm:w-10"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white sm:mb-5 sm:text-base">
              Explore Categories
            </h3>

            <ul className="space-y-3 sm:space-y-3.5">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    className="group inline-flex items-center gap-2 text-xs text-gray-400 transition-colors hover:text-purple-400 sm:text-sm"
                  >
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-purple-500/70 transition-transform group-hover:translate-x-1" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white sm:mb-5 sm:text-base">
              Quick Links
            </h3>

            <ul className="space-y-3 sm:space-y-3.5">
              {usefulLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-purple-400 sm:text-sm"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-4 mt-7 text-sm font-bold text-white sm:mt-9 sm:text-base">
              Legal Information
            </h3>

            <ul className="space-y-3 sm:space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs text-gray-400 transition-colors hover:text-purple-400 sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-sm font-bold text-white sm:mb-5 sm:text-base">
              Get in Touch
            </h3>

            <div className="space-y-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 text-green-400 transition-colors group-hover:bg-green-500/20 sm:h-10 sm:w-10">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 sm:text-xs">
                    WhatsApp Support
                  </p>
                  <p className="mt-1 text-xs font-semibold text-gray-200 transition-colors group-hover:text-green-400 sm:text-sm">
                    +880 1648-5862639
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400 sm:h-10 sm:w-10">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 sm:text-xs">
                    Email Support
                  </p>
                  <p className="mt-1 text-xs font-medium text-gray-300 sm:text-sm">
                    Contact details coming soon
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 sm:h-10 sm:w-10">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 sm:text-xs">
                    Location
                  </p>
                  <p className="mt-1 text-xs font-medium text-gray-200 sm:text-sm">
                    Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Support Button */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-900/20 transition-all hover:-translate-y-0.5 hover:shadow-purple-500/20 sm:mt-6 sm:min-h-11 sm:text-sm"
            >
              <Headphones className="h-4 w-4" />
              Chat with Us
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="flex flex-col items-center justify-center gap-3 border-t border-white/[0.08] py-5 text-center sm:flex-row sm:gap-8 sm:py-6">
          <div className="flex items-center gap-2 text-[10px] text-gray-500 sm:text-xs">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            Customer Support via WhatsApp
          </div>

          <span className="hidden h-1 w-1 rounded-full bg-gray-700 sm:block" />

          <div className="flex items-center gap-2 text-[10px] text-gray-500 sm:text-xs">
            <Sparkles className="h-4 w-4 text-purple-400" />
            Your Digital Marketplace
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/[0.08] py-5 text-center sm:flex-row sm:py-6">
          <p className="text-[10px] text-gray-500 sm:text-xs">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-300">AI-SaleBD</span>. All
            rights reserved.
          </p>

          <p className="text-[10px] text-gray-600 sm:text-xs">
            Your Gateway to Premium AI Tools.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
