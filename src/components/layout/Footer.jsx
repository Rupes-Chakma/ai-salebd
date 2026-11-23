import { Link } from "react-router-dom";
import {
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
  Headphones,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Clock3,
} from "lucide-react";

import BrandLogo from "../common/BrandLogo";

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

const socialLinkClass =
  "flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#141A15] text-[#A3ADA4] transition-all duration-200 hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-400";

const footerLinkClass =
  "group inline-flex items-center gap-2 text-[13px] text-[#929A92] transition-colors duration-200 hover:text-green-400";

function Footer() {
  return (
    <footer className="mt-6 overflow-hidden border-t border-white/[0.08] bg-[#0B0F0C] text-[#A3ADA4] sm:mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-9 sm:py-10 lg:grid-cols-4 lg:gap-8 lg:py-11">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              aria-label="AI-SaleBD Home"
              className="inline-flex items-center transition-opacity hover:opacity-90"
            >
              <BrandLogo size={42} />
            </Link>

            <p className="mt-3 max-w-sm text-[13px] leading-6 text-[#929A92]">
              Discover premium AI tools, digital subscriptions, software and
              digital products. Everything you need to explore the digital
              world, all in one place.
            </p>

            {/* Social Links */}
            <div className="mt-4 flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={socialLinkClass}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
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
                className={socialLinkClass}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
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
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-500/20 bg-[#141A15] text-green-400 transition-all hover:border-green-500/50 hover:bg-green-500/10"
              >
                <MessageCircle size={18} />
              </a>
            </div>

            {/* Brand Status */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#141A15] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-medium tracking-wide text-[#A3ADA4]">
                Your Digital Marketplace
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">
              Explore Categories
            </h3>

            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link to={category.path} className={footerLinkClass}>
                    <ChevronRight
                      size={13}
                      className="shrink-0 text-green-500 transition-transform group-hover:translate-x-0.5"
                    />
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links and Legal */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Quick Links</h3>

            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={footerLinkClass}>
                    {link.name}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold text-white">
                Legal Information
              </h3>

              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={footerLinkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Get in Touch</h3>

            <p className="mb-4 text-[13px] leading-6 text-[#929A92]">
              Have a question or need assistance? Our support team is ready to
              help.
            </p>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-500/20 bg-[#141A15] text-green-400 transition-colors group-hover:border-green-500/40">
                  <MessageCircle size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] text-[#737D73]">WhatsApp Support</p>
                  <p className="mt-0.5 text-[13px] font-semibold text-[#E5E7EB] transition-colors group-hover:text-green-400">
                    +880 1648-5862639
                  </p>
                </div>
              </a>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-[#141A15] text-[#A3ADA4]">
                  <Mail size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] text-[#737D73]">Email Support</p>
                  <p className="mt-0.5 text-[13px] font-medium text-[#C5CBC5]">
                    Contact details coming soon
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-[#141A15] text-[#A3ADA4]">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-[11px] text-[#737D73]">Location</p>
                  <p className="mt-0.5 text-[13px] font-medium text-[#E5E7EB]">
                    Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex min-h-[50px] w-full items-center justify-between rounded-xl border border-green-500/20 bg-[#141A15] px-3 py-2.5 transition-all duration-200 hover:border-green-500/50 hover:bg-green-500/[0.06] active:scale-[0.99]"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                  <Headphones size={17} />
                </span>

                <span className="flex min-w-0 flex-col">
                  <span className="text-[13px] font-semibold text-white">
                    Chat with Us
                  </span>
                  <span className="mt-0.5 truncate text-[10px] text-[#929A92]">
                    WhatsApp Customer Support
                  </span>
                </span>
              </span>

              <ArrowUpRight
                size={16}
                className="shrink-0 text-green-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        {/* Trust Section */}
        <div className="border-t border-white/[0.08] py-4">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-400" />
              <span className="text-[11px] font-medium text-[#929A92]">
                Customer Support via WhatsApp
              </span>
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-[#343A34] sm:block" />

            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-red-400" />
              <span className="text-[11px] font-medium text-[#929A92]">
                Your Gateway to Premium AI Tools
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/[0.08] py-4 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-[#737D73]">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#E5E7EB]">AI-SaleBD</span>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-2 text-[11px] text-[#737D73]">
            <Clock3 size={13} />
            <span>Made for the Digital Generation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
