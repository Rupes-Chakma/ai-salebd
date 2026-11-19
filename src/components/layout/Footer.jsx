import { Link } from "react-router-dom";
import {
  Sparkles,
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
  Headphones,
  ShieldCheck,
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
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-[#080b16] text-gray-400">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-16">
          {/* Brand Section */}
          <div>
            <Link to="/" className="group inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover:scale-105">
                <Sparkles className="h-6 w-6 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  AI-Sale<span className="text-purple-400">BD</span>
                </h2>
                <p className="text-[10px] font-semibold uppercase tracking-[2px] text-gray-500">
                  Premium AI Marketplace
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-gray-400">
              Your Gateway to Premium AI Tools. Discover powerful AI tools,
              digital subscriptions, software and more — all in one marketplace.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
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

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-pink-400"
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

              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-400"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-6 text-base font-bold text-white">
              Explore Categories
            </h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    className="group inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-purple-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500/60 transition-all group-hover:scale-125 group-hover:bg-purple-400" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-6 text-base font-bold text-white">Quick Links</h3>

            <ul className="space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-purple-400"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-5 mt-9 text-base font-bold text-white">
              Legal Information
            </h3>

            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200 hover:text-purple-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-6 text-base font-bold text-white">
              Get in Touch
            </h3>

            <div className="space-y-5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 text-green-400 transition-colors group-hover:bg-green-500/20">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">WhatsApp Support</p>
                  <p className="mt-1 text-sm font-medium text-gray-200 transition-colors group-hover:text-green-400">
                    +880 1648-5862639
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Email Support</p>
                  <p className="mt-1 text-sm font-medium text-gray-300">
                    Contact details coming soon
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="mt-1 text-sm font-medium text-gray-200">
                    Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Support CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-purple-500/20"
            >
              <Headphones className="h-4 w-4" />
              Chat with Us
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="flex flex-col items-center justify-center gap-3 border-t border-white/10 py-6 text-center sm:flex-row sm:gap-8">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            Customer Support via WhatsApp
          </div>

          <span className="hidden h-1 w-1 rounded-full bg-gray-700 sm:block" />

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="h-4 w-4 text-purple-400" />
            Your Digital Marketplace
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-center sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-300">AI-SaleBD</span>. All
            rights reserved.
          </p>

          <p className="text-xs text-gray-600">
            Your Gateway to Premium AI Tools.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
