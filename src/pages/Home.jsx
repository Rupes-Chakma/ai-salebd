import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ImageOff,
  Zap,
  ShieldCheck,
  Headset,
  Wallet,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  HelpCircle,
  Star,
} from "lucide-react";

import FeaturedProducts from "../components/home/FeaturedProducts";
import CategorySection from "../components/home/CategorySection";
import ProductCard from "../components/products/ProductCard";
import useProductStore from "../store/useProductStore";

const WHATSAPP_NUMBER = "8801648582639";
const SLIDE_INTERVAL = 4500;
const SWIPE_THRESHOLD = 45;

const benefits = [
  { icon: Zap, title: "Fast Delivery", description: "Quick order processing" },
  {
    icon: ShieldCheck,
    title: "Secure Ordering",
    description: "Simple ordering process",
  },
  {
    icon: Wallet,
    title: "Affordable Price",
    description: "Budget-friendly products",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description: "We're here to help",
  },
];

const reasons = [
  {
    icon: CheckCircle2,
    title: "Easy Ordering",
    description:
      "Browse your preferred digital products and place your order easily.",
  },
  {
    icon: ShieldCheck,
    title: "Personal Support",
    description:
      "Get assistance from our support team throughout the ordering process.",
  },
  {
    icon: Wallet,
    title: "Affordable Options",
    description:
      "Explore digital products with pricing designed for different budgets.",
  },
];

const faqs = [
  {
    question: "How can I order a product?",
    answer:
      "Browse the Shop or Homepage, select your preferred product, and follow the available ordering instructions.",
  },
  {
    question: "How can I contact AI-SaleBD?",
    answer:
      "You can contact our support team through the WhatsApp support button available on the website.",
  },
  {
    question: "How will I receive my digital product?",
    answer:
      "Delivery details will be confirmed through the order communication channel after your order is reviewed.",
  },
  {
    question: "Can I ask questions before ordering?",
    answer:
      "Yes. Contact our support team through WhatsApp if you need product information or ordering assistance.",
  },
];

