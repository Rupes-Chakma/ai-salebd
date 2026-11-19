import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp, Headset, ChevronDown } from "lucide-react";

import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNavigation from "./BottomNavigation";

const WHATSAPP_NUMBER = "8801648582639";

const FloatingActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = () => {
    const message = "Hello AI-SaleBD! I need some help.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-24 right-4 z-[100] flex flex-col items-end gap-3 md:bottom-8 md:right-6">
      {/* Support Card + WhatsApp */}
      <div className="group relative flex flex-col items-end gap-3">
        {/* Support Card */}
        <div
          className={`
            pointer-events-none w-[245px] origin-bottom-right
            rounded-2xl border border-white/10 bg-[#211B3B] p-4
            shadow-2xl shadow-black/30
            transition-all duration-300 ease-out
            md:pointer-events-auto
            md:absolute md:bottom-full md:right-0 md:mb-3
            md:opacity-0 md:invisible md:translate-y-2
            md:group-hover:visible md:group-hover:translate-y-0
            md:group-hover:opacity-100
            ${
              mobileOpen
                ? "pointer-events-auto visible translate-y-0 opacity-100"
                : "invisible translate-y-2 opacity-0"
            }
            md:visible md:translate-y-0 md:opacity-0
            md:group-hover:opacity-100
          `}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <Headset size={22} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-white">Need Help?</p>
              <p className="mt-1 text-xs text-[#AAA3C1]">
                We're here to help you!
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-50 motion-reduce:animate-none" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>

            <span className="text-[11px] font-semibold tracking-wide text-green-400">
              CHAT WITH OUR SUPPORT
            </span>
          </div>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
          >
            <MessageCircle size={17} />
            Chat on WhatsApp
          </button>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {/* Mobile Expand / Collapse */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Hide support card" : "Show support card"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#292044] text-white shadow-lg transition hover:bg-[#7048E8] md:hidden"
          >
            <ChevronDown
              size={19}
              className={`transition-transform duration-300 ${
                mobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={handleWhatsApp}
            aria-label="WhatsApp Support"
            title="WhatsApp Support"
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/25 transition duration-300 hover:scale-105 hover:bg-[#20BD5A] active:scale-95 md:h-14 md:w-14"
          >
            <MessageCircle size={27} strokeWidth={2.2} />

            <span className="absolute right-[2px] top-[2px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#25D366] bg-white">
              <span className="relative h-2 w-2 rounded-full bg-green-500">
                <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:animate-none" />
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Back To Top */}
      <button
        type="button"
        onClick={handleBackToTop}
        aria-label="Back to top"
        tabIndex={showBackToTop ? 0 : -1}
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#292044] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#7048E8] active:scale-95 md:h-11 md:w-11 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp size={21} />
      </button>
    </div>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#11101C]">
      <Header />
      <Navbar />

      <main className="min-w-0 flex-1 pb-20 md:pb-0">{children}</main>

      <Footer />
      <BottomNavigation />
      <FloatingActions />
    </div>
  );
};

export default MainLayout;
