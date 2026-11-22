import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp, Headset, ChevronDown } from "lucide-react";

import Header from "./Header";
import Footer from "./Footer";
import BottomNavigation from "./BottomNavigation";

const WHATSAPP_NUMBER = "8801648582639";

const FloatingActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWhatsApp = () => {
    const message = "Hello AI-SaleBD! I need some help.";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="
        pointer-events-none fixed right-3 z-[60]
        bottom-[calc(7.5rem+env(safe-area-inset-bottom))]
        flex flex-col items-end gap-3
        sm:right-5
        md:bottom-6 md:right-6
      "
    >
      {/* Back To Top */}
      <button
        type="button"
        onClick={handleBackToTop}
        aria-label="Back to top"
        title="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        className={`
          pointer-events-auto
          flex h-11 w-11 shrink-0 items-center justify-center
          rounded-full border border-white/10
          bg-[#292044] text-white
          shadow-xl shadow-black/30
          transition-all duration-300
          hover:scale-110 hover:bg-[#7048E8]
          active:scale-95
          md:h-12 md:w-12
          ${
            showBackToTop
              ? "visible translate-y-0 opacity-100"
              : "invisible pointer-events-none translate-y-3 opacity-0"
          }
        `}
      >
        <ArrowUp size={23} strokeWidth={2.8} className="shrink-0" />
      </button>

      {/* WhatsApp Support */}
      <div className="group pointer-events-auto relative flex flex-col items-end">
        {/* Support Card */}
        <div
          className={`
            absolute bottom-full right-0 mb-3
            w-[min(260px,calc(100vw-24px))]
            rounded-2xl border border-white/10
            bg-[#211B3B] p-4
            shadow-2xl shadow-black/40
            transition-all duration-300
            ${
              mobileOpen
                ? "visible translate-y-0 opacity-100 pointer-events-auto"
                : "invisible translate-y-2 opacity-0 pointer-events-none"
            }
            md:invisible md:translate-y-2 md:opacity-0
            md:pointer-events-none
            md:group-hover:visible md:group-hover:translate-y-0
            md:group-hover:opacity-100 md:group-hover:pointer-events-auto
          `}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <Headset size={22} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-white">Need Help?</p>

              <p className="mt-1 text-xs text-[#AAA3C1]">
                We're here to help you!
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-50 motion-reduce:animate-none" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>

            <span className="text-[10px] font-semibold tracking-wide text-green-400">
              CHAT WITH OUR SUPPORT
            </span>
          </div>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600 active:scale-[0.98]"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </button>
        </div>

        {/* WhatsApp Buttons */}
        <div className="flex items-center gap-2">
          {/* Mobile Support Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Hide support card" : "Show support card"}
            aria-expanded={mobileOpen}
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full border border-white/10
              bg-[#292044] text-white shadow-lg
              transition hover:bg-[#7048E8]
              active:scale-95 md:hidden
            "
          >
            <ChevronDown
              size={19}
              className={`transition-transform duration-300 ${
                mobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* WhatsApp Main Button */}
          <button
            type="button"
            onClick={handleWhatsApp}
            aria-label="WhatsApp Support"
            title="WhatsApp Support"
            className="
              relative flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-full bg-[#25D366] text-white
              shadow-lg shadow-green-500/25
              transition duration-300
              hover:scale-105 hover:bg-[#20BD5A]
              active:scale-95
              md:h-14 md:w-14
            "
          >
            <MessageCircle size={26} strokeWidth={2.2} />

            <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#25D366] bg-white">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-[#11101C]">
      <Header />

      <main className="min-w-0 w-full flex-1">{children}</main>

      <Footer />

      <BottomNavigation />

      <FloatingActions />
    </div>
  );
};

export default MainLayout;