function Home() {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);

  const activeProducts = Array.isArray(products)
    ? products.filter((product) => product && product.status === "Active")
    : [];

  // Only active products enabled for the homepage slider
  const sliderProducts = activeProducts.filter(
    (product) =>
      product.showOnSlider === true ||
      product.showOnSlider === "true" ||
      product.showOnSlider === 1,
  );

  const bestSellerProducts = activeProducts
    .filter(
      (product) => String(product.badge || "").toLowerCase() === "popular",
    )
    .slice(0, 4);

  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);
  const didSwipe = useRef(false);

  const safeActiveSlide =
    sliderProducts.length > 0 ? activeSlide % sliderProducts.length : 0;

  const currentProduct = sliderProducts[safeActiveSlide];

  const nextSlide = useCallback(() => {
    if (sliderProducts.length > 1) {
      setActiveSlide((current) => (current + 1) % sliderProducts.length);
    }
  }, [sliderProducts.length]);

  const previousSlide = useCallback(() => {
    if (sliderProducts.length > 1) {
      setActiveSlide(
        (current) =>
          (current - 1 + sliderProducts.length) % sliderProducts.length,
      );
    }
  }, [sliderProducts.length]);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    setActiveSlide(0);
  }, [sliderProducts.length]);

  // Auto Slide
  useEffect(() => {
    if (sliderProducts.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % sliderProducts.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [sliderProducts.length, isPaused]);

  // Mobile Touch Swipe
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const diffX = touchStartX.current - endX;
    const diffY = touchStartY.current - endY;

    if (
      Math.abs(diffX) > SWIPE_THRESHOLD &&
      Math.abs(diffX) > Math.abs(diffY)
    ) {
      didSwipe.current = true;

      if (diffX > 0) {
        nextSlide();
      } else {
        previousSlide();
      }

      setTimeout(() => {
        didSwipe.current = false;
      }, 300);
    }

    setIsPaused(false);
  };

  // Desktop Mouse Drag
  const handleMouseDown = (event) => {
    if (event.button !== 0) return;

    mouseStartX.current = event.clientX;
    isDragging.current = true;
    setIsPaused(true);
  };

  const handleMouseUp = (event) => {
    if (!isDragging.current) return;

    const distance = mouseStartX.current - event.clientX;

    if (Math.abs(distance) > SWIPE_THRESHOLD) {
      didSwipe.current = true;

      if (distance > 0) {
        nextSlide();
      } else {
        previousSlide();
      }

      setTimeout(() => {
        didSwipe.current = false;
      }, 300);
    }

    isDragging.current = false;
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setIsPaused(false);
    }
  };

  const handleSlideClick = (event) => {
    if (didSwipe.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.currentTarget.search.value.trim();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleWhatsApp = () => {
    const message = "Hello AI-SaleBD! I need some help.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-w-0 overflow-x-clip bg-[#0B0F0C] text-white">
      {/* HERO SLIDER */}
      <section className="relative pb-5 pt-4 sm:pb-9 sm:pt-7">
        <div className="container-custom">
          {currentProduct ? (
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="group/slider relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141A15] shadow-2xl shadow-black/30 touch-pan-y select-none sm:rounded-[28px]"
            >
              {/* Decorative Background */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(22,163,74,0.15),transparent_42%),radial-gradient(ellipse_at_90%_90%,rgba(225,29,72,0.07),transparent_35%)]" />

              <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full border border-white/[0.035]" />
              <div className="pointer-events-none absolute -right-12 top-12 h-52 w-52 rounded-full border border-white/[0.035]" />

              <Link
                to={`/product/${currentProduct.id}`}
                key={currentProduct.id}
                onClick={handleSlideClick}
                draggable={false}
                className="relative grid min-h-[230px] grid-cols-[1fr_0.8fr] items-center gap-2 px-4 py-7 sm:min-h-[330px] sm:grid-cols-2 sm:gap-8 sm:px-12 sm:py-10 lg:min-h-[410px] lg:px-16 lg:py-12"
              >
                {/* PRODUCT DETAILS */}
                <div className="relative z-10 min-w-0">
                  <div className="mb-3 inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#16A34A]/25 bg-[#16A34A]/[0.10] px-3 py-1.5 text-[9px] font-bold tracking-[0.13em] text-[#4ADE80] sm:mb-5 sm:text-[10px]">
                    <Sparkles size={13} />
                    FEATURED PRODUCT
                  </div>

                  {currentProduct.badge && (
                    <div className="mb-2 inline-flex rounded-md bg-[#E11D48]/[0.10] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#FB7185] sm:mb-3 sm:text-[11px]">
                      {currentProduct.badge}
                    </div>
                  )}

                  <h1 className="line-clamp-2 break-words text-xl font-black leading-tight tracking-tight text-white sm:max-w-[480px] sm:text-4xl lg:text-5xl">
                    {currentProduct.name}
                  </h1>

                  <p className="mt-2 line-clamp-2 max-w-md text-[10px] leading-5 text-[#A3ADA4] sm:mt-4 sm:text-sm sm:leading-6">
                    {currentProduct.description ||
                      "Discover premium digital products at AI-SaleBD."}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
                    <span className="text-xl font-black text-[#4ADE80] sm:text-3xl lg:text-4xl">
                      ৳
                      {Number(currentProduct.price || 0).toLocaleString(
                        "en-BD",
                      )}
                    </span>

                    {currentProduct.oldPrice &&
                      Number(currentProduct.oldPrice) >
                        Number(currentProduct.price) && (
                        <span className="text-xs text-[#899389] line-through sm:text-base">
                          ৳
                          {Number(currentProduct.oldPrice).toLocaleString(
                            "en-BD",
                          )}
                        </span>
                      )}
                  </div>

                  <span className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-xl bg-[#16A34A] px-3.5 py-2 text-[10px] font-bold text-white shadow-lg shadow-green-950/30 transition duration-200 group-hover/slider:bg-[#15803D] sm:mt-6 sm:min-h-12 sm:px-5 sm:text-sm">
                    <ShoppingBag size={14} />
                    Shop Now
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/slider:translate-x-1"
                    />
                  </span>
                </div>

                {/* PRODUCT IMAGE */}
                <div className="relative flex h-[145px] min-w-0 items-center justify-center sm:h-[250px] lg:h-[320px]">
                  <div className="absolute inset-2 rounded-full bg-[#16A34A]/[0.15] blur-[45px] sm:inset-8 sm:blur-[75px]" />

                  <div className="relative flex h-full w-full max-w-[170px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.035] p-3 shadow-xl shadow-black/20 sm:max-w-[360px] sm:rounded-3xl sm:p-7">
                    {currentProduct.image ? (
                      <img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        draggable={false}
                        className="h-full w-full object-contain transition duration-500 group-hover/slider:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[#899389]">
                        <ImageOff size={28} />
                        <span className="text-[10px] sm:text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>

              {/* PREVIOUS / NEXT */}
              {sliderProducts.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous slide"
                    className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.10] bg-[#0B0F0C]/80 text-white shadow-lg backdrop-blur transition hover:border-[#16A34A]/50 hover:bg-[#16A34A] sm:left-4 sm:h-11 sm:w-11"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.10] bg-[#0B0F0C]/80 text-white shadow-lg backdrop-blur transition hover:border-[#16A34A]/50 hover:bg-[#16A34A] sm:right-4 sm:h-11 sm:w-11"
                  >
                    <ChevronRight size={19} />
                  </button>

                  {/* DOTS */}
                  <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-5 sm:gap-2">
                    {sliderProducts.map((product, index) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={
                          safeActiveSlide === index ? "true" : undefined
                        }
                        className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                          safeActiveSlide === index
                            ? "w-6 bg-[#4ADE80] sm:w-8"
                            : "w-1.5 bg-white/30 hover:bg-white/70 sm:w-2"
                        }`}
                      />
                    ))}
                  </div>

                  {/* SLIDE COUNTER */}
                  <div className="absolute right-3 top-3 z-10 rounded-full border border-white/[0.10] bg-[#0B0F0C]/70 px-2.5 py-1 text-[9px] font-semibold text-white backdrop-blur sm:right-6 sm:top-6 sm:px-3 sm:text-[10px]">
                    {safeActiveSlide + 1} / {sliderProducts.length}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="relative flex min-h-[230px] items-center justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141A15] px-5 py-7 sm:min-h-[330px] sm:rounded-[28px] sm:px-12 lg:min-h-[390px] lg:px-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(22,163,74,0.16),transparent_45%)]" />

              <div className="relative z-10 max-w-xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#16A34A]/25 bg-[#16A34A]/[0.10] px-3 py-1.5 text-[9px] font-bold tracking-wider text-[#4ADE80] sm:text-xs">
                  <Sparkles size={14} />
                  WELCOME TO AI-SALEBD
                </div>

                <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Your Digital Marketplace
                </h1>

                <p className="mt-3 max-w-md text-xs leading-5 text-[#A3ADA4] sm:text-sm sm:leading-6">
                  Discover AI tools, premium subscriptions and digital products.
                </p>

                <Link
                  to="/shop"
                  className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#16A34A] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#15803D] sm:min-h-12 sm:px-5 sm:text-sm"
                >
                  Browse Products
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="relative mr-3 hidden h-32 w-32 items-center justify-center rounded-3xl border border-[#16A34A]/20 bg-[#16A34A]/[0.07] text-[#4ADE80] sm:flex lg:mr-10 lg:h-44 lg:w-44">
                <Sparkles size={60} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SEARCH */}
      <section className="container-custom py-3 sm:py-5">
        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-2xl items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#141A15] p-1.5 shadow-lg shadow-black/10 transition focus-within:border-[#16A34A]/40 sm:p-2"
        >
          <Search size={19} className="ml-2 shrink-0 text-[#899389]" />
          <input
            name="search"
            type="search"
            placeholder="Search AI tools and digital products..."
            aria-label="Search products"
            className="h-10 min-w-0 flex-1 bg-transparent px-1 text-xs text-white outline-none placeholder:text-[#737D78] sm:h-11 sm:text-sm"
          />
          <button
            type="submit"
            className="min-h-10 rounded-xl bg-[#16A34A] px-4 text-xs font-bold text-white transition hover:bg-[#15803D] active:scale-95 sm:min-h-11 sm:px-6 sm:text-sm"
          >
            Search
          </button>
        </form>
      </section>

      {/* TRUST & BENEFITS */}
      <section className="container-custom pb-7 pt-3 sm:pb-10 sm:pt-5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-[#141A15] p-3.5 transition duration-300 hover:border-[#16A34A]/30 hover:bg-[#171F18] sm:gap-3.5 sm:p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#16A34A]/15 bg-[#16A34A]/[0.09] text-[#4ADE80] transition group-hover:bg-[#16A34A]/[0.16] sm:h-12 sm:w-12">
                  <Icon size={20} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-[10px] font-bold text-white sm:text-sm">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-[9px] text-[#899389] sm:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}
      <CategorySection />

      {/* FEATURED PRODUCTS */}
      <FeaturedProducts />

      {/* BEST SELLERS */}
      {bestSellerProducts.length > 0 && (
        <section className="container-custom py-8 sm:py-12">
          <div className="mb-5 flex items-end justify-between gap-3 sm:mb-7">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-[#FB7185] sm:text-xs">
                <Star size={15} />
                POPULAR PICKS
              </div>

              <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl lg:text-3xl">
                Popular Products
              </h2>

              <p className="mt-1.5 text-xs text-[#899389] sm:text-sm">
                Explore products marked as popular.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#4ADE80] transition hover:text-white sm:text-sm"
            >
              View All <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {bestSellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* PROMOTIONAL CTA */}
      <section className="container-custom py-5 sm:py-8">
        <div className="relative overflow-hidden rounded-2xl border border-[#16A34A]/20 bg-[#141A15] px-5 py-7 sm:rounded-[26px] sm:px-10 sm:py-10 lg:px-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_50%,rgba(22,163,74,0.14),transparent_45%)]" />
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border border-white/[0.04]" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-[#4ADE80] sm:text-xs">
                <Sparkles size={15} />
                EXPLORE MORE
              </div>

              <h2 className="text-xl font-black leading-tight tracking-tight text-white sm:text-3xl">
                Find the Right Digital Tools for You
              </h2>

              <p className="mt-2 text-xs leading-5 text-[#A3ADA4] sm:text-sm sm:leading-6">
                Explore our collection and discover digital products that match
                your needs.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-green-950/30 transition hover:bg-[#15803D] active:scale-95 sm:text-sm"
            >
              Explore Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE AI-SALEBD */}
      <section className="container-custom py-8 sm:py-12">
        <div className="mx-auto mb-7 max-w-xl text-center sm:mb-9">
          <div className="mb-2 flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.14em] text-[#4ADE80] sm:text-xs">
            <Sparkles size={15} />
            WHY AI-SALEBD
          </div>

          <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl lg:text-3xl">
            A Simpler Way to Explore Digital Products
          </h2>

          <p className="mt-2 text-xs leading-5 text-[#899389] sm:text-sm">
            Discover products, get assistance and place your orders with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
          {reasons.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/[0.07] bg-[#141A15] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#16A34A]/30 hover:shadow-xl hover:shadow-black/20 sm:p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#16A34A]/15 bg-[#16A34A]/[0.09] text-[#4ADE80] transition group-hover:bg-[#16A34A]/[0.16]">
                  <Icon size={22} />
                </div>

                <h3 className="text-sm font-bold text-white sm:text-base">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#A3ADA4] sm:text-sm sm:leading-6">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CUSTOMER SUPPORT CTA */}
      <section className="container-custom py-5 sm:py-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#141A15] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#16A34A]/15 bg-[#16A34A]/[0.09] text-[#4ADE80]">
              <MessageCircle size={22} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-white sm:text-base">
                Need Help Choosing a Product?
              </h2>
              <p className="mt-1 text-[11px] text-[#899389] sm:text-xs">
                Contact our team for product and ordering assistance.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#15803D] active:scale-95 sm:text-sm"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-custom py-9 sm:py-14">
        <div className="mx-auto mb-7 max-w-xl text-center sm:mb-9">
          <div className="mb-2 flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.14em] text-[#4ADE80] sm:text-xs">
            <HelpCircle size={15} />
            NEED TO KNOW
          </div>

          <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl lg:text-3xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-2 text-xs text-[#899389] sm:text-sm">
            Find answers to common questions about AI-SaleBD.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-[#141A15] transition duration-200 ${
                  isOpen
                    ? "border-[#16A34A]/30"
                    : "border-white/[0.07] hover:border-white/[0.13]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
                >
                  <span className="text-xs font-semibold text-white sm:text-sm">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                      isOpen
                        ? "bg-[#16A34A]/[0.12] text-[#4ADE80]"
                        : "bg-white/[0.04] text-[#899389]"
                    }`}
                  >
                    <ChevronDown
                      size={17}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-white/[0.07] px-4 py-4 text-xs leading-6 text-[#A3ADA4] sm:px-5 sm:text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
